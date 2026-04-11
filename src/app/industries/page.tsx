// ✅ SERVER COMPONENT — industries listing with images added per card
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { INDUSTRIES } from '@/data/industries';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Industries We Serve | Digital Marketing for Every Sector | Scallar IT Solution',
  description: 'Scallar IT Solution delivers tailored digital marketing, SEO, and AI automation for 20+ industries — from healthcare and real estate to restaurants and startups.',
  keywords: 'industry digital marketing, sector seo, niche marketing agency, vertical digital marketing india',
  alternates: { canonical: 'https://scallar.in/industries' },
  openGraph: {
    title: 'Industries We Serve | Scallar IT Solution',
    description: 'Tailored digital marketing for 20+ industries. We know your sector.',
    type: 'website',
    siteName: 'Scallar IT Solution',
    images: [{ url: 'https://scallar.in/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@scallarit',
    title: 'Industries We Serve | Scallar IT Solution',
  },
};

// ── Curated Unsplash images per industry (clean, professional, relevant) ──────
const INDUSTRY_IMAGES: Record<string, string> = {
  restaurants:   'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80',
  healthcare:    'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
  'real-estate': 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80',
  ecommerce:     'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=800&q=80',
  education:     'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
  finance:       'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80',
  hotels:        'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
  startups:      'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=800&q=80',
  retail:        'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80',
  'law-firms':   'https://images.unsplash.com/photo-1589391886645-d51941baf7fb?auto=format&fit=crop&w=800&q=80',
  fitness:       'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
  automotive:    'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80',
  beauty:        'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
  construction:  'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
  technology:    'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
  logistics:     'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
  media:         'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=800&q=80',
  consulting:    'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80',
  'non-profit':  'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&w=800&q=80',
  manufacturing: 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?auto=format&fit=crop&w=800&q=80',
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
          {INDUSTRIES.map((industry) => {
            const imgSrc = INDUSTRY_IMAGES[industry.slug] ?? 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80';
            return (
              <Link
                key={industry.slug}
                href={`/industries/${industry.slug}`}
                className="group bg-white rounded-[2.5rem] overflow-hidden hover:shadow-2xl transition-all hover:-translate-y-2"
              >
                {/* Industry image */}
                <div className="h-48 relative overflow-hidden">
                  <Image
                    src={imgSrc}
                    alt={`Digital marketing for ${industry.name}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  {/* Dark overlay + industry name pill */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-brand-lime text-brand-dark text-xs font-bold px-3 py-1 rounded-full">
                      {industry.name}
                    </span>
                  </div>
                </div>

                {/* Card body */}
                <div className="p-6">
                  <h2 className="text-lg font-bold text-brand-dark mb-2 group-hover:text-brand-lime transition-colors leading-snug">
                    {industry.headline}
                  </h2>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">
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
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
