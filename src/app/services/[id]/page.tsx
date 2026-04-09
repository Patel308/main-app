// ✅ SERVER COMPONENT — No 'use client' here
// Google can crawl this page. Static HTML generated at build time.

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SERVICES } from '@/constants/constants';
import ServiceDetailClient from './ServiceDetailClient';

// ─── 1. Tell Next.js which [id] values to pre-render at build time ───────────
export async function generateStaticParams() {
  return SERVICES.map((service) => ({ id: service.id }));
}

// ─── 2. Dynamic per-page SEO metadata ────────────────────────────────────────
export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> }
): Promise<Metadata> {
  const { id } = await params;
  const service = SERVICES.find((s) => s.id === id);

  if (!service) {
    return {
      title: 'Service Not Found | Scallar IT Solution',
    };
  }

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
    openGraph: {
      title,
      description,
      type: 'website',
      siteName: 'Scallar IT Solution',
      images: service.image ? [{ url: service.image, width: 800, height: 600 }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: `https://scallar.in/services/${id}`,
    },
  };
}

// ─── 3. Page Component (Server) ───────────────────────────────────────────────
// Finds the service here on the server, passes it down as a plain prop.
// No useParams() needed — Next.js injects params directly.
export default async function ServiceDetailPage(
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const service = SERVICES.find((s) => s.id === id);

  if (!service) notFound();

  return <ServiceDetailClient service={service} />;
}
