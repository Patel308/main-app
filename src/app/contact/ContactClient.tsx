'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import Button from '@/components/Button';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Loader2,
  MessageCircle,
  Calendar,
  Linkedin,
  Instagram,
  Facebook,
  CheckCircle2,
  ArrowRight,
  Globe,
} from 'lucide-react';

// ─── DATA ─────────────────────────────────────────────────────────────────────

const REGIONS = [
  {
    flag: '🇺🇸',
    region: 'United States',
    timezone: 'EST / PST',
    hours: 'Mon–Fri: 9 AM – 6 PM EST',
    phone: '+1 (929) 999-0270',
    phoneHref: 'tel:+19299990270',
    whatsapp: 'https://wa.me/19299990270',
    email: 'info@scallar.in',
    badge: 'Popular',
  },
  {
    flag: '🇬🇧',
    region: 'Europe / UK',
    timezone: 'GMT / CET',
    hours: 'Mon–Fri: 9 AM – 6 PM GMT',
    phone: '+44 20 0000 0270',
    phoneHref: 'tel:+442000000270',
    whatsapp: 'https://wa.me/442000000270',
    email: 'info@scallar.in',
    badge: null,
  },
  {
    flag: '🇦🇺',
    region: 'Australia',
    timezone: 'AEST',
    hours: 'Mon–Fri: 9 AM – 6 PM AEST',
    phone: '+61 2 0000 0270',
    phoneHref: 'tel:+61200000270',
    whatsapp: 'https://wa.me/61200000270',
    email: 'info@scallar.in',
    badge: null,
  },
  {
    flag: '🇮🇳',
    region: 'India (HQ)',
    timezone: 'IST',
    hours: 'Mon–Sat: 9 AM – 7 PM IST',
    phone: '+91 85108 06031',
    phoneHref: 'tel:+918510806031',
    whatsapp: 'https://wa.me/918510806031',
    email: 'deepesh@scallar.in',
    badge: 'HQ',
  },
];

const QUICK_CHANNELS = [
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    sub: 'Reply in ~15 mins',
    href: 'https://wa.me/918510806031',
    color: 'bg-green-50 border-green-200 hover:border-green-400',
    iconColor: 'text-green-600',
    ctaColor: 'text-green-700',
  },
  {
    icon: Calendar,
    label: 'Book a Call',
    sub: '30-min free session',
    href: 'https://calendly.com/scallar',
    color: 'bg-blue-50 border-blue-200 hover:border-blue-400',
    iconColor: 'text-blue-600',
    ctaColor: 'text-blue-700',
  },
  {
    icon: Mail,
    label: 'Email Us',
    sub: 'info@scallar.in',
    href: 'mailto:info@scallar.in',
    color: 'bg-purple-50 border-purple-200 hover:border-purple-400',
    iconColor: 'text-purple-600',
    ctaColor: 'text-purple-700',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    sub: 'Connect directly',
    href: 'https://www.linkedin.com/company/109103450',
    color: 'bg-sky-50 border-sky-200 hover:border-sky-400',
    iconColor: 'text-sky-600',
    ctaColor: 'text-sky-700',
  },
];

const HIGH_INTENT_LINKS = [
  { label: '💰 View Pricing Plans', href: '/pricing' },
  { label: '🎨 See Our Portfolio', href: '/portfolio' },
  { label: '🛠️ Explore All Services', href: '/services' },
  { label: '👥 Meet the Team', href: '/team' },
  { label: '📖 Read Our Blog', href: '/blog' },
];

const TRUST_STATS = [
  { value: '230+', label: 'Projects Delivered' },
  { value: '~15 min', label: 'Avg. Response' },
  { value: '4.9 ★', label: 'Client Rating' },
  { value: '12+', label: 'Countries Served' },
];

// ─── COMPONENT ────────────────────────────────────────────────────────────────

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
      company: formData.get('company') as string,
      country: formData.get('country') as string,
      service: formData.get('service') as string,
      budget: formData.get('budget') as string,
      message: formData.get('message') as string,
    };

    const payload = {
      ...data,
      _subject: `New Inquiry — ${data.name} (${data.country}) | Scallar IT`,
      _template: 'table',
      _captcha: 'false',
      _cc: `info@scallar.in,deepesh@scallar.in,${data.email}`,
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

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="px-4 md:px-6 mb-12">
        <div className="max-w-[1400px] mx-auto text-center">
          <span className="inline-block bg-brand-lime/20 text-brand-dark text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            Free Consultation · No Commitment
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-brand-dark mb-4">
            Let&apos;s Build Something{' '}
            <span className="text-brand-lime">That Grows</span>
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Whether you&apos;re in New York, London, Sydney, or Delhi — our team is ready
            to audit your digital presence and build a strategy that delivers real results.
          </p>

          {/* Trust stats */}
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {TRUST_STATS.map((s) => (
              <div key={s.label} className="bg-white rounded-2xl px-4 py-4 shadow-sm border border-gray-100">
                <div className="text-2xl font-bold text-brand-dark">{s.value}</div>
                <div className="text-xs text-gray-400 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── QUICK CHANNELS ────────────────────────────────────────────────── */}
      <section className="px-4 md:px-6 mb-14">
        <div className="max-w-[1400px] mx-auto">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-gray-400 mb-6">
            Reach Us Instantly
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {QUICK_CHANNELS.map((ch) => (
              <a
                key={ch.label}
                href={ch.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group flex flex-col gap-3 rounded-[1.5rem] border p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-md ${ch.color}`}
              >
                <ch.icon size={24} className={ch.iconColor} />
                <div>
                  <div className="font-bold text-brand-dark text-sm">{ch.label}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{ch.sub}</div>
                </div>
                <span className={`text-xs font-semibold flex items-center gap-1 ${ch.ctaColor}`}>
                  Connect <ArrowRight size={12} />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── MAIN: FORM + SIDEBAR ──────────────────────────────────────────── */}
      <section className="px-4 md:px-6 mb-14">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">

          {/* ── FORM ── */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white rounded-[2.5rem] p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-brand-dark mb-2">Tell Us About Your Project</h2>
              <p className="text-gray-400 text-sm mb-6">
                We&apos;ll review your brief and respond within <strong className="text-brand-dark">4 business hours</strong>.
              </p>

              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-brand-lime/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 size={32} className="text-brand-dark" />
                  </div>
                  <h3 className="text-xl font-bold text-brand-dark mb-2">Message Sent!</h3>
                  <p className="text-gray-500 mb-6">We&apos;ll get back to you within 4 business hours.</p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <a
                      href="https://wa.me/918510806031"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-brand-lime text-brand-dark font-semibold px-6 py-3 rounded-full text-sm hover:opacity-90 transition"
                    >
                      <MessageCircle size={16} /> Chat on WhatsApp
                    </a>
                    <Link
                      href="/services"
                      className="inline-flex items-center gap-2 border border-gray-200 text-brand-dark font-semibold px-6 py-3 rounded-full text-sm hover:border-brand-lime transition"
                    >
                      Explore Services <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">

                  {/* Name + Company */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Your Name *"
                      className="w-full px-6 py-4 rounded-full border border-gray-200 focus:border-brand-lime focus:ring-2 focus:ring-brand-lime/20 outline-none transition-all text-sm"
                    />
                    <input
                      type="text"
                      name="company"
                      placeholder="Company / Business"
                      className="w-full px-6 py-4 rounded-full border border-gray-200 focus:border-brand-lime focus:ring-2 focus:ring-brand-lime/20 outline-none transition-all text-sm"
                    />
                  </div>

                  {/* Email + Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="Email Address *"
                      className="w-full px-6 py-4 rounded-full border border-gray-200 focus:border-brand-lime focus:ring-2 focus:ring-brand-lime/20 outline-none transition-all text-sm"
                    />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone / WhatsApp"
                      className="w-full px-6 py-4 rounded-full border border-gray-200 focus:border-brand-lime focus:ring-2 focus:ring-brand-lime/20 outline-none transition-all text-sm"
                    />
                  </div>

                  {/* Country */}
                  <select
                    name="country"
                    required
                    defaultValue=""
                    className="w-full px-6 py-4 rounded-full border border-gray-200 focus:border-brand-lime focus:ring-2 focus:ring-brand-lime/20 outline-none transition-all bg-white text-sm text-gray-500"
                  >
                    <option value="" disabled>Select Your Country / Region *</option>
                    <option>United States</option>
                    <option>United Kingdom</option>
                    <option>Australia</option>
                    <option>Canada</option>
                    <option>India</option>
                    <option>UAE / Middle East</option>
                    <option>Singapore</option>
                    <option>Germany</option>
                    <option>Other Europe</option>
                    <option>Other</option>
                  </select>

                  {/* Service */}
                  <select
                    name="service"
                    required
                    defaultValue=""
                    className="w-full px-6 py-4 rounded-full border border-gray-200 focus:border-brand-lime focus:ring-2 focus:ring-brand-lime/20 outline-none transition-all bg-white text-sm text-gray-500"
                  >
                    <option value="" disabled>Select Service *</option>
                    <option>Digital Marketing</option>
                    <option>SEO Optimization</option>
                    <option>Google & Meta Ads (PPC)</option>
                    <option>Web Development</option>
                    <option>AI Automation & Voice Agents</option>
                    <option>WhatsApp Automation</option>
                    <option>App Development</option>
                    <option>Branding & Design</option>
                    <option>Other / Not Sure Yet</option>
                  </select>

                  {/* Budget — pill select */}
                  <div>
                    <p className="text-xs text-gray-400 font-medium mb-3 px-1">Monthly Budget (USD)</p>
                    <div className="flex flex-wrap gap-2">
                      {['Under $500', '$500–$1k', '$1k–$3k', '$3k–$10k', '$10k+', 'Let\'s Discuss'].map((b) => (
                        <label
                          key={b}
                          className="cursor-pointer has-[:checked]:bg-brand-lime has-[:checked]:border-brand-lime has-[:checked]:text-brand-dark border border-gray-200 rounded-full px-4 py-2 text-xs text-gray-500 font-medium transition-all hover:border-brand-lime"
                        >
                          <input type="radio" name="budget" value={b} className="sr-only" />
                          {b}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Message */}
                  <textarea
                    name="message"
                    required
                    placeholder="Tell us about your project, goals, and what you need help with... *"
                    rows={5}
                    className="w-full px-6 py-4 rounded-2xl border border-gray-200 focus:border-brand-lime focus:ring-2 focus:ring-brand-lime/20 outline-none transition-all resize-none text-sm"
                  />

                  <Button type="submit" className="w-full rounded-full" disabled={submitting}>
                    {submitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <Loader2 size={16} className="animate-spin" /> Sending...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        Send Message — Get Free Audit <ArrowRight size={16} />
                      </span>
                    )}
                  </Button>

                  <p className="text-center text-xs text-gray-400">
                    🔒 Your data is private. We never share or sell your information.
                  </p>
                </form>
              )}
            </div>
          </div>

          {/* ── SIDEBAR ── */}
          <aside className="lg:col-span-2 space-y-6">

            {/* Direct contacts — dark card matching existing style */}
            <div className="bg-brand-dark rounded-[2.5rem] p-8 text-white">
              <h2 className="text-2xl font-bold mb-6">Contact Info</h2>
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm mb-1">Registered Office</h3>
                    <p className="text-gray-400 text-sm">C-4/105, Pocket C 3, New Kondli<br />Delhi – 110096, India</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                    <Phone size={18} />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm mb-1">Phone / WhatsApp</h3>
                    <a href="tel:+918510806031" className="text-gray-400 text-sm hover:text-brand-lime transition-colors block">
                      +91 85108 06031
                    </a>
                    <a href="tel:+919311390270" className="text-gray-400 text-sm hover:text-brand-lime transition-colors block">
                      +91 93113 90270
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                    <Mail size={18} />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm mb-1">Email</h3>
                    <a href="mailto:info@scallar.in" className="text-gray-400 text-sm hover:text-brand-lime transition-colors block">
                      info@scallar.in
                    </a>
                    <a href="mailto:deepesh@scallar.in" className="text-gray-400 text-sm hover:text-brand-lime transition-colors block">
                      deepesh@scallar.in
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                    <Clock size={18} />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm mb-1">Hours</h3>
                    <p className="text-gray-400 text-sm">Mon – Sat: 9:00 AM – 7:00 PM IST</p>
                    <p className="text-gray-400 text-sm">Sun: Emergency support only</p>
                  </div>
                </div>

                {/* Social links */}
                <div className="pt-4 border-t border-white/10">
                  <h3 className="font-bold text-sm mb-3">Follow Us</h3>
                  <div className="flex gap-3">
                    {[
                      { icon: Linkedin, href: 'https://www.linkedin.com/company/109103450', label: 'LinkedIn' },
                      { icon: Instagram, href: 'https://www.instagram.com/scallarit', label: 'Instagram' },
                      { icon: Facebook, href: 'https://www.facebook.com/profile.php?id=61579444817950', label: 'Facebook' },
                    ].map((s) => (
                      <a
                        key={s.label}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={s.label}
                        className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-brand-lime hover:text-brand-dark transition-all"
                      >
                        <s.icon size={16} />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* High-intent links */}
            <div className="bg-white rounded-[2.5rem] p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-brand-dark mb-1">Before You Contact Us</h3>
              <p className="text-xs text-gray-400 mb-4">These pages answer most pre-sales questions:</p>
              <ul className="space-y-2">
                {HIGH_INTENT_LINKS.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="flex items-center justify-between rounded-full border border-gray-100 px-5 py-3 text-sm font-medium text-brand-dark hover:border-brand-lime hover:bg-brand-lime/10 transition-all"
                    >
                      {l.label}
                      <ArrowRight size={14} className="text-gray-400" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Google Maps */}
            <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-gray-100 h-56">
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
          </aside>
        </div>
      </section>

      {/* ── GLOBAL REGIONS ────────────────────────────────────────────────── */}
      <section className="px-4 md:px-6 mb-14">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-8">
            <Globe size={24} className="inline-block text-brand-lime mb-2" />
            <h2 className="text-2xl font-bold text-brand-dark">We Serve Clients Worldwide</h2>
            <p className="text-gray-400 text-sm mt-1">Same team, same quality — whatever your timezone</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {REGIONS.map((r) => (
              <div key={r.region} className="relative bg-white rounded-[2rem] border border-gray-100 p-6 shadow-sm hover:shadow-md transition-all">
                {r.badge && (
                  <span className="absolute top-4 right-4 bg-brand-lime text-brand-dark text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wide">
                    {r.badge}
                  </span>
                )}
                <div className="text-3xl mb-3">{r.flag}</div>
                <h3 className="font-bold text-brand-dark text-sm">{r.region}</h3>
                <p className="text-xs text-gray-400 mb-3">{r.timezone}</p>
                <div className="space-y-1.5 text-xs text-gray-500">
                  <div className="flex items-center gap-2">
                    <Clock size={12} className="shrink-0" /> {r.hours}
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={12} className="shrink-0" />
                    <a href={r.phoneHref} className="hover:text-brand-dark transition-colors">{r.phone}</a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail size={12} className="shrink-0" />
                    <a href={`mailto:${r.email}`} className="hover:text-brand-dark transition-colors">{r.email}</a>
                  </div>
                </div>
                <a
                  href={r.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 flex items-center justify-center gap-2 bg-brand-lime/10 hover:bg-brand-lime text-brand-dark text-xs font-semibold py-2.5 rounded-full transition-all"
                >
                  <MessageCircle size={13} /> WhatsApp
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS STEPS ─────────────────────────────────────────────────── */}
      <section className="px-4 md:px-6 mb-14">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="text-2xl font-bold text-brand-dark text-center mb-8">What Happens After You Reach Out?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { step: '01', emoji: '🔍', title: 'Free Audit', body: 'We analyse your website, ads, and SEO within 24 hours and identify the biggest revenue leaks.' },
              { step: '02', emoji: '📋', title: 'Strategy Session', body: 'A 30-min call where our strategist presents a custom growth roadmap — zero fluff, all numbers.' },
              { step: '03', emoji: '🚀', title: 'We Execute', body: 'Once you\'re happy with the plan, we begin immediately. Most clients see results within 30 days.' },
            ].map((s) => (
              <div key={s.step} className="bg-white rounded-[2rem] border border-gray-100 p-7 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">{s.emoji}</span>
                  <span className="bg-brand-lime/20 text-brand-dark text-xs font-bold px-3 py-1 rounded-full">Step {s.step}</span>
                </div>
                <h3 className="font-bold text-brand-dark mb-2">{s.title}</h3>
                <p className="text-sm text-gray-500">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────────────────────────────── */}
      <section className="px-4 md:px-6 mb-14">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="text-2xl font-bold text-brand-dark text-center mb-8">Clients Across the Globe Trust Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { quote: 'Scallar got us 500+ qualified leads in the first month. The ROI was unreal.', name: 'Priya Sharma', role: 'Director, EdTech Solutions · India' },
              { quote: 'We saw organic traffic double within 3 months. They built a real sales engine.', name: 'Rohan Mehta', role: 'Founder, Urban Retail · USA' },
              { quote: 'AI automation saved our team 20 hours a week. Truly transformative.', name: 'Sarah Jenkins', role: 'Marketing Head, FinTech Corp · UK' },
            ].map((t) => (
              <blockquote key={t.name} className="bg-white rounded-[2rem] border border-gray-100 p-6 shadow-sm">
                <p className="text-sm text-gray-600 italic mb-4">&ldquo;{t.quote}&rdquo;</p>
                <footer>
                  <div className="font-bold text-brand-dark text-sm">{t.name}</div>
                  <div className="text-xs text-gray-400">{t.role}</div>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ────────────────────────────────────────────────────── */}
      <section className="px-4 md:px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="bg-brand-dark rounded-[2.5rem] p-10 md:p-14 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Not Sure Where to Start?</h2>
            <p className="text-gray-400 mb-8 max-w-lg mx-auto">
              Book a free 30-min strategy call. We&apos;ll tell you exactly what will move the needle for your business.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://calendly.com/scallar"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-brand-lime text-brand-dark font-bold px-8 py-4 rounded-full hover:opacity-90 transition text-sm"
              >
                <Calendar size={16} /> Book Free Strategy Call
              </a>
              <a
                href="https://wa.me/918510806031"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 border border-white/20 text-white font-bold px-8 py-4 rounded-full hover:bg-white/10 transition text-sm"
              >
                <MessageCircle size={16} /> Chat on WhatsApp
              </a>
            </div>
            {/* Internal links */}
            <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-gray-500">
              {[
                { label: 'SEO Services', href: '/services/seo' },
                { label: 'Web Development', href: '/services/web-dev' },
                { label: 'Digital Marketing', href: '/services/digital-marketing' },
                { label: 'AI Voice Agents', href: '/services/ai-voice' },
                { label: 'Pricing', href: '/pricing' },
                { label: 'Portfolio', href: '/portfolio' },
              ].map((l) => (
                <Link key={l.label} href={l.href} className="hover:text-brand-lime transition-colors">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}