'use client';
import Image from 'next/image';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowRight, Linkedin, Instagram, Facebook } from 'lucide-react';
import { NAV_LINKS } from '@/constants';
import Button from '@/components/Button';
import ChatWidget from '@/components/ChatWidget';

const SOCIAL_LINKS = {
  linkedin:  'https://www.linkedin.com/company/109103450',
  instagram: 'https://www.instagram.com/scallarit',
  facebook:  'https://www.facebook.com/profile.php?id=61579444817950',
};

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMobileMenuOpen]);

  const isEmbedMode = pathname.startsWith('/monika-embed');

  if (isEmbedMode) {
    return (
      <div className="fixed inset-0 bg-transparent overflow-hidden flex items-end justify-end pointer-events-none">
        <div className="pointer-events-auto">{children}</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen font-sans selection:bg-brand-lime selection:text-brand-dark overflow-x-hidden bg-brand-bg">

      {/* ── Nav ─────────────────────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 w-full z-50 bg-brand-bg/90 backdrop-blur-md border-b border-brand-dark/5 pt-3 pb-3 md:pt-4 md:pb-4 transition-all duration-300 shadow-sm">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-12">
          <div className="flex justify-between items-center h-14 md:h-16">

            {/* Logo */}
            <Link href="/" className="flex-shrink-0 flex flex-col items-center justify-center cursor-pointer group hover:scale-105 transition-transform duration-300 z-50 relative" aria-label="Scallar IT Solution Home">
              <div className="flex items-center leading-none">
                <span className="text-[#FF1F1F] font-display font-bold text-2xl md:text-3xl tracking-tight">SC</span>
                <span className="text-black font-display font-bold text-2xl md:text-3xl tracking-tight">ALLAR</span>
              </div>
              <span className="text-[#0054D2] font-display font-bold text-[0.55rem] md:text-[0.65rem] tracking-[0.2em] leading-tight mt-0.5 md:mt-1">IT SOLUTION</span>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-8 lg:gap-10">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.name}
                  href={link.path}
                  className={`text-sm font-medium transition-all duration-300 hover:text-brand-dark hover:scale-105 ${pathname === link.path ? 'text-brand-dark font-bold' : 'text-brand-dark/70'}`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-4">
              <Link href="/contact">
                <Button variant="outline" className="rounded-full border-brand-dark text-brand-dark hover:bg-brand-dark hover:text-white px-5 py-2 text-sm font-semibold transition-all hover:shadow-lg">
                  Get started
                </Button>
              </Link>
              <a
                href="https://wa.me/918510806031"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 flex items-center justify-center hover:scale-110 transition-transform"
                aria-label="WhatsApp Scallar IT Solution"
              >
                <Image
                  src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                  alt="WhatsApp"
                  width={40}
                  height={40}
                  unoptimized
                />
              </a>
            </div>

            {/* Mobile Hamburger */}
            <div className="md:hidden flex items-center z-50">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-brand-dark focus:outline-none p-2"
                aria-label="Toggle Menu"
              >
                {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div
          className={`md:hidden fixed inset-0 z-40 bg-brand-bg transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
          style={{ height: '100dvh' }}
        >
          <div className="flex flex-col items-center justify-center h-full space-y-6 pb-20 px-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                className={`text-2xl font-display font-bold transition-colors ${pathname === link.path ? 'text-brand-lime' : 'text-brand-dark'}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-8 w-full max-w-xs">
              <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="block w-full">
                <Button variant="brand" size="lg" className="w-full text-lg py-4">Get started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-grow pt-20 md:pt-24">
        {children}
      </main>
      <ChatWidget isEmbed={false} />

      {/* ── Footer ──────────────────────────────────────────────────────── */}
      <footer className="bg-[#050505] text-white pt-20 pb-10 rounded-t-[2.5rem] md:rounded-t-[4rem] mt-20 mx-0 md:mx-4 relative overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand-lime/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-20 mb-16">

            {/* Brand + CTA */}
            <div className="max-w-xl">
              <Link href="/" className="inline-block mb-8 group" aria-label="Scallar IT Solution Home">
                <div className="flex flex-col items-center">
                  <div className="flex items-center leading-none">
                    <span className="text-[#FF1F1F] font-display font-bold text-3xl md:text-4xl tracking-tight">SC</span>
                    <span className="text-white font-display font-bold text-3xl md:text-4xl tracking-tight">ALLAR</span>
                  </div>
                  <span className="text-[#0054D2] font-display font-bold text-[0.65rem] md:text-[0.75rem] tracking-[0.2em] leading-tight mt-1 md:mt-1.5">IT SOLUTION</span>
                </div>
              </Link>

              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 leading-tight">
                Ready to scale your <span className="text-[#0054D2]">revenue?</span>
              </h2>
              <p className="text-gray-400 text-lg mb-8 max-w-md">
                Join hundreds of businesses that trust Scallar IT Solution for their digital growth.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link href="/contact">
                  <Button variant="white" className="rounded-full px-8 py-4 text-base">Book a Call</Button>
                </Link>
                <Link href="/services">
                  <Button variant="outline" className="rounded-full px-8 py-4 text-base border-white/20 text-white hover:bg-white/10 hover:border-white">
                    Our Services
                  </Button>
                </Link>
              </div>

              {/* Social Icons — no Twitter */}
              <div className="flex gap-4 mt-6">
                <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noreferrer" aria-label="Scallar IT Solution on LinkedIn" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#0077b5] transition-all">
                  <Linkedin size={18} />
                </a>
                <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noreferrer" aria-label="Scallar IT Solution on Instagram" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#E1306C] transition-all">
                  <Instagram size={18} />
                </a>
                <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noreferrer" aria-label="Scallar IT Solution on Facebook" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#4267B2] transition-all">
                  <Facebook size={18} />
                </a>
              </div>
            </div>

            {/* Footer Links — 4 columns */}
            <div className="flex-grow grid grid-cols-2 md:grid-cols-4 gap-8 w-full lg:w-auto">
              <div>
                <h3 className="font-bold text-white mb-6 text-lg">Company</h3>
                <ul className="space-y-4 text-gray-400">
                  <li><Link href="/" className="hover:text-brand-lime transition-colors">Home</Link></li>
                  <li><Link href="/team" className="hover:text-brand-lime transition-colors">Team</Link></li>
                  <li><Link href="/pricing" className="hover:text-brand-lime transition-colors">Pricing</Link></li>
                  <li><Link href="/portfolio" className="hover:text-brand-lime transition-colors">Portfolio</Link></li>
                  <li><Link href="/contact" className="hover:text-brand-lime transition-colors">Contact</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-white mb-6 text-lg">Services</h3>
                <ul className="space-y-4 text-gray-400">
                  <li><Link href="/services/seo" className="hover:text-brand-lime transition-colors">SEO Optimization</Link></li>
                  <li><Link href="/services/ppc-advertising" className="hover:text-brand-lime transition-colors">PPC Ads</Link></li>
                  <li><Link href="/services/web-dev" className="hover:text-brand-lime transition-colors">Web Development</Link></li>
                  <li><Link href="/services/whatsapp-automation" className="hover:text-brand-lime transition-colors">WhatsApp Automation</Link></li>
                  <li><Link href="/services/ai-voice" className="hover:text-brand-lime transition-colors">AI Voice Agent</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-white mb-6 text-lg">Industries</h3>
                <ul className="space-y-4 text-gray-400">
                  <li><Link href="/industries/restaurants" className="hover:text-brand-lime transition-colors">Restaurants</Link></li>
                  <li><Link href="/industries/healthcare" className="hover:text-brand-lime transition-colors">Healthcare</Link></li>
                  <li><Link href="/industries/real-estate" className="hover:text-brand-lime transition-colors">Real Estate</Link></li>
                  <li><Link href="/industries/ecommerce" className="hover:text-brand-lime transition-colors">E-commerce</Link></li>
                  <li><Link href="/industries" className="hover:text-brand-lime transition-colors font-medium">All Industries →</Link></li>
                </ul>
              </div>
              <div className="col-span-2 md:col-span-1">
                <h3 className="font-bold text-white mb-6 text-lg">Connect</h3>
                <ul className="space-y-4 text-gray-400">
                  <li><Link href="/blog" className="hover:text-brand-lime transition-colors">Blog & Resources</Link></li>
                  <li>
                    <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noreferrer" className="hover:text-brand-lime transition-colors flex items-center gap-2">
                      LinkedIn <ArrowRight size={14} className="-rotate-45 opacity-50" />
                    </a>
                  </li>
                  <li>
                    <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noreferrer" className="hover:text-brand-lime transition-colors flex items-center gap-2">
                      Instagram <ArrowRight size={14} className="-rotate-45 opacity-50" />
                    </a>
                  </li>
                  <li>
                    <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noreferrer" className="hover:text-brand-lime transition-colors flex items-center gap-2">
                      Facebook <ArrowRight size={14} className="-rotate-45 opacity-50" />
                    </a>
                  </li>
                  <li>
                    <a href="mailto:Info@scallar.in" className="hover:text-brand-lime transition-colors flex items-center gap-2">
                      Info@scallar.in
                    </a>
                  </li>
                  <li>
                    <a href="tel:+918510806031" className="hover:text-brand-lime transition-colors flex items-center gap-2">
                      +91 8510806031
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500 font-medium">
            <p>© {new Date().getFullYear()} <a href="https://scallar.in" className="hover:text-white transition-colors">Scallar IT Solution</a>. All rights reserved.</p>
            <div className="flex gap-8">
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}