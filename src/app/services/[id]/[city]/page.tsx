// ✅ SERVER COMPONENT — ISR city pages with complete hreflang for all 15 countries
// ISR: revalidates every 30 days — avoids OOM on GCloud/Cloud Run at scale
// hreflang: full coverage for UK, US, AU, CA, IN, UAE, SG, DE, NL, IE, HK, MY, NZ, ZA
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SERVICES } from '@/constants/constants';
import { CITIES, getCityBySlug } from '@/data/cities';
import { BLOG_POSTS } from '@/data/blog-posts';
import ServiceCityClient from './ServiceCityClient';

// ─── ISR: revalidate every 30 days ───────────────────────────────────────────
// On GCloud Cloud Run / any Docker host this works identically to Vercel ISR
// because Next.js standalone output handles the revalidation cache internally.
// First request after 30d regenerates the page server-side, then caches it again.
export const revalidate = 2592000; // 30 days in seconds

// ─── Complete country → BCP-47 language tag map ──────────────────────────────
// All 15 countries covered in your cities.ts file.
// Add new entries here whenever you add a new country to cities.ts.
const COUNTRY_LANG: Record<string, string> = {
  'United Kingdom': 'en-GB',
  'United States':  'en-US',
  'Australia':      'en-AU',
  'Canada':         'en-CA',
  'India':          'en-IN',
  // ── Previously missing — now fixed ──────────────────────────────────────
  'UAE':            'en-AE',
  'Singapore':      'en-SG',
  'Germany':        'de-DE',
  'Netherlands':    'nl-NL',
  'Ireland':        'en-IE',
  'Hong Kong':      'en-HK',
  'Malaysia':       'en-MY',
  'New Zealand':    'en-NZ',
  'South Africa':   'en-ZA',
};

// ─── 1. Generate all city×service combos at build time ───────────────────────
// With ISR enabled above, only the TOP_BUILD_CITIES are pre-rendered at build.
// All other combos are generated on first request, then cached for 30 days.
// This prevents OOM on GCloud Cloud Run (which has a 32GB memory ceiling per instance).
const TOP_BUILD_CITIES = [
  'london', 'new-york', 'dubai', 'singapore', 'mumbai',
  'sydney', 'toronto', 'noida', 'delhi', 'bangalore',
];

export async function generateStaticParams() {
  // Pre-render only the top 10 cities × all services at build time (~240 pages).
  // All other city pages are ISR — generated on first request.
  return SERVICES.flatMap((service) =>
    TOP_BUILD_CITIES.map((city) => ({ id: service.id, city }))
  );
}

// ─── 2. Unique metadata + full hreflang per service+city combo ───────────────
export async function generateMetadata(
  { params }: { params: Promise<{ id: string; city: string }> }
): Promise<Metadata> {
  const { id: serviceId, city: citySlug } = await params;
  const service = SERVICES.find((s) => s.id === serviceId);
  const city = getCityBySlug(citySlug);
  if (!service || !city) return { title: 'Page Not Found' };

  const title = `${service.title} in ${city.name} | Scallar IT Solution`;
  const description = `Looking for ${service.title.toLowerCase()} in ${city.name}? Scallar IT Solution delivers expert ${service.title.toLowerCase()} for businesses in ${city.name}, ${city.country}. Get a free consultation today.`;
  const pageUrl = `https://scallar.in/services/${serviceId}/${citySlug}`;

  // Build hreflang — x-default always present, lang tag added if country is mapped
  const langCode = COUNTRY_LANG[city.country];
  const languages: Record<string, string> = {
    'x-default': pageUrl,
    ...(langCode ? { [langCode]: pageUrl } : {}),
  };

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
      canonical: pageUrl,
      languages,
    },
    openGraph: {
      title,
      description,
      type: 'website',
      url: pageUrl,
      siteName: 'Scallar IT Solution',
      // Dynamic OG image from opengraph-image.tsx in /services/[id]/ folder
      // Next.js auto-wires this — no manual images[] needed here
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
      { '@type': 'ListItem', position: 1, name: 'Home',     item: 'https://scallar.in' },
      { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://scallar.in/services' },
      { '@type': 'ListItem', position: 3, name: service.title, item: `https://scallar.in/services/${serviceId}` },
      { '@type': 'ListItem', position: 4, name: city.name,  item: `https://scallar.in/services/${serviceId}/${citySlug}` },
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

  const relatedBlogPosts = BLOG_POSTS.filter(
    (p) => p.relatedService === serviceId
  ).slice(0, 3);

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
