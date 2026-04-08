
import { GoogleGenAI, Type, type FunctionDeclaration, type LiveServerMessage, Modality, type Blob } from "@google/genai";
import { MOCK_SLOTS, SERVICES } from "@/constants/constants";

// --- Tool Definitions ---

const checkAvailabilityTool: FunctionDeclaration = {
  name: "checkAvailability",
  description: "Check for available demo booking slots for the next few days.",
  parameters: {
    type: Type.OBJECT,
    properties: {},
  },
};

const createBookingTool: FunctionDeclaration = {
  name: "create_booking",
  description: "Book a meeting. You MUST collect Name, Email, Phone, Date, and Time from the user before calling this.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      userName: { type: Type.STRING, description: "The name of the user." },
      userEmail: { type: Type.STRING, description: "The email address of the user." },
      userPhone: { type: Type.STRING, description: "The phone number of the user." },
      date: { type: Type.STRING, description: "The preferred date for the meeting." },
      time: { type: Type.STRING, description: "The preferred time for the meeting." },
      serviceInterest: { type: Type.STRING, description: "The service the user is interested in or their business type." }
    },
    required: ["userName", "userEmail", "userPhone", "date", "time"],
  },
};

const cancelBookingTool: FunctionDeclaration = {
  name: "cancelBooking",
  description: "Cancel an existing booking using the user's phone number.",
  parameters: {
    type: Type.OBJECT,
    properties: { userPhone: { type: Type.STRING, description: "The phone number associated with the booking." } },
    required: ["userPhone"],
  },
};

const navigateToPageTool: FunctionDeclaration = {
  name: "navigateToPage",
  description: "Navigate the user to a specific page on the website to show them relevant content.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      path: { type: Type.STRING, description: "The path to navigate to (e.g., '/services', '/contact', '/portfolio', '/resources')." },
    },
    required: ["path"],
  },
};

const highlightServiceTool: FunctionDeclaration = {
  name: "highlightService",
  description: "Visually highlight a specific service card on the screen. Use this IMMEDIATELY when discussing a service.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      serviceId: { type: Type.STRING, description: "The ID of the service to highlight." },
    },
    required: ["serviceId"],
  },
};

// --- Helper Functions for Audio ---

function createBlob(data: Float32Array): Blob {
  const l = data.length;
  const int16 = new Int16Array(l);
  for (let i = 0; i < l; i++) {
    let s = Math.max(-1, Math.min(1, data[i]));
    int16[i] = s * 32768;
  }
  return {
    data: encode(new Uint8Array(int16.buffer)),
    mimeType: 'audio/pcm;rate=16000',
  };
}

function encode(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(data: Uint8Array, ctx: AudioContext, sampleRate: number, numChannels: number): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);
  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

// --- Service Implementation ---

export interface LiveCallbacks {
  onOpen?: () => void;
  onClose?: () => void;
  onUserSpeaking?: (volume: number) => void;
  onModelSpeaking?: (isPlaying: boolean) => void;
  onModelVolume?: (volume: number) => void;
  onError?: (error: Error) => void;
  onTranscript?: (text: string, isUser: boolean) => void;
  onNavigation?: (path: string) => void;
  onHighlight?: (serviceId: string) => void;
}

export class GeminiService {
  private ai: GoogleGenAI;
  private liveModelName = "gemini-2.5-flash-native-audio-preview-09-2025";

  private inputAudioContext: AudioContext | null = null;
  private outputAudioContext: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private nextStartTime = 0;
  private sources = new Set<AudioBufferSourceNode>();

  private activeSession: any = null;
  private scriptProcessor: ScriptProcessorNode | null = null;
  private mediaStream: MediaStream | null = null;
  private isMuted: boolean = false;
  private animationFrameId: number | null = null;
  private isConnecting: boolean = false;
  private isSessionOpen: boolean = false;

  private navigationCallback: ((path: string) => void) | null = null;
  private highlightCallback: ((serviceId: string) => void) | null = null;

  private hasBooked: boolean = false;

  // Timers
  private silenceTimer: number | null = null;
  private sessionLimitTimer: number | null = null;

  constructor() {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || '';
    this.ai = new GoogleGenAI({ apiKey });
  }

  private resetSilenceTimer() {
    if (this.silenceTimer) window.clearTimeout(this.silenceTimer);
    if (!this.isSessionOpen) return;

    // 1 Minute Silence Timeout
    this.silenceTimer = window.setTimeout(() => {
      console.log("Disconnecting due to 1 minute silence.");
      this.disconnectLive();
    }, 60000);
  }

  private startSessionLimit() {
    if (this.sessionLimitTimer) window.clearTimeout(this.sessionLimitTimer);

    // 10 Minutes Total Call Limit
    this.sessionLimitTimer = window.setTimeout(() => {
      console.log("Disconnecting due to 10 minute call limit.");
      this.disconnectLive();
    }, 600000);
  }

  private getIndianDateTime() {
    return new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "full",
      timeStyle: "medium",
    });
  }

  private getServiceKnowledgeBase() {
    return SERVICES.map(s => `
    - **${s.title}** (ID: "${s.id}")
      Description: ${s.description}
      Key Features: ${s.features.join(", ")}
    `).join("\n");
  }

  private async executeTool(name: string, args: any): Promise<any> {
    console.log("Executing tool:", name, args);
    this.resetSilenceTimer(); // Activity detected

    if (name === "checkAvailability") {
      return { available_slots: MOCK_SLOTS.map(s => ({ id: s.id, description: `${new Date(s.date).toDateString()} at ${s.time}` })) };
    } else if (name === "create_booking") {
      if (this.hasBooked) {
        return {
          status: "error",
          message: "A booking has already been confirmed. Tell the user we already have their details."
        };
      }

      try {
        const payload = {
          "_subject": `CONFIRMED: Monika AI Booking - ${args.userName}`,
          "_template": "table",
          "_captcha": "false",
          "Source": "Monika AI Assistant",
          "Client Name": args.userName,
          "Client Email": args.userEmail,
          "Client Phone": args.userPhone,
          "Meeting Date": args.date,
          "Meeting Time": args.time,
          "Service Interest": args.serviceInterest || "General Growth",
          "Submission Time": this.getIndianDateTime(),
          "_replyto": args.userEmail,
          "_cc": "Info@scallar.in"
        };

        const response = await fetch("https://formsubmit.co/ajax/kamleshg9569@gmail.com", {
          method: "POST",
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (response.ok) {
          this.hasBooked = true;
          return {
            status: "success",
            message: `Booking confirmed! Tell the user it's all set.`
          };
        } else {
          return { status: "error", message: "Service busy. Ask user to contact +91 8510806031." };
        }
      } catch (e) {
        return { status: "error", message: "Network issue." };
      }

    } else if (name === "cancelBooking") {
      return { status: "success", message: `Booking cancelled.` };
    } else if (name === "navigateToPage") {
      if (this.navigationCallback) this.navigationCallback(args.path);
      return { status: "success", message: `Navigated to ${args.path}` };
    } else if (name === "highlightService") {
      if (this.highlightCallback) this.highlightCallback(args.serviceId);
      return { status: "success", message: `Highlighted service ${args.serviceId}` };
    }
    return { error: "Unknown tool" };
  }

  public setMute(muted: boolean) {
    this.isMuted = muted;
  }

  private startVolumeReporting(callbacks: LiveCallbacks) {
    const report = () => {
      if (!this.analyser || !this.outputAudioContext || this.outputAudioContext.state === 'closed') return;
      const dataArray = new Uint8Array(this.analyser.frequencyBinCount);
      this.analyser.getByteFrequencyData(dataArray);
      let sum = 0;
      const binsToCheck = Math.floor(dataArray.length / 2);
      for (let i = 0; i < binsToCheck; i++) sum += dataArray[i];
      const average = sum / binsToCheck;
      const volume = Math.min(1, average / 128);
      callbacks.onModelVolume?.(volume);
      this.animationFrameId = requestAnimationFrame(report);
    };
    report();
  }

  public async connectLive(callbacks: LiveCallbacks) {
    if (this.isConnecting) return;
    this.isConnecting = true;
    this.isSessionOpen = false;

    // Clean up any previous session WITHOUT resetting isConnecting flag
    this.cleanupSession();

    try {
      this.inputAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      this.outputAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });

      if (this.inputAudioContext.state === 'suspended') await this.inputAudioContext.resume();
      if (this.outputAudioContext.state === 'suspended') await this.outputAudioContext.resume();

      this.analyser = this.outputAudioContext.createAnalyser();
      this.analyser.fftSize = 256;
      this.analyser.smoothingTimeConstant = 0.4;
      this.analyser.connect(this.outputAudioContext.destination);

      this.nextStartTime = 0;
      this.isMuted = false;
      this.hasBooked = false;
      this.navigationCallback = callbacks.onNavigation || null;
      this.highlightCallback = callbacks.onHighlight || null;

      this.startVolumeReporting(callbacks);
      this.startSessionLimit(); // Start 10 min cap
      this.resetSilenceTimer(); // Start 1 min silence check

      this.mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: { channelCount: 1, sampleRate: 16000 }
      });

      const serviceKnowledge = this.getServiceKnowledgeBase();
      const currentDateTime = this.getIndianDateTime();

      const sessionPromise = this.ai.live.connect({
        model: this.liveModelName,
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: "Kore" } } },
          systemInstruction: `
            You are **Monika**, a Senior Sales Executive at **Scallar IT Solution**.
            
            **REAL-TIME KNOWLEDGE:**
            - Current Date and Time (India): ${currentDateTime}
            - You are aware of the current year and time. If someone asks for today's date or the time, use the value provided above.
            
            **STRICT IDENTITY RULES:**
            - You NEVER mention "Gemini", "Google", "AI Model", or "Language Model".
            - If anyone asks "Who created you?" or "Apko kisne banaya hai?", you MUST say: "Mujhe Scallar IT solution ke developer Kamlesh Gupta ji ne banaya hai."
            
            **GENDER & GRAMMAR RULES:**
            - You are FEMALE. Use feminine grammar in Hindi/Hinglish (e.g., "Main karti hoon", "help karungi").
            
            **TOPIC RESTRICTION:**
            - Talk ONLY about **Scallar IT Solution** and its services.
            - Relate your answers to the **user's business**. If they ask about something unrelated, politely bring them back to how Scallar can grow their business.
            
            **COMPANY SERVICES:**
            ${serviceKnowledge}
            
            **GOAL:**
            Persuade user to book a 10-minute Zoom Strategy Session. Repeat details before calling 'create_booking'.
          `,
          tools: [{ functionDeclarations: [checkAvailabilityTool, createBookingTool, cancelBookingTool, navigateToPageTool, highlightServiceTool] }],
          inputAudioTranscription: {},
          outputAudioTranscription: {},
        },
        callbacks: {
          onopen: () => {
            console.log("Live Session Opened");
            this.isConnecting = false;
            this.isSessionOpen = true;
            callbacks.onOpen?.();

            if (!this.inputAudioContext || !this.mediaStream) return;
            const source = this.inputAudioContext.createMediaStreamSource(this.mediaStream);
            this.scriptProcessor = this.inputAudioContext.createScriptProcessor(4096, 1, 1);
            this.scriptProcessor.onaudioprocess = (e) => {
              if (this.isMuted || !this.isSessionOpen) return;
              if (!this.inputAudioContext || (this.inputAudioContext.state as string) === 'closed') return;

              const inputData = e.inputBuffer.getChannelData(0);
              let sum = 0;
              for (let i = 0; i < inputData.length; i++) sum += inputData[i] * inputData[i];
              const rms = Math.sqrt(sum / inputData.length);

              // Only reset silence if user is actually making significant sound
              if (rms > 0.05) {
                this.resetSilenceTimer();
                callbacks.onUserSpeaking?.(rms);
              }

              const pcmBlob = createBlob(inputData);
              if (this.activeSession && this.isSessionOpen) {
                try { this.activeSession.sendRealtimeInput({ media: pcmBlob }); } catch (err) { }
              }
            };
            source.connect(this.scriptProcessor);
            this.scriptProcessor.connect(this.inputAudioContext.destination);
          },
          onmessage: async (message: LiveServerMessage) => {
            if (!this.outputAudioContext || (this.outputAudioContext.state as string) === 'closed') return;

            const base64Audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
            if (base64Audio) {
              this.resetSilenceTimer(); // Model talking counts as activity
              callbacks.onModelSpeaking?.(true);
              this.nextStartTime = Math.max(this.nextStartTime, this.outputAudioContext.currentTime);

              try {
                const audioBuffer = await decodeAudioData(decode(base64Audio), this.outputAudioContext, 24000, 1);
                if (!this.outputAudioContext || (this.outputAudioContext.state as string) === 'closed') return;
                const source = this.outputAudioContext.createBufferSource();
                source.buffer = audioBuffer;
                source.connect(this.analyser!);
                source.addEventListener('ended', () => {
                  this.sources.delete(source);
                  if (this.sources.size === 0) callbacks.onModelSpeaking?.(false);
                });
                source.start(this.nextStartTime);
                this.nextStartTime += audioBuffer.duration;
                this.sources.add(source);
              } catch (e) { console.error("Audio Decode Error", e); }
            }

            if (message.serverContent?.inputTranscription?.text) {
              this.resetSilenceTimer();
              callbacks.onTranscript?.(message.serverContent.inputTranscription.text, true);
            }
            if (message.serverContent?.outputTranscription?.text) {
              this.resetSilenceTimer();
              callbacks.onTranscript?.(message.serverContent.outputTranscription.text, false);
            }

            if (message.toolCall) {
              for (const fc of message.toolCall.functionCalls) {
                const result = await this.executeTool(fc.name, fc.args);
                if (this.activeSession && this.isSessionOpen) {
                  try {
                    this.activeSession.sendToolResponse({ functionResponses: { id: fc.id, name: fc.name, response: { result: result } } });
                  } catch (e) { }
                }
              }
            }

            if (message.serverContent?.interrupted) {
              this.stopAllAudio();
              this.nextStartTime = 0;
              callbacks.onModelSpeaking?.(false);
            }
          },
          onclose: () => {
            this.isSessionOpen = false;
            this.isConnecting = false;
            callbacks.onClose?.();
          },
          onerror: (err) => {
            this.isSessionOpen = false;
            this.isConnecting = false;
            callbacks.onError?.(err instanceof Error ? err : new Error("Connection disrupted."));
            this.disconnectLive();
          }
        }
      });

      this.activeSession = await sessionPromise;

    } catch (error) {
      this.isConnecting = false;
      this.isSessionOpen = false;
      this.disconnectLive();
      callbacks.onError?.(error as Error);
    }
  }

  public disconnectLive() {
    this.isConnecting = false;
    this.isSessionOpen = false;
    this.hasBooked = false;
    this.cleanupSession();
  }

  private cleanupSession() {
    // Clear Timers
    if (this.silenceTimer) { window.clearTimeout(this.silenceTimer); this.silenceTimer = null; }
    if (this.sessionLimitTimer) { window.clearTimeout(this.sessionLimitTimer); this.sessionLimitTimer = null; }

    if (this.activeSession) {
      try { this.activeSession.close(); } catch (e) { }
      this.activeSession = null;
    }
    if (this.animationFrameId) { cancelAnimationFrame(this.animationFrameId); this.animationFrameId = null; }
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach(track => track.stop());
      this.mediaStream = null;
    }
    if (this.scriptProcessor) {
      try { this.scriptProcessor.disconnect(); } catch (e) { }
      this.scriptProcessor = null;
    }
    if (this.inputAudioContext) {
      try { this.inputAudioContext.close(); } catch (e) { }
      this.inputAudioContext = null;
    }
    this.stopAllAudio();
    if (this.outputAudioContext) {
      try { this.outputAudioContext.close(); } catch (e) { }
      this.outputAudioContext = null;
    }
    this.analyser = null;
    this.navigationCallback = null;
    this.highlightCallback = null;
  }

  private stopAllAudio() {
    for (const source of this.sources.values()) {
      try { source.stop(); } catch (e) { }
    }
    this.sources.clear();
  }
}

let _geminiServiceInstance: GeminiService | null = null;

export function getGeminiService(): GeminiService {
  if (!_geminiServiceInstance) {
    _geminiServiceInstance = new GeminiService();
  }
  return _geminiServiceInstance;
}

// Keep backward-compatible export but as a lazy getter
export const geminiService = new Proxy({} as GeminiService, {
  get(_target, prop) {
    return getGeminiService()[prop as keyof GeminiService];
  }
});
