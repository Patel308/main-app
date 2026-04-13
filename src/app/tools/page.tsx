// ✅ PURE SERVER COMPONENT — Tools listing page
// Lists all 50 tools grouped by category with interlinking

import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { TOOLS, type ToolPage } from '@/data/tools';

export const metadata: Metadata = {
  title: 'Free Digital Marketing & AI Tools | Scallar IT Solution',
  description:
    'Explore 50 free tools for SEO, AI automation, PPC, data analytics, and social media. Built for growth-stage businesses and marketing teams serious about results.',
  keywords:
    'free marketing tools, seo tools, ai automation tools, ppc tools, data science tools, social media tools',
  alternates: { canonical: 'https://scallar.in/tools' },
  openGraph: {
    title: 'Free Digital Marketing & AI Tools | Scallar IT Solution',
    description: '50 professional tools for SEO, automation, analytics, and paid media.',
    type: 'website',
    url: 'https://scallar.in/tools',
    siteName: 'Scallar IT Solution',
    images: [{ url: 'https://scallar.in/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Digital Marketing & AI Tools | Scallar IT Solution',
    description: '50 professional tools for SEO, automation, analytics, and paid media.',
    site: '@scallarit',
  },
};

const CATEGORIES: ToolPage['category'][] = [
  'Marketing',
  'Automation',
  'IT & Dev',
  'Data & AI',
  'Ads & Social',
];

const CATEGORY_COLORS: Record<string, string> = {
  'Marketing':    'bg-blue-50 text-blue-700 border-blue-100',
  'Automation':   'bg-purple-50 text-purple-700 border-purple-100',
  'IT & Dev':     'bg-gray-100 text-gray-700 border-gray-200',
  'Data & AI':    'bg-green-50 text-green-700 border-green-100',
  'Ads & Social': 'bg-orange-50 text-orange-700 border-orange-100',
};

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  'Marketing':    'SEO, content, email, lead generation, and analytics tools.',
  'Automation':   'Workflow, CRM, email, and business process automation.',
  'IT & Dev':     'DevOps, cloud, API, performance, and database tools.',
  'Data & AI':    'Predictive analytics, ML deployment, NLP, and data quality.',
  'Ads & Social': 'PPC, Meta Ads, social media, influencer, and brand tools.',
};

export default function ToolsPage() {
  const grouped = CATEGORIES.reduce<Record<string, ToolPage[]>>((acc, cat) => {
    acc[cat] = TOOLS.filter((t) => t.category === cat);
    return acc;
  }, {});

  return (
    <div className="w-full min-h-screen bg-brand-bg">

      {/* ── Breadcrumb ─────────────────────────────────────────────────────── */}
      <div className="pt-24 md:pt-28 px-4 md:px-6">
        <div className="max-w-[1400px] mx-auto">
          <nav className="flex items-center gap-1.5 text-sm text-gray-400" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-brand-dark transition-colors">Home</Link>
            <ChevronRight size={14} />
            <span className="text-brand-dark font-medium">Tools</span>
          </nav>
        </div>
      </div>

      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section className="pb-16 pt-8 px-4 md:px-6">
        <div className="max-w-[1400px] mx-auto text-center">
          <span className="inline-block py-1 px-4 rounded-full bg-brand-lime/20 text-brand-dark text-xs font-bold tracking-wide uppercase mb-5">
            50 Professional Tools
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-brand-dark mb-6 leading-tight">
            Tools Built for <br className="hidden md:block" />
            <span className="text-[#0054D2]">High-Performance Teams</span>
          </h1>
          <p className="text-gray-500 text-lg md:text-xl max-w-3xl mx-auto mb-10 leading-relaxed">
            50 free tools across marketing, automation, IT, data science, and paid media —
            engineered to help you move faster, spend smarter, and grow consistently.
          </p>

          {/* Category quick-jump pills */}
          <div className="flex flex-wrap justify-center gap-3">
            {CATEGORIES.map((cat) => (
              <a
                key={cat}
                href={`#${cat.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
                className={`text-sm font-semibold px-5 py-2 rounded-full border hover:opacity-80 transition-opacity ${CATEGORY_COLORS[cat]}`}
              >
                {cat} ({grouped[cat]?.length ?? 0})
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tools by Category ──────────────────────────────────────────────── */}
      {CATEGORIES.map((category) => (
        <section
          key={category}
          id={category.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}
          className="py-12 md:py-16 px-4 md:px-6 border-t border-gray-100"
        >
          <div className="max-w-[1400px] mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
              <div>
                <span
                  className={`inline-block text-xs font-bold px-3 py-1 rounded-full border mb-3 ${CATEGORY_COLORS[category]}`}
                >
                  {grouped[category]?.length ?? 0} Tools
                </span>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-brand-dark">
                  {category}
                </h2>
                <p className="text-gray-500 text-sm mt-1">
                  {CATEGORY_DESCRIPTIONS[category]}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {(grouped[category] ?? []).map((tool) => (
                <Link
                  key={tool.slug}
                  href={`/tools/${tool.slug}`}
                  className="group bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all flex flex-col"
                >
                  <h3 className="font-bold text-gray-900 text-sm leading-snug mb-2 group-hover:text-[#0054D2] transition-colors">
                    {tool.title}
                  </h3>
                  <p className="text-gray-400 text-xs leading-relaxed line-clamp-2 mb-4 flex-grow">
                    {tool.primary_keyword}
                  </p>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-[#0054D2] group-hover:gap-2 transition-all mt-auto">
                    Open tool <ArrowRight size={11} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* ── Services interlinking ───────────────────────────────────────────── */}
      <section className="py-16 md:py-20 px-4 md:px-6 bg-[#0B1120]">
        <div className="max-w-[1400px] mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-4">
            Need Experts to Implement These Strategies?
          </h2>
          <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
            These tools show you what&apos;s possible. Our services make it happen — at scale, with expert execution.
          </p>
          <div className="flex flex-wrap gap-3 justify-center mb-10">
            {[
              { label: 'SEO Services', href: '/services/seo' },
              { label: 'AI Automation', href: '/services/whatsapp-automation' },
              { label: 'PPC Advertising', href: '/services/ppc-advertising' },
              { label: 'Web Development', href: '/services/web-dev' },
              { label: 'Data Analytics', href: '/services/data-analytics' },
              { label: 'All Services', href: '/services' },
            ].map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="text-sm bg-white/5 border border-white/10 text-gray-300 font-medium px-5 py-2 rounded-full hover:bg-white/15 hover:text-white transition-all"
              >
                {label}
              </Link>
            ))}
          </div>
          <Link href="/contact">
            <button className="inline-flex items-center gap-2 bg-[#FF1F1F] text-white font-bold px-8 py-4 rounded-full hover:bg-red-600 transition-all shadow-lg shadow-red-500/20 hover:scale-105">
              Get a Free Consultation <ArrowRight size={16} />
            </button>
          </Link>
        </div>
      </section>

    </div>
  );
}
