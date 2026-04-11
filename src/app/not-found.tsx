// ✅ BRANDED 404 PAGE — src/app/not-found.tsx
// Next.js automatically uses this file for all 404 errors site-wide.
// No routing needed — just place it here and it works.

import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 — Page Not Found | Scallar IT Solution',
  description: 'The page you are looking for does not exist. Explore our digital marketing and AI automation services.',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-brand-bg flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">

        {/* Big 404 */}
        <div className="relative mb-8">
          <p className="text-[160px] md:text-[220px] font-display font-black text-brand-dark/5 leading-none select-none">
            404
          </p>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-brand-lime w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 26L16 6L26 26" stroke="#0a0a0a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10 20H22" stroke="#0a0a0a" strokeWidth="3" strokeLinecap="round"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Message */}
        <h1 className="text-3xl md:text-4xl font-display font-bold text-brand-dark mb-4">
          This page doesn&apos;t exist
        </h1>
        <p className="text-gray-500 text-lg mb-10 max-w-md mx-auto">
          The page you&apos;re looking for may have moved or been removed. Let&apos;s get you back on track.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-brand-dark text-white px-8 py-4 rounded-full font-bold hover:bg-brand-lime hover:text-brand-dark transition-all duration-300"
          >
            ← Back to Home
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center justify-center gap-2 border-2 border-brand-dark text-brand-dark px-8 py-4 rounded-full font-bold hover:bg-brand-dark hover:text-white transition-all duration-300"
          >
            View Our Services
          </Link>
        </div>

        {/* Quick links */}
        <div className="border-t border-gray-100 pt-8">
          <p className="text-sm text-gray-400 mb-4 font-medium uppercase tracking-wider">
            Popular pages
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { label: 'SEO Services', href: '/services/seo' },
              { label: 'Web Development', href: '/services/web-dev' },
              { label: 'WhatsApp Automation', href: '/services/whatsapp-automation' },
              { label: 'AI Voice Agent', href: '/services/ai-voice' },
              { label: 'Pricing', href: '/pricing' },
              { label: 'Blog', href: '/blog' },
              { label: 'Contact', href: '/contact' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm px-4 py-2 rounded-full bg-white border border-gray-200 text-gray-600 hover:border-brand-lime hover:text-brand-dark transition-all"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
