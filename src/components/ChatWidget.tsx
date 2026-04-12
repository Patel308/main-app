'use client';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Mic, MicOff, Power, ChevronDown, Loader2, Phone, X } from 'lucide-react';
import { geminiService } from '@/services/geminiService';

interface ChatWidgetProps {
  isEmbed?: boolean;
}

export default function ChatWidget({ isEmbed = false }: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isModelSpeaking, setIsModelSpeaking] = useState(false);
  const [modelVolume, setModelVolume] = useState(0); 
  const [userVolume, setUserVolume] = useState(0);
  const [currentTranscript, setCurrentTranscript] = useState<string>('');
  const [isMuted, setIsMuted] = useState(false);
  const [callDuration, setCallDuration] = useState(0);

  const videoRef = useRef<HTMLVideoElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (isConnected) {
      setCallDuration(0);
      timerRef.current = setInterval(() => setCallDuration(prev => prev + 1), 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isConnected]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isConnected) return;
    if (isModelSpeaking && modelVolume > 0.01) {
      if (video.paused) video.play().catch(() => {});
      video.playbackRate = 1.0 + (modelVolume * 0.4);
    } else {
      if (!video.paused) video.pause();
    }
  }, [modelVolume, isModelSpeaking, isConnected]);

  // ── Close handler — works for both embed and normal mode ──────────────────
  const handleClose = () => {
  try {
    geminiService.disconnectLive();
  } catch (e) {
    console.error('disconnect error:', e);
  }
  setIsConnected(false);
  setIsConnecting(false);
  setModelVolume(0);

  if (isEmbed) {
    window.parent.postMessage({ type: 'MONIKA_CLOSE' }, '*');
  } else {
    setIsOpen(false);
  }
   };
  const handleStartCall = async () => {
    if (!isOpen) { setIsOpen(true); return; }
    setIsConnecting(true);
    setCurrentTranscript('');
    
    await geminiService.connectLive({
      onOpen: () => { setIsConnected(true); setIsConnecting(false); },
      onClose: () => { 
        setIsConnected(false); 
        setIsConnecting(false); 
        setIsModelSpeaking(false);
        setCurrentTranscript('');
        setModelVolume(0);
      },
      onUserSpeaking: (vol) => { setUserVolume(vol); },
      onModelSpeaking: (speaking) => { setIsModelSpeaking(speaking); },
      onModelVolume: (vol) => setModelVolume(vol),
      onNavigation: (path) => !isEmbed && router.push(path),
      onHighlight: (id) => window.dispatchEvent(new CustomEvent('highlight-service', { detail: { id } })),
      onTranscript: (text, isUser) => { setCurrentTranscript(text); },
      onError: () => { 
        setIsConnected(false); 
        setIsConnecting(false); 
        geminiService.disconnectLive(); 
      }
    });
  };

  const handleEndCall = () => {
    geminiService.disconnectLive();
    setIsConnected(false);
    setIsConnecting(false);
    setModelVolume(0);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    geminiService.setMute(!isMuted);
  };

  const AVATAR_URL = "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80";
  const HEADER_BG = "bg-[#0B1120]"; 

  const containerClasses = isEmbed 
    ? 'relative bottom-0 right-0 w-full h-full' 
    : isOpen 
      ? 'fixed inset-0 z-[9999] sm:inset-auto sm:bottom-6 sm:right-6'
      : 'fixed bottom-6 right-6 z-[9999]';

  return (
    <div className={`${containerClasses} flex flex-col items-end transition-all duration-300 font-sans`}>
      {(isOpen || isEmbed) && (
        <div className={`
            bg-white flex flex-col relative overflow-hidden transition-all duration-300 ease-out shadow-2xl
            ${isEmbed ? 'w-full h-full rounded-none' : 'w-full h-[100dvh] sm:w-[360px] sm:h-[600px] sm:max-h-[85vh] sm:rounded-[20px] rounded-none border-0 sm:border border-gray-200 animate-in slide-in-from-bottom-5 fade-in'}
        `}>
            
            <div className={`${HEADER_BG} px-5 py-4 flex justify-between items-center relative z-20 shrink-0 h-[72px]`}>
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/10 shadow-sm shrink-0">
                        <Image src={AVATAR_URL} alt="Monika AI Agent" fill className="object-cover" sizes="40px" />
                    </div>
                    <div className="flex flex-col justify-center">
                        <h3 className="text-white font-semibold text-[15px] leading-tight tracking-wide">Talk to us!</h3>
                        <div className="flex items-center gap-1.5 mt-0.5">
                            <span className={`w-1.5 h-1.5 rounded-full ${isConnected ? "bg-red-500 animate-pulse" : "bg-emerald-400"}`}></span>
                            <span className="text-[11px] text-emerald-400 font-medium tracking-wide">
                                {isConnected ? "Live Call" : "Online"}
                            </span>
                        </div>
                    </div>
                </div>
                {/* Close button — always visible, works in both embed and normal mode */}
                <button 
                  onClick={handleClose}
                  className="w-8 h-8 rounded-full bg-white/5 text-white/70 hover:bg-white/10 hover:text-white flex items-center justify-center transition-all active:scale-90"
                  aria-label="Close Chat"
                >
                  <X size={22} />
                </button>
            </div>

            <div className="flex-grow flex flex-col relative bg-white overflow-y-auto pt-10 px-6">
                <div className={`flex flex-col items-center transition-all duration-500 ease-in-out`}>
                    <div className="relative mb-5 flex items-center justify-center">
                        {isConnected && (
                          <div 
                            className="absolute rounded-full bg-indigo-600/10 transition-all duration-150 ease-out pointer-events-none"
                            style={{ 
                              width: `${120 + (isModelSpeaking ? modelVolume * 80 : 0)}px`, 
                              height: `${120 + (isModelSpeaking ? modelVolume * 80 : 0)}px`,
                              opacity: isModelSpeaking ? 0.4 + modelVolume : 0
                            }}
                          />
                        )}

                        <div className={`relative z-10 rounded-full overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.08)] bg-white transition-all duration-500 ${isConnected ? 'w-32 h-32 ring-4 ring-indigo-50' : 'w-28 h-28 ring-4 ring-white'}`}>
                              <div className="w-full h-full rounded-full overflow-hidden bg-gray-50 relative">
                                 {isConnected ? (
                                     <video
                                         ref={videoRef}
                                         src="https://videos.pexels.com/video-files/5453667/5453667-uhd_2160_3840_25fps.mp4" 
                                         poster={AVATAR_URL}
                                         className={`w-full h-full object-cover transition-transform duration-500 ${isModelSpeaking ? 'scale-110' : 'scale-100'}`}
                                         playsInline muted loop
                                     />
                                 ) : (
                                     <Image src={AVATAR_URL} alt="Monika AI Agent" fill className={`object-cover transition-transform duration-500 ${isModelSpeaking ? 'scale-110' : 'scale-100'}`} sizes="128px"/>
                                 )}
                              </div>
                        </div>

                          <div className="absolute bottom-1 right-2 w-5 h-5 bg-emerald-500 border-[3px] border-white rounded-full z-20 shadow-sm"></div>
                    </div>

                    <div className="text-center space-y-1">
                        <div className="flex items-center justify-center gap-2">
                            <h2 className="text-[22px] font-bold text-gray-900 tracking-tight">
                                Monika
                            </h2>
                            <span className="bg-blue-50 text-blue-600 text-[10px] font-bold px-2 py-0.5 rounded-full border border-blue-100 tracking-wide">AI</span>
                        </div>
                        <p className="text-gray-400 text-sm font-medium">Support Agent</p>
                    </div>
                </div>

                <div className="flex-grow flex flex-col items-center justify-center mt-2 mb-4 text-center relative w-full px-2">
                    <div className="w-full min-h-[48px] flex items-center justify-center">
                        {!isConnected ? (
                            <p className="text-gray-800 text-[15px] font-medium leading-relaxed animate-in fade-in duration-500">
                                How can I help you today?
                            </p>
                        ) : (
                            <p className="text-gray-800 text-[15px] font-medium leading-relaxed animate-pulse">
                                {currentTranscript || "Listening..."}
                            </p>
                        )}
                    </div>
                </div>

                <div className="w-full pb-8 mt-auto">
                    {!isConnected ? (
                        <button 
                            onClick={handleStartCall}
                            disabled={isConnecting}
                            className={`${HEADER_BG} w-full text-white rounded-full py-4 px-6 flex items-center justify-center gap-3 font-semibold text-[15px] shadow-[0_8px_20px_-5px_rgba(11,17,32,0.3)] hover:bg-black hover:scale-[1.02] active:scale-[0.98] transition-all duration-300`}
                        >
                            {isConnecting ? (
                                <Loader2 size={20} className="animate-spin text-white" />
                            ) : (
                                <>
                                    <Phone size={20} className="fill-white" />
                                    <span>Call us here</span>
                                </>
                            )}
                        </button>
                    ) : (
                        <div className="flex items-center justify-center gap-6 animate-in slide-in-from-bottom-2 duration-300">
                            <button 
                                onClick={toggleMute} 
                                className={`w-14 h-14 rounded-full flex items-center justify-center shadow-md transition-all border ${
                                    isMuted 
                                        ? 'bg-red-50 text-red-500 border-red-200 ring-2 ring-red-100' 
                                        : 'bg-white text-gray-700 border-gray-100 hover:bg-gray-50'
                                }`}
                            >
                                {isMuted ? <MicOff size={22} /> : <Mic size={22} />}
                            </button>
                            
                            <button 
                                onClick={handleEndCall} 
                                className="w-20 h-20 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 shadow-xl shadow-red-500/30 transition-all active:scale-95 ring-4 ring-red-50"
                            >
                                <Power size={30} />
                            </button>
                        </div>
                    )}
                </div>
                
                <div className="pb-2 text-center border-t border-gray-50 pt-4">
                     <p className="text-[11px] text-gray-300 tracking-wide">
                        Powered by <span className="font-semibold text-gray-400">Scallar IT Solution</span>
                     </p>
                </div>
            </div>
        </div>
      )}

      {!isOpen && !isEmbed && (
        <button
            onClick={() => setIsOpen(true)}
            className={`group relative w-16 h-16 md:w-[70px] md:h-[70px] rounded-full overflow-hidden border-[4px] border-white shadow-[0_8px_30px_rgba(0,0,0,0.15)] hover:scale-105 transition-all duration-300 ${HEADER_BG} active:scale-95`}
            aria-label="Open Chat"
        >
            <Image src={AVATAR_URL} alt="Chat with Monika AI" fill className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-90" sizes="70px" />
            
            <div className="absolute top-1.5 right-1.5 flex h-3.5 w-3.5">
               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
               <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-[2px] border-[#0B1120]"></span>
            </div>
        </button>
      )}
    </div>
  );
}