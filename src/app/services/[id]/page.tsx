// ✅ SERVER COMPONENT — SSG + per-page metadata + BreadcrumbList JSON-LD
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SERVICES } from '@/constants/constants';
import ServiceDetailClient from './ServiceDetailClient';
import { ServiceJsonLd } from '@/components/JsonLd';

// ─── 1. Pre-render all service pages at build time ───────────────────────────
export async function generateStaticParams() {
  return SERVICES.map((service) => ({ id: service.id }));
}

// ─── 2. Per-page SEO metadata ────────────────────────────────────────────────
export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> }
): Promise<Metadata> {
  const { id } = await params;
  const service = SERVICES.find((s) => s.id === id);
  if (!service) return { title: 'Service Not Found' };

  const title = `${service.title} | Scallar IT Solution`;
  const description = `${service.description} Scallar IT Solution offers professional ${service.title.toLowerCase()} in Noida, Delhi NCR and across India. Get a free consultation today.`;

  return {
    title,
    description,
    keywords: [
      service.title.toLowerCase(),
      `${service.title.toLowerCase()} noida`,
      `${service.title.toLowerCase()} delhi ncr`,
      `${service.title.toLowerCase()} india`,
      'scallar it solution',
      ...service.features.map((f) => f.toLowerCase()),
    ].join(', '),
    alternates: { canonical: `https://scallar.in/services/${id}` },
    openGraph: {
      title,
      description,
      type: 'website',
      url: `https://scallar.in/services/${id}`,
      siteName: 'Scallar IT Solution',
      images: service.image ? [{ url: service.image, width: 800, height: 600 }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      site: '@scallarit',
    },
  };
}

// ─── 3. BreadcrumbList JSON-LD ────────────────────────────────────────────────
function BreadcrumbJsonLd({ service }: { service: { title: string; id: string } }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://scallar.in',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Services',
        item: 'https://scallar.in/services',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: service.title,
        item: `https://scallar.in/services/${service.id}`,
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

// ─── 4. Page component ───────────────────────────────────────────────────────
export default async function ServiceDetailPage(
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const service = SERVICES.find((s) => s.id === id);
  if (!service) notFound();

  return (
    <>
      <BreadcrumbJsonLd service={service!} />
      <ServiceJsonLd
        name={service!.title}
        description={service!.description}
        url={`https://scallar.in/services/${id}`}
        image={service!.image}
      />
      <ServiceDetailClient service={service!} />
    </>
  );
}
