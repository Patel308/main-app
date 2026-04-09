// ✅ Dynamic sitemap — auto-covers all 700+ pages
// Includes: static pages + 24 service pages + 720 city pages + 20 industry pages + 20 blog posts
import type { MetadataRoute } from 'next';
import { SERVICES } from '@/constants/constants';
import { CITIES } from '@/data/cities';
import { INDUSTRIES } from '@/data/industries';
import { BLOG_POSTS } from '@/data/blog-posts';

const BASE = 'https://scallar.in';
const now = new Date();

export default function sitemap(): MetadataRoute.Sitemap {

  // ── Static pages ──────────────────────────────────────────────────────────
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE,                    lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE}/services`,      lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE}/industries`,    lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE}/blog`,          lastModified: now, changeFrequency: 'daily',   priority: 0.9 },
    { url: `${BASE}/pricing`,       lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/portfolio`,     lastModified: now, changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE}/team`,          lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/resources`,     lastModified: now, changeFrequency: 'weekly',  priority: 0.7 },
    { url: `${BASE}/contact`,       lastModified: now, changeFrequency: 'yearly',  priority: 0.6 },
    { url: `${BASE}/privacy`,       lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${BASE}/terms`,         lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
  ];

  // ── Service detail pages (24) ─────────────────────────────────────────────
  const servicePages: MetadataRoute.Sitemap = SERVICES.map((s) => ({
    url: `${BASE}/services/${s.id}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // ── Service × City pages (24 × 30 = 720) ─────────────────────────────────
  const cityPages: MetadataRoute.Sitemap = SERVICES.flatMap((s) =>
    CITIES.map((c) => ({
      url: `${BASE}/services/${s.id}/${c.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
  );

  // ── Industry pages (20) ───────────────────────────────────────────────────
  const industryPages: MetadataRoute.Sitemap = INDUSTRIES.map((i) => ({
    url: `${BASE}/industries/${i.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }));

  // ── Blog posts ────────────────────────────────────────────────────────────
  const blogPages: MetadataRoute.Sitemap = BLOG_POSTS.map((p) => ({
    url: `${BASE}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...servicePages, ...cityPages, ...industryPages, ...blogPages];
}
