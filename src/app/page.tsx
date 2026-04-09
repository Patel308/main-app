// ✅ SERVER COMPONENT — 'use client' removed
// Google can crawl all hero text, service cards, and testimonials from this page.
// All interactivity (carousels, resize listeners) lives in HomeClient.tsx below.

import type { Metadata } from 'next';
import HomeClient from './HomeClient';

export const metadata: Metadata = {
  title: 'Digital Marketing & AI Automation Agency | Scallar IT Solution',
  description:
    "Scallar IT Solution is Noida's premier Digital Marketing & AI Agency. We scale businesses with SEO, Web Development, Google Ads, and Custom AI Automation. Get a free audit today.",
  keywords:
    'digital marketing agency noida, ai automation services india, seo company delhi ncr, web development agency, whatsapp automation business, growth marketing expert, lead generation services',
  alternates: {
    canonical: 'https://scallar.in',
  },
  openGraph: {
    title: 'Scallar IT Solution | AI-Driven Digital Marketing Agency',
    description:
      'Transform your online presence with data-driven SEO, PPC, and AI automation strategies. Book your free consultation today.',
    type: 'website',
    url: 'https://scallar.in',
    siteName: 'Scallar IT Solution',
    images: [
      {
        url: 'https://scallar.in/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Scallar IT Solution — AI-Driven Digital Marketing Agency',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Scallar IT Solution | AI-Driven Digital Marketing Agency',
    description:
      'Transform your online presence with data-driven SEO, PPC, and AI automation. Book a free consultation today.',
  },
};

export default function HomePage() {
  return <HomeClient />;
}
