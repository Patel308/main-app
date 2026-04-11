// ✅ SERVER COMPONENT — SSG for all 20 industry pages
// Includes: BreadcrumbList JSON-LD + FAQPage JSON-LD + related blog posts cross-linking
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { INDUSTRIES, getIndustryBySlug } from '@/data/industries';
import { SERVICES } from '@/constants/constants';
import { BLOG_POSTS } from '@/data/blog-posts';
import IndustryClient from './IndustryClient';

export async function generateStaticParams() {
  return INDUSTRIES.map((i) => ({ niche: i.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ niche: string }> }
): Promise<Metadata> {
  const { niche } = await params;
  const industry = getIndustryBySlug(niche);
  if (!industry) return { title: 'Not Found' };

  const title = `${industry.headline} | Scallar IT Solution`;
  const description = industry.description;

  return {
    title,
    description,
    keywords: industry.keywords.join(', '),
    alternates: { canonical: `https://scallar.in/industries/${niche}` },
    openGraph: {
      title,
      description,
      type: 'website',
      url: `https://scallar.in/industries/${niche}`,
      siteName: 'Scallar IT Solution',
      images: [{ url: 'https://scallar.in/og-image.png', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      site: '@scallarit',
    },
  };
}

// ─── BreadcrumbList JSON-LD ──────────────────────────────────────────────────
function BreadcrumbJsonLd({
  industry,
}: {
  industry: ReturnType<typeof getIndustryBySlug>;
}) {
  if (!industry) return null;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://scallar.in' },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Industries',
        item: 'https://scallar.in/industries',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: industry.name,
        item: `https://scallar.in/industries/${industry.slug}`,
      },
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

// ─── FAQPage JSON-LD ─────────────────────────────────────────────────────────
function IndustryJsonLd({
  industry,
}: {
  industry: ReturnType<typeof getIndustryBySlug>;
}) {
  if (!industry) return null;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: industry.faqs.map((faq) => ({
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

// ─── Page ────────────────────────────────────────────────────────────────────
export default async function IndustryPage(
  { params }: { params: Promise<{ niche: string }> }
) {
  const { niche } = await params;
  const industry = getIndustryBySlug(niche);
  if (!industry) notFound();

  const industryServices = SERVICES.filter((s) => industry!.services.includes(s.id));
  const otherIndustries = INDUSTRIES.filter((i) => i.slug !== niche).slice(0, 6);

  // Cross-link: find blog posts related to this industry's services
  const relatedBlogPosts = BLOG_POSTS.filter((post) =>
    industry!.services.includes(post.relatedService)
  ).slice(0, 3);

  return (
    <>
      <BreadcrumbJsonLd industry={industry} />
      <IndustryJsonLd industry={industry} />
      <IndustryClient
        industry={industry!}
        industryServices={industryServices}
        otherIndustries={otherIndustries}
        relatedBlogPosts={relatedBlogPosts}
      />
    </>
  );
}
