// ✅ SERVER COMPONENT — renders JSON-LD <script> tags for structured data
// Import this in layout.tsx and relevant pages.
// No 'use client' needed — this is pure static markup.

interface LocalBusinessJsonLdProps {
  /** Override defaults for specific pages if needed */
  url?: string;
}

export function LocalBusinessJsonLd({ url = 'https://scallar.in' }: LocalBusinessJsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://scallar.in/#organization',
    name: 'Scallar IT Solution',
    description:
      "Noida's premier Digital Marketing & AI Automation Agency. We scale businesses with SEO, Web Development, Google Ads, and Custom AI Automation.",
    url,
    logo: 'https://scallar.in/favicon.svg',
    image: 'https://scallar.in/og-image.png',
    telephone: '+91-8510806031',
    email: 'Info@scallar.in',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'C-4/105, Pocket C 3, New Kondli',
      addressLocality: 'Delhi',
      addressRegion: 'Delhi',
      postalCode: '110096',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 28.5355,
      longitude: 77.3910,
    },
    areaServed: [
      { '@type': 'City', name: 'Noida' },
      { '@type': 'City', name: 'Delhi' },
      { '@type': 'City', name: 'Gurugram' },
      { '@type': 'State', name: 'Delhi NCR' },
    ],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '09:00',
        closes: '19:00',
      },
    ],
    sameAs: [
      'https://www.linkedin.com/company/scallar-it-solution',
      'https://www.instagram.com/scallarit',
      'https://twitter.com/scallarit',
      'https://www.facebook.com/scallarit',
    ],
    priceRange: '₹₹',
    currenciesAccepted: 'INR',
    paymentAccepted: 'Cash, Credit Card, Bank Transfer, UPI',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Digital Marketing & AI Services',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'SEO Services' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Google Ads Management' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Web Development' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'AI Automation' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'WhatsApp Automation' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Branding & Design' } },
      ],
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '230',
      bestRating: '5',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

// ─── Service page JSON-LD ────────────────────────────────────────────────────
interface ServiceJsonLdProps {
  name: string;
  description: string;
  url: string;
  image?: string;
}

export function ServiceJsonLd({ name, description, url, image }: ServiceJsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: name,
    name,
    description,
    url,
    provider: {
      '@type': 'LocalBusiness',
      '@id': 'https://scallar.in/#organization',
      name: 'Scallar IT Solution',
    },
    areaServed: { '@type': 'State', name: 'Delhi NCR, India' },
    ...(image && { image }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

// ─── Pricing FAQ JSON-LD ─────────────────────────────────────────────────────
export function PricingFaqJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the starting price for digital marketing services at Scallar IT Solution?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Our Startup plan starts at ₹19,999/month and includes Social Media Management, Basic SEO Setup, and monthly performance reporting.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does Scallar IT Solution offer AI automation services?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Our Business plan and above includes a full AI Automation Suite including WhatsApp automation, AI chatbots, email automation, and custom CRM integration.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is there a custom plan for large enterprises?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Our Enterprise plan offers custom pricing and includes a dedicated development and marketing team, white-label services, and 24/7 priority support.',
        },
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
