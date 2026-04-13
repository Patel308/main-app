// ✅ SERVER COMPONENT — SSG for all 50 tool pages
// Generates /tools/[slug] for every tool in src/data/tools.ts
// Includes: per-page metadata + FAQPage JSON-LD + BreadcrumbList JSON-LD + internal linking

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { TOOLS, getToolBySlug } from '@/data/tools';
import ToolPageClient from './ToolPageClient';

// ─── 1. Pre-render all 50 tool pages at build time ───────────────────────────
export async function generateStaticParams() {
  return TOOLS.map((t) => ({ slug: t.slug }));
}

// ─── 2. Per-tool SEO metadata ─────────────────────────────────────────────────
export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) return { title: 'Tool Not Found' };

  return {
    title: tool.meta_title,
    description: tool.meta_description,
    keywords: [tool.primary_keyword, ...tool.secondary_keywords].join(', '),
    alternates: { canonical: `https://scallar.in/tools/${slug}` },
    openGraph: {
      title: tool.meta_title,
      description: tool.meta_description,
      type: 'website',
      url: `https://scallar.in/tools/${slug}`,
      siteName: 'Scallar IT Solution',
      images: [{ url: 'https://scallar.in/og-image.png', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: tool.meta_title,
      description: tool.meta_description,
      site: '@scallarit',
    },
  };
}

// ─── 3. FAQPage JSON-LD ───────────────────────────────────────────────────────
function FaqJsonLd({ tool }: { tool: ReturnType<typeof getToolBySlug> }) {
  if (!tool || tool.faqs.length === 0) return null;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: tool.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

// ─── 4. BreadcrumbList JSON-LD ────────────────────────────────────────────────
function BreadcrumbJsonLd({ tool }: { tool: ReturnType<typeof getToolBySlug> }) {
  if (!tool) return null;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://scallar.in' },
      { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://scallar.in/tools' },
      { '@type': 'ListItem', position: 3, name: tool.title, item: `https://scallar.in/tools/${tool.slug}` },
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

// ─── 5. SoftwareApplication JSON-LD ──────────────────────────────────────────
function SoftwareJsonLd({ tool }: { tool: ReturnType<typeof getToolBySlug> }) {
  if (!tool) return null;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.title,
    description: tool.meta_description,
    url: `https://scallar.in/tools/${tool.slug}`,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
      description: 'Free consultation available',
    },
    provider: {
      '@type': 'Organization',
      name: 'Scallar IT Solution',
      url: 'https://scallar.in',
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

// ─── 6. Page ──────────────────────────────────────────────────────────────────
export default async function ToolPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) notFound();

  // Related tools in same category for interlinking
  const relatedTools = TOOLS.filter(
    (t) => t.category === tool!.category && t.slug !== slug
  ).slice(0, 3);

  return (
    <>
      <BreadcrumbJsonLd tool={tool} />
      <FaqJsonLd tool={tool} />
      <SoftwareJsonLd tool={tool} />
      <ToolPageClient tool={tool!} relatedTools={relatedTools} />
    </>
  );
}
