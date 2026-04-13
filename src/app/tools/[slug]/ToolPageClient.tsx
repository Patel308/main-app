'use client';

import Link from 'next/link';
import {
  Check, ChevronRight, ChevronDown, ChevronUp,
  ArrowRight, Zap, Users, BarChart3, Lightbulb,
  ExternalLink, Star,
} from 'lucide-react';
import { useState } from 'react';
import Button from '@/components/Button';
import type { ToolPage } from '@/data/tools';

interface Props {
  tool: ToolPage;
  relatedTools: ToolPage[];
}

// ─── FAQ accordion item ───────────────────────────────────────────────────────
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-start gap-4 py-5 text-left"
      >
        <span className="font-medium text-brand-dark text-base leading-snug">{q}</span>
        {open
          ? <ChevronUp size={18} className="shrink-0 text-gray-400 mt-0.5" />
          : <ChevronDown size={18} className="shrink-0 text-gray-400 mt-0.5" />
        }
      </button>
      {open && <p className="pb-5 text-gray-500 leading-relaxed text-sm md:text-base">{a}</p>}
    </div>
  );
}

// ─── Category badge colours ───────────────────────────────────────────────────
const CATEGORY_COLORS: Record<string, string> = {
  'Marketing':   'bg-blue-50 text-blue-700 border-blue-100',
  'Automation':  'bg-purple-50 text-purple-700 border-purple-100',
  'IT & Dev':    'bg-gray-100 text-gray-700 border-gray-200',
  'Data & AI':   'bg-green-50 text-green-700 border-green-100',
  'Ads & Social':'bg-orange-50 text-orange-700 border-orange-100',
};

export default function ToolPageClient({ tool, relatedTools }: Props) {
  return (
    <div className="w-full min-h-screen bg-brand-bg">

      {/* ── Breadcrumb ─────────────────────────────────────────────────────── */}
      <div className="pt-24 md:pt-28 px-4 md:px-6">
        <div className="max-w-[1400px] mx-auto">
          <nav className="flex items-center gap-1.5 text-sm text-gray-400 flex-wrap" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-brand-dark transition-colors">Home</Link>
            <ChevronRight size={14} />
            <Link href="/tools" className="hover:text-brand-dark transition-colors">Tools</Link>
            <ChevronRight size={14} />
            <span
              className={`text-xs font-bold px-2 py-0.5 rounded-full border ${CATEGORY_COLORS[tool.category] ?? 'bg-gray-100 text-gray-600 border-gray-200'}`}
            >
              {tool.category}
            </span>
            <ChevronRight size={14} />
            <span className="text-brand-dark font-medium truncate max-w-[200px]">{tool.title}</span>
          </nav>
        </div>
      </div>

      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section className="pb-16 md:pb-20 pt-8 px-4 md:px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="max-w-4xl">
            <span
              className={`inline-block text-xs font-bold px-3 py-1 rounded-full border mb-5 ${CATEGORY_COLORS[tool.category] ?? 'bg-gray-100 text-gray-600 border-gray-200'}`}
            >
              {tool.category} Tool
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-brand-dark mb-6 leading-tight">
              {tool.hero_heading}
            </h1>
            <p className="text-gray-500 text-lg md:text-xl leading-relaxed mb-8 max-w-3xl">
              {tool.hero_subheading}
            </p>
            <p className="text-gray-600 text-base leading-relaxed mb-10 max-w-3xl">
              {tool.overview}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact">
                <Button className="rounded-full px-8 py-4">
                  Get a Free Consultation <ArrowRight size={16} className="ml-2" />
                </Button>
              </Link>
              <Link href="/services">
                <Button variant="outline" className="rounded-full px-8 py-4">
                  View All Services
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features + Benefits ────────────────────────────────────────────── */}
      <section className="py-16 md:py-20 px-4 md:px-6 bg-white">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

          {/* Features */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-brand-dark rounded-xl flex items-center justify-center">
                <Zap size={18} className="text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-brand-dark">
                Key Features
              </h2>
            </div>
            <div className="space-y-4">
              {tool.features.map((feature, i) => (
                <div key={i} className="flex items-start gap-3 group">
                  <div className="w-6 h-6 rounded-full bg-brand-lime/20 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-brand-lime transition-colors">
                    <Check size={13} className="text-brand-dark" />
                  </div>
                  <p className="text-gray-700 leading-relaxed">{feature}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-[#0054D2] rounded-xl flex items-center justify-center">
                <BarChart3 size={18} className="text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-brand-dark">
                Business Benefits
              </h2>
            </div>
            <div className="space-y-4">
              {tool.benefits.map((benefit, i) => (
                <div key={i} className="flex items-start gap-3 p-4 bg-brand-bg rounded-2xl hover:bg-gray-50 transition-colors">
                  <Star size={16} className="text-[#FF1F1F] shrink-0 mt-0.5 fill-[#FF1F1F]" />
                  <p className="text-gray-700 font-medium leading-relaxed">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── How It Works ───────────────────────────────────────────────────── */}
      <section className="py-16 md:py-20 px-4 md:px-6 bg-brand-bg">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-[#FF1F1F] rounded-xl flex items-center justify-center">
              <Lightbulb size={18} className="text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-brand-dark">
              How It Works
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {tool.how_it_works.map((step, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all hover:-translate-y-1 relative">
                <div className="w-10 h-10 rounded-full bg-brand-dark text-white flex items-center justify-center font-bold text-lg mb-4">
                  {i + 1}
                </div>
                <p className="text-gray-700 leading-relaxed text-sm md:text-base">{step}</p>
                {i < tool.how_it_works.length - 1 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                    <ChevronRight size={20} className="text-gray-300" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Use Cases ──────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-20 px-4 md:px-6 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-brand-lime/20 rounded-xl flex items-center justify-center">
              <Users size={18} className="text-brand-dark" />
            </div>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-brand-dark">
              Use Cases
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {tool.use_cases.map((useCase, i) => (
              <div
                key={i}
                className="bg-brand-bg border border-gray-100 rounded-2xl p-5 hover:border-brand-dark transition-colors hover:shadow-sm"
              >
                <div className="w-8 h-8 rounded-lg bg-brand-dark/5 flex items-center justify-center mb-3">
                  <span className="text-brand-dark font-bold text-sm">{String.fromCharCode(65 + i)}</span>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed font-medium">{useCase}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Internal Links to Services (SEO interlinking) ─────────────────── */}
      <section className="py-16 md:py-20 px-4 md:px-6 bg-[#0B1120]">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-4">
            Take It Further With Expert Services
          </h2>
          <p className="text-gray-400 mb-10 max-w-2xl">
            This tool is a starting point. For full-scale implementation, strategy, and ongoing optimisation — our specialists take you the rest of the way.
          </p>
          <div className="grid sm:grid-cols-2 gap-5">
            {tool.related_services.map((service) => (
              <Link
                key={service.id}
                href={`/services/${service.id}`}
                className="group flex items-start gap-4 bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-white/20 transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-[#FF1F1F]/20 flex items-center justify-center shrink-0">
                  <ExternalLink size={16} className="text-[#FF1F1F]" />
                </div>
                <div className="flex-1">
                  <p className="text-gray-300 text-sm leading-relaxed mb-3">{service.anchor}</p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-bold text-white group-hover:gap-2.5 transition-all">
                    {service.label} <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Additional navigation interlinking */}
          <div className="mt-10 pt-10 border-t border-white/10">
            <p className="text-gray-500 text-sm mb-4">Explore more from Scallar IT Solution</p>
            <div className="flex flex-wrap gap-3">
              {[
                { label: 'All Services', href: '/services' },
                { label: 'Our Work', href: '/portfolio' },
                { label: 'Pricing', href: '/pricing' },
                { label: 'Blog & Insights', href: '/blog' },
                { label: 'Industries We Serve', href: '/industries' },
                { label: 'About Us', href: '/about' },
                { label: 'Meet the Team', href: '/team' },
              ].map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  className="text-sm bg-white/5 border border-white/10 text-gray-400 font-medium px-4 py-1.5 rounded-full hover:bg-white/10 hover:text-white transition-all"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────────────────── */}
      {tool.faqs.length > 0 && (
        <section className="py-16 md:py-20 px-4 md:px-6 bg-brand-bg">
          <div className="max-w-[1400px] mx-auto">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-brand-dark mb-10">
              Frequently Asked Questions
            </h2>
            <div className="max-w-3xl bg-white rounded-[2rem] p-6 md:p-10 shadow-sm border border-gray-100">
              {tool.faqs.map((faq, i) => (
                <FaqItem key={i} q={faq.q} a={faq.a} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Related Tools in Same Category ─────────────────────────────────── */}
      {relatedTools.length > 0 && (
        <section className="py-16 md:py-20 px-4 md:px-6 bg-white">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-display font-bold text-brand-dark">
                More {tool.category} Tools
              </h2>
              <Link
                href="/tools"
                className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-[#0054D2] hover:underline"
              >
                View all tools <ArrowRight size={14} />
              </Link>
            </div>
            <div className="grid sm:grid-cols-3 gap-5">
              {relatedTools.map((related) => (
                <Link
                  key={related.slug}
                  href={`/tools/${related.slug}`}
                  className="group bg-brand-bg border border-gray-100 rounded-2xl p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all"
                >
                  <span
                    className={`inline-block text-[10px] font-bold px-2.5 py-0.5 rounded-full border mb-3 ${CATEGORY_COLORS[related.category] ?? 'bg-gray-100 text-gray-600 border-gray-200'}`}
                  >
                    {related.category}
                  </span>
                  <h3 className="font-bold text-gray-900 mb-2 group-hover:text-[#0054D2] transition-colors leading-snug">
                    {related.title}
                  </h3>
                  <p className="text-gray-500 text-xs leading-relaxed line-clamp-2 mb-3">
                    {related.meta_description}
                  </p>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-[#0054D2] group-hover:gap-2 transition-all">
                    Explore tool <ArrowRight size={11} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ────────────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-20 px-4 md:px-6 bg-brand-bg">
        <div className="max-w-5xl mx-auto">
          <div className="bg-[#0B1120] rounded-[2.5rem] p-10 md:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#0054D2]/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="relative z-10">
              <p className="text-[#FF1F1F] text-xs font-bold uppercase tracking-widest mb-4">
                Ready to implement?
              </p>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4 leading-tight">
                {tool.cta_heading}
              </h2>
              <p className="text-gray-400 text-base md:text-lg mb-8 max-w-xl mx-auto leading-relaxed">
                {tool.cta_subtext}
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/contact">
                  <button className="inline-flex items-center gap-2 bg-[#FF1F1F] text-white font-bold px-8 py-4 rounded-full hover:bg-red-600 transition-all shadow-lg shadow-red-500/20 hover:scale-105">
                    {tool.cta_button} <ArrowRight size={16} />
                  </button>
                </Link>
                <Link href="/pricing">
                  <button className="inline-flex items-center gap-2 border border-white/20 text-white font-semibold px-8 py-4 rounded-full hover:bg-white/10 transition-all">
                    View Pricing
                  </button>
                </Link>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-xs text-gray-500">
                <Link href="/about" className="hover:text-gray-300 transition-colors">About Us</Link>
                <span>·</span>
                <Link href="/portfolio" className="hover:text-gray-300 transition-colors">Our Work</Link>
                <span>·</span>
                <Link href="/blog" className="hover:text-gray-300 transition-colors">Blog</Link>
                <span>·</span>
                <Link href="/tools" className="hover:text-gray-300 transition-colors">All Tools</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
