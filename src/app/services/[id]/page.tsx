// ✅ SERVER COMPONENT — SSG + per-page metadata + JSON-LD
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SERVICES } from '@/constants/constants';
import ServiceDetailClient from './ServiceDetailClient';
import { ServiceJsonLd } from '@/components/JsonLd';

export async function generateStaticParams() {
  return SERVICES.map((service) => ({ id: service.id }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> }
): Promise<Metadata> {
  const { id } = await params;
  const service = SERVICES.find((s) => s.id === id);

  if (!service) return { title: 'Service Not Found' };

  const title = `${service.title} | Scallar IT Solution`;
  const description = `${service.description} Scallar IT Solution offers professional ${service.title.toLowerCase()} in Noida, Delhi NCR and across India. Get a free consultation today.`;
  const keywords = [
    service.title.toLowerCase(),
    `${service.title.toLowerCase()} noida`,
    `${service.title.toLowerCase()} delhi ncr`,
    `${service.title.toLowerCase()} india`,
    'scallar it solution',
    ...service.features.map((f) => f.toLowerCase()),
  ].join(', ');

  return {
    title,
    description,
    keywords,
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
      images: service.image ? [service.image] : [],
    },
  };
}

export default async function ServiceDetailPage(
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const service = SERVICES.find((s) => s.id === id);

  if (!service) notFound();

  return (
    <>
      {/* Service-specific JSON-LD */}
      <ServiceJsonLd
        name={service.title}
        description={service.description}
        url={`https://scallar.in/services/${id}`}
        image={service.image}
      />
      <ServiceDetailClient service={service} />
    </>
  );
}
