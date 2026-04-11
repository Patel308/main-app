import type { Metadata } from 'next';
import ServicesClient from './ServicesClient';

export const metadata: Metadata = {
  title: 'Our Services | Digital Marketing, AI Automation & Web Development | Scallar IT Solution',
  description:
    'Scallar IT Solution offers SEO, Google Ads, Web Development, WhatsApp Automation, AI Voice Agents, App Development, Branding, and E-commerce solutions for businesses across Noida, Delhi NCR, and India. Get a free audit today.',
  keywords:
    'digital marketing services noida, seo agency delhi ncr, web development india, whatsapp automation services, ai voice agent india, app development noida, ecommerce development india, scallar it solution services',
  openGraph: {
    title: 'Our Services | Scallar IT Solution',
    description:
      'From SEO to AI Automation — complete digital growth services for businesses across India and worldwide. Get a free consultation.',
    type: 'website',
    url: 'https://scallar.in/services',
    siteName: 'Scallar IT Solution',
    images: [{ url: 'https://scallar.in/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Services | Scallar IT Solution',
    description: 'SEO, Web Dev, AI Automation & more. Free consultation available.',
    site: '@scallarit',
  },
  alternates: { canonical: 'https://scallar.in/services' },
};

export default function ServicesPage() {
  return <ServicesClient />;
}
