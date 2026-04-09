// ✅ SERVER COMPONENT — 'use client' removed from this file
// Metadata is now exported properly so Google sees title, description, og tags.
// All form interactivity lives in ContactClient.tsx below.

import type { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: 'Contact Us | Get a Free Digital Marketing Audit | Scallar IT Solution',
  description:
    'Get in touch with Scallar IT Solution — Noida\'s leading digital marketing & AI automation agency. Book a free consultation for SEO, Web Development, Google Ads, or AI services.',
  keywords:
    'contact scallar it solution, digital marketing agency contact noida, free seo audit, get a quote digital marketing india',
  alternates: {
    canonical: 'https://scallar.in/contact',
  },
  openGraph: {
    title: 'Contact Scallar IT Solution | Free Consultation',
    description:
      'Book a free consultation with our team. We\'ll audit your digital presence and show you exactly how to grow.',
    type: 'website',
    url: 'https://scallar.in/contact',
    siteName: 'Scallar IT Solution',
    images: [
      {
        url: 'https://scallar.in/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Contact Scallar IT Solution',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Scallar IT Solution | Free Consultation',
    description: 'Book a free consultation. Get a full digital audit of your business.',
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
