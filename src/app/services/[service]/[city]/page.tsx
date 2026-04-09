// ✅ SERVER COMPONENT — SSG
// Generates 24 services × 30 cities = 720 static pages at build time.
// Each page targets "SEO agency in London", "Web Development Dubai" etc.

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SERVICES } from '@/constants/constants';
import { CITIES, getCityBySlug } from '@/data/cities';
import ServiceCityClient from './ServiceCityClient';

// ─── 1. Generate all 720 combinations at build time ──────────────────────────
export async function generateStaticParams() {
  const params: { service: string; city: string }[] = [];
  for (const service of SERVICES) {
    for (const city of CITIES) {
      params.push({ service: service.id, city: city.slug });
    }
  }
  return params;
}

// ─── 2. Unique metadata per service+city combo ───────────────────────────────
export async function generateMetadata(
  { params }: { params: Promise<{ service: string; city: string }> }
): Promise<Metadata> {
  const { service: serviceId, city: citySlug } = await params;
  const service = SERVICES.find((s) => s.id === serviceId);
  const city = getCityBySlug(citySlug);

  if (!service || !city) return { title: 'Page Not Found' };

  const title = `${service.title} in ${city.name} | Scallar IT Solution`;
  const description = `Looking for ${service.title.toLowerCase()} in ${city.name}? Scallar IT Solution delivers expert ${service.title.toLowerCase()} for businesses in ${city.name}, ${city.country}. Get a free consultation today.`;

  return {
    title,
    description,
    keywords: [
      `${service.title.toLowerCase()} ${city.name.toLowerCase()}`,
      `${service.title.toLowerCase()} agency ${city.name.toLowerCase()}`,
      `best ${service.title.toLowerCase()} ${city.name.toLowerCase()}`,
      `${service.title.toLowerCase()} company ${city.name.toLowerCase()}`,
      `${city.name.toLowerCase()} ${service.title.toLowerCase()} services`,
      'scallar it solution',
    ].join(', '),
    alternates: {
      canonical: `https://scallar.in/services/${serviceId}/${citySlug}`,
    },
    openGraph: {
      title,
      description,
      type: 'website',
      url: `https://scallar.in/services/${serviceId}/${citySlug}`,
      siteName: 'Scallar IT Solution',
      images: service.image ? [{ url: service.image, width: 800, height: 600 }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

// ─── 3. JSON-LD for this service+city page ────────────────────────────────────
function ServiceCityJsonLd({
  service, city, serviceId, citySlug,
}: {
  service: { title: string; description: string; image?: string };
  city: { name: string; country: string };
  serviceId: string;
  citySlug: string;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${service.title} in ${city.name}`,
    description: service.description,
    url: `https://scallar.in/services/${serviceId}/${citySlug}`,
    provider: {
      '@type': 'LocalBusiness',
      '@id': 'https://scallar.in/#organization',
      name: 'Scallar IT Solution',
      telephone: '+91-8510806031',
      email: 'Info@scallar.in',
    },
    areaServed: {
      '@type': 'City',
      name: city.name,
      containedInPlace: { '@type': 'Country', name: city.country },
    },
    ...(service.image && { image: service.image }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

// ─── 4. Page ─────────────────────────────────────────────────────────────────
export default async function ServiceCityPage(
  { params }: { params: Promise<{ service: string; city: string }> }
) {
  const { service: serviceId, city: citySlug } = await params;
  const service = SERVICES.find((s) => s.id === serviceId);
  const city = getCityBySlug(citySlug);

  if (!service || !city) notFound();

  // Related services for internal linking
  const relatedServices = SERVICES.filter((s) => s.id !== service.id).slice(0, 4);

  return (
    <>
      <ServiceCityJsonLd
        service={service}
        city={city}
        serviceId={serviceId}
        citySlug={citySlug}
      />
      <ServiceCityClient
        service={service}
        city={city}
        relatedServices={relatedServices}
        citySlug={citySlug}
        serviceId={serviceId}
      />
    </>
  );
}
