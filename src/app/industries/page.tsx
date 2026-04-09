// ✅ SERVER COMPONENT
import type { Metadata } from 'next';
import Link from 'next/link';
import { INDUSTRIES } from '@/data/industries';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Industries We Serve | Digital Marketing for Every Sector | Scallar IT Solution',
  description: 'Scallar IT Solution delivers tailored digital marketing, SEO, and AI automation for 20+ industries — from healthcare and real estate to restaurants and startups.',
  keywords: 'industry digital marketing, sector seo, niche marketing agency, vertical digital marketing india',
  alternates: { canonical: 'https://scallar.in/industries' },
};

export default function IndustriesPage() {
  return (
    <div className="w-full min-h-screen bg-brand-bg pt-24 md:pt-32 pb-20">
      <section className="px-4 md:px-6 mb-16">
        <div className="max-w-[1400px] mx-auto text-center">
          <span className="inline-block py-1 px-4 rounded-full bg-brand-lime/20 text-brand-dark text-xs font-bold tracking-wide uppercase mb-4">
            Industries
          </span>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-brand-dark mb-6">
            Digital Marketing for Every Industry
          </h1>
          <p className="text-gray-500 text-lg md:text-xl max-w-3xl mx-auto">
            We don&apos;t do generic. Every industry has unique challenges, buyer behaviour, and
            competitive dynamics. Our strategies are built for yours.
          </p>
        </div>
      </section>

      <section className="px-4 md:px-6">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {INDUSTRIES.map((industry) => (
            <Link
              key={industry.slug}
              href={`/industries/${industry.slug}`}
              className="group bg-white rounded-[2.5rem] p-8 hover:shadow-2xl transition-all hover:-translate-y-2"
            >
              <h2 className="text-xl font-bold text-brand-dark mb-3 group-hover:text-brand-lime transition-colors">
                {industry.name}
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-3">
                {industry.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-5">
                {industry.services.slice(0, 3).map((svc) => (
                  <span key={svc} className="text-xs font-medium px-3 py-1 rounded-full bg-brand-bg text-gray-600">
                    {svc.replace(/-/g, ' ')}
                  </span>
                ))}
              </div>
              <span className="inline-flex items-center gap-1 text-sm font-bold text-brand-dark group-hover:gap-3 transition-all">
                Explore <ArrowRight size={14} />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
