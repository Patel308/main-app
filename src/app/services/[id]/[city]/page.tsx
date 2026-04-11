// ✅ SERVER COMPONENT — SSG 720 city pages with BreadcrumbList + related blog cross-links
// ISR: pages revalidate every 30 days — avoids 20-min build times at scale
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SERVICES } from '@/constants/constants';
import { CITIES, getCityBySlug } from '@/data/cities';
import { BLOG_POSTS } from '@/data/blog-posts';
import ServiceCityClient from './ServiceCityClient';

// ─── ISR: revalidate every 30 days instead of full SSG rebuild ───────────────
export const revalidate = 2592000; // 30 days in seconds

// ─── 1. Generate all 720 combinations at build time ──────────────────────────
export async function generateStaticParams() {
  const params: { id: string; city: string }[] = [];
  for (const service of SERVICES) {
    for (const city of CITIES) {
      params.push({ id: service.id, city: city.slug });
    }
  }
  return params;
}

// ─── 2. Unique metadata per service+city combo ───────────────────────────────
export async function generateMetadata(
  { params }: { params: Promise<{ id: string; city: string }> }
): Promise<Metadata> {
  const { id: serviceId, city: citySlug } = await params;
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
    ],
    alternates: {
      canonical: `https://scallar.in/services/${serviceId}/${citySlug}`,
      languages: (() => {
        const langs: Record<string, string> = { 'x-default': `https://scallar.in/services/${serviceId}/${citySlug}` };
        if (city.country === 'United Kingdom') langs['en-GB'] = `https://scallar.in/services/${serviceId}/${citySlug}`;
        if (city.country === 'United States')  langs['en-US'] = `https://scallar.in/services/${serviceId}/${citySlug}`;
        if (city.country === 'Australia')       langs['en-AU'] = `https://scallar.in/services/${serviceId}/${citySlug}`;
        if (city.country === 'Canada')          langs['en-CA'] = `https://scallar.in/services/${serviceId}/${citySlug}`;
        if (city.country === 'India')           langs['en-IN'] = `https://scallar.in/services/${serviceId}/${citySlug}`;
        return langs;
      })(),
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
      site: '@scallarit',
    },
  };
}

// ─── 3. BreadcrumbList JSON-LD ───────────────────────────────────────────────
function BreadcrumbJsonLd({
  service,
  city,
  serviceId,
  citySlug,
}: {
  service: { title: string };
  city: { name: string };
  serviceId: string;
  citySlug: string;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://scallar.in' },
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
        item: `https://scallar.in/services/${serviceId}`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: city.name,
        item: `https://scallar.in/services/${serviceId}/${citySlug}`,
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

// ─── 4. Service JSON-LD ──────────────────────────────────────────────────────
function ServiceCityJsonLd({
  service,
  city,
  serviceId,
  citySlug,
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

// ─── 5. Page ─────────────────────────────────────────────────────────────────
export default async function ServiceCityPage(
  { params }: { params: Promise<{ id: string; city: string }> }
) {
  const { id: serviceId, city: citySlug } = await params;
  const service = SERVICES.find((s) => s.id === serviceId);
  const city = getCityBySlug(citySlug);
  if (!service || !city) notFound();

  const relatedServices = SERVICES.filter((s) => s.id !== service!.id).slice(0, 4);

  // Cross-link: 3 blog posts related to this service
  const relatedBlogPosts = BLOG_POSTS.filter(
    (p) => p.relatedService === serviceId
  ).slice(0, 3);

  // Fallback: if no exact match, get posts from same category
  const blogPosts =
    relatedBlogPosts.length > 0
      ? relatedBlogPosts
      : BLOG_POSTS.slice(0, 3);

  return (
    <>
      <BreadcrumbJsonLd
        service={service!}
        city={city!}
        serviceId={serviceId}
        citySlug={citySlug}
      />
      <ServiceCityJsonLd
        service={service!}
        city={city!}
        serviceId={serviceId}
        citySlug={citySlug}
      />
      <ServiceCityClient
        service={service!}
        city={city!}
        relatedServices={relatedServices}
        citySlug={citySlug}
        serviceId={serviceId}
        relatedBlogPosts={blogPosts}
      />
    </>
  );
}