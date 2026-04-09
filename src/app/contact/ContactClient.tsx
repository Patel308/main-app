'use client';

// All form state and submission logic lives here.
// The Server Component (page.tsx) imports this — keeping metadata on the server.

import { useState, FormEvent } from 'react';
import Button from '@/components/Button';
import { Mail, Phone, MapPin, ArrowRight, Clock, Loader2 } from 'lucide-react';

export default function ContactClient() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const getIndianDateTime = () =>
    new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'full',
      timeStyle: 'medium',
    });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      service: formData.get('service') as string,
      message: formData.get('message') as string,
    };

    const payload = {
      ...data,
      _subject: `New Inquiry - ${data.name} - Scallar IT`,
      _template: 'table',
      _captcha: 'false',
      _cc: `Info@scallar.in,${data.email}`,
      _replyto: data.email,
      SubmissionTime: getIndianDateTime(),
    };

    try {
      const response = await fetch('https://formsubmit.co/ajax/kamleshg9569@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });
      if (response.ok) setSubmitted(true);
      else alert('Could not send message. Please try again.');
    } catch {
      alert('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-brand-bg min-h-screen pt-24 md:pt-32 pb-20">

      <section className="px-4 md:px-6 mb-16">
        <div className="max-w-[1400px] mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-brand-dark mb-4">
            Let&apos;s <span className="text-brand-lime">Connect</span>
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Have a project in mind? We&apos;d love to hear from you.
          </p>
        </div>
      </section>

      <section className="px-4 md:px-6">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

          {/* ── Form ──────────────────────────────────────────────────────── */}
          <div className="space-y-8">
            <div className="bg-white rounded-[2.5rem] p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-brand-dark mb-6">Get in Touch</h2>
              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ArrowRight className="text-green-500" size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-brand-dark mb-2">Thank You!</h3>
                  <p className="text-gray-500">We&apos;ll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Your Name"
                      className="w-full px-6 py-4 rounded-full border border-gray-200 focus:border-brand-lime focus:ring-2 focus:ring-brand-lime/20 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="Email Address"
                      className="w-full px-6 py-4 rounded-full border border-gray-200 focus:border-brand-lime focus:ring-2 focus:ring-brand-lime/20 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      className="w-full px-6 py-4 rounded-full border border-gray-200 focus:border-brand-lime focus:ring-2 focus:ring-brand-lime/20 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <select
                      name="service"
                      className="w-full px-6 py-4 rounded-full border border-gray-200 focus:border-brand-lime focus:ring-2 focus:ring-brand-lime/20 outline-none transition-all bg-white"
                    >
                      <option value="">Select Service</option>
                      <option value="Digital Marketing">Digital Marketing</option>
                      <option value="SEO">SEO</option>
                      <option value="Web Development">Web Development</option>
                      <option value="AI Automation">AI Automation</option>
                      <option value="Branding">Branding</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <textarea
                      name="message"
                      required
                      placeholder="Your Message"
                      rows={4}
                      className="w-full px-6 py-4 rounded-2xl border border-gray-200 focus:border-brand-lime focus:ring-2 focus:ring-brand-lime/20 outline-none transition-all resize-none"
                    />
                  </div>
                  <Button type="submit" className="w-full rounded-full" disabled={submitting}>
                    {submitting ? <Loader2 className="animate-spin" /> : 'Send Message'}
                  </Button>
                </form>
              )}
            </div>
          </div>

          {/* ── Info ──────────────────────────────────────────────────────── */}
          <div className="space-y-8">
            <div className="bg-brand-dark rounded-[2.5rem] p-8 text-white">
              <h2 className="text-2xl font-bold mb-6">Contact Info</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Address</h3>
                    <p className="text-gray-400 text-sm">
                      C-4/105, Pocket C 3, New Kondli, Delhi - 110096
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Phone</h3>
                    <a href="tel:+918510806031" className="text-gray-400 text-sm hover:text-brand-lime transition-colors">
                      +91 8510806031
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Email</h3>
                    <a href="mailto:Info@scallar.in" className="text-gray-400 text-sm hover:text-brand-lime transition-colors">
                      Info@scallar.in
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                    <Clock size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Hours</h3>
                    <p className="text-gray-400 text-sm">Mon – Sat: 9:00 AM – 7:00 PM IST</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Maps embed */}
            <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-lg h-64">
              <iframe
                title="Scallar IT Solution office location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.6!2d77.3205!3d28.6138!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDM2JzQ5LjciTiA3N8KwMTknMTMuOCJF!5e0!3m2!1sen!2sin!4v1000000000000"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
