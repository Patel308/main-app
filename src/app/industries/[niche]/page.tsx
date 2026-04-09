// ✅ SERVER COMPONENT — SSG for all 20 industry pages
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { INDUSTRIES, getIndustryBySlug } from '@/data/industries';
import { SERVICES } from '@/constants/constants';
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
    },
    twitter: { card: 'summary_large_image', title, description },
  };
}

function IndustryJsonLd({ industry }: { industry: ReturnType<typeof getIndustryBySlug> }) {
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

export default async function IndustryPage(
  { params }: { params: Promise<{ niche: string }> }
) {
  const { niche } = await params;
  const industry = getIndustryBySlug(niche);
  if (!industry) notFound();

  const industryServices = SERVICES.filter((s) => industry.services.includes(s.id));
  const otherIndustries = INDUSTRIES.filter((i) => i.slug !== niche).slice(0, 6);

  return (
    <>
      <IndustryJsonLd industry={industry} />
      <IndustryClient
        industry={industry}
        industryServices={industryServices}
        otherIndustries={otherIndustries}
      />
    </>
  );
}
