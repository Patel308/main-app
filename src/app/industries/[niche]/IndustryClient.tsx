'use client';

import Link from 'next/link';
import { Check, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import Button from '@/components/Button';
import type { Industry } from '@/data/industries';
import type { Service } from '@/types/types';

interface Props {
  industry: Industry;
  industryServices: Service[];
  otherIndustries: Industry[];
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-start gap-4 py-5 text-left"
      >
        <span className="font-medium text-brand-dark text-base">{q}</span>
        {open ? <ChevronUp size={18} className="shrink-0 text-gray-400 mt-0.5" /> : <ChevronDown size={18} className="shrink-0 text-gray-400 mt-0.5" />}
      </button>
      {open && <p className="pb-5 text-gray-500 leading-relaxed">{a}</p>}
    </div>
  );
}

export default function IndustryClient({ industry, industryServices, otherIndustries }: Props) {
  return (
    <div className="w-full min-h-screen bg-brand-bg">

      {/* ── Breadcrumb ─────────────────────────────────────────────────── */}
      <div className="pt-24 md:pt-28 px-4 md:px-6">
        <div className="max-w-[1400px] mx-auto">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-brand-dark transition-colors">Home</Link>
            <span>/</span>
            <Link href="/industries" className="hover:text-brand-dark transition-colors">Industries</Link>
            <span>/</span>
            <span className="text-brand-dark font-medium">{industry.name}</span>
          </nav>
        </div>
      </div>

      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section className="pb-16 md:pb-20 px-4 md:px-6">
        <div className="max-w-[1400px] mx-auto text-center">
          <span className="inline-block py-1 px-4 rounded-full bg-brand-lime/20 text-brand-dark text-xs font-bold tracking-wide uppercase mb-4">
            {industry.name}
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-brand-dark mb-6 leading-tight max-w-4xl mx-auto">
            {industry.headline}
          </h1>
          <p className="text-gray-500 text-lg md:text-xl max-w-3xl mx-auto mb-8 leading-relaxed">
            {industry.description}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact">
              <Button className="rounded-full px-8 py-4">Get a Free Audit</Button>
            </Link>
            <Link href="/services">
              <Button variant="outline" className="rounded-full px-8 py-4">View All Services</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Pain Points ────────────────────────────────────────────────── */}
      <section className="py-16 md:py-20 px-4 md:px-6 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-dark mb-4">
                Challenges We Solve for {industry.name} Businesses
              </h2>
              <p className="text-gray-500 text-lg mb-8">
                We&apos;ve worked with dozens of {industry.name.toLowerCase()} businesses.
                These are the most common problems they bring to us:
              </p>
              <div className="space-y-4">
                {industry.painPoints.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-4 bg-brand-bg rounded-2xl">
                    <div className="w-7 h-7 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                      <span style={{ fontSize: 14 }}>✗</span>
                    </div>
                    <p className="text-gray-700">{point}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-dark mb-4">
                How We Fix Them
              </h2>
              <p className="text-gray-500 text-lg mb-8">
                Our team builds tailored digital strategies for {industry.name.toLowerCase()} businesses
                — from SEO to AI automation — focused purely on revenue outcomes.
              </p>
              <div className="space-y-4">
                {[
                  'Custom strategy built for your industry',
                  'Dedicated account manager who knows your sector',
                  'Weekly reporting on metrics that matter',
                  'No long-term lock-in contracts',
                  '30-day results guarantee on paid campaigns',
                ].map((fix, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-brand-lime/20 flex items-center justify-center shrink-0 mt-0.5">
                      <Check size={13} className="text-brand-dark" />
                    </div>
                    <p className="text-gray-600">{fix}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Relevant Services (internal linking) ───────────────────────── */}
      <section className="py-16 md:py-20 px-4 md:px-6">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-brand-dark mb-2 text-center">
            Services We Use for {industry.name} Businesses
          </h2>
          <p className="text-gray-500 text-center mb-10">
            Every engagement is custom. These are the services most commonly used for {industry.name.toLowerCase()} clients.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industryServices.map((service) => (
              <Link
                key={service.id}
                href={`/services/${service.id}`}
                className="group bg-white rounded-[2.5rem] p-6 hover:shadow-2xl transition-all hover:-translate-y-2"
              >
                <div className="h-48 rounded-[2rem] overflow-hidden mb-5">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <h3 className="text-xl font-bold text-brand-dark mb-2 group-hover:text-brand-lime transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-500 text-sm mb-4 line-clamp-2">{service.description}</p>
                <span className="inline-flex items-center gap-1 text-sm font-bold text-brand-dark">
                  Learn more <ArrowRight size={14} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-20 px-4 md:px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-brand-dark mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="bg-brand-bg rounded-[2.5rem] p-6 md:p-10">
            {industry.faqs.map((faq, idx) => (
              <FaqItem key={idx} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Other Industries (internal linking) ────────────────────────── */}
      <section className="py-16 px-4 md:px-6">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="text-2xl font-display font-bold text-brand-dark mb-8">
            Other Industries We Serve
          </h2>
          <div className="flex flex-wrap gap-3">
            {otherIndustries.map((ind) => (
              <Link
                key={ind.slug}
                href={`/industries/${ind.slug}`}
                className="px-5 py-2 rounded-full bg-white border border-gray-200 text-sm font-medium text-gray-600 hover:bg-brand-dark hover:text-white hover:border-brand-dark transition-all"
              >
                {ind.name}
              </Link>
            ))}
            <Link
              href="/industries"
              className="px-5 py-2 rounded-full bg-brand-lime text-brand-dark text-sm font-bold hover:bg-brand-dark hover:text-white transition-all"
            >
              View All Industries
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 px-4 md:px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="bg-brand-dark rounded-[3rem] p-8 md:p-16 text-white text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Ready to Grow Your {industry.name} Business?
            </h2>
            <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
              Get a free audit and tailored strategy session with our {industry.name.toLowerCase()} specialists.
            </p>
            <Link href="/contact">
              <Button className="rounded-full px-10 py-4 text-lg">Book Free Strategy Call</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
