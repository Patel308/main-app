// ✅ SERVER COMPONENT — SSG enabled
import type { Metadata } from 'next';
import ServicesClient from './ServicesClient';

export const metadata: Metadata = {
  title: 'Our Services | Digital Marketing, Web Dev & AI Automation | Scallar IT Solution',
  description:
    'Explore 24+ services offered by Scallar IT Solution — SEO, Google Ads, WhatsApp Automation, Web Development, AI Voice Agents, and more. Serving businesses in Noida, Delhi NCR and across India.',
  keywords:
    'digital marketing services noida, seo services india, web development agency noida, whatsapp automation, ai voice agent, app development, ppc advertising, branding agency delhi ncr',
  openGraph: {
    title: 'Our Services | Scallar IT Solution',
    description:
      'Explore 24+ services — SEO, Ads, WhatsApp Automation, Web Dev, AI Agents & more.',
    type: 'website',
    siteName: 'Scallar IT Solution',
  },
  alternates: {
    canonical: 'https://scallar.in/services',
  },
};

export default function ServicesPage() {
  return <ServicesClient />;
}
