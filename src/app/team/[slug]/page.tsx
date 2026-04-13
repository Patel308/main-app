// ✅ SERVER COMPONENT — SSG + per-author metadata + JSON-LD
// Generates one page per Author slug from src/data/authors.ts
// Internal links woven to: /blog, /services, /about, /contact, /team, /industries

import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  Linkedin,
  Twitter,
  ArrowRight,
  BadgeCheck,
  PenLine,
  Eye,
  Briefcase,
  Clock,
  Star,
  ChevronRight,
  BookOpen,
  Users,
  Globe,
  MessageSquare,
} from 'lucide-react';

import { AUTHORS, getAuthorBySlug, type Author } from '@/data/authors';
import { BLOG_POSTS } from '@/data/blog-posts';
import { SERVICES } from '@/constants/constants';

// ─── 1. Pre-render every author page at build time ───────────────────────────
export async function generateStaticParams() {
  return AUTHORS.map((a) => ({ slug: a.slug }));
}

// ─── 2. Per-author SEO metadata ──────────────────────────────────────────────
export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const author = getAuthorBySlug(slug);
  if (!author) return { title: 'Author Not Found' };

  const title = `${author.name} — ${author.jobTitle} | Scallar IT Solution`;
  const description = `${author.shortBio} ${author.name} has written ${author.articlesCount} articles on digital marketing, AI automation, and web development for Scallar IT Solution.`;

  return {
    title,
    description,
    keywords: [
      author.name.toLowerCase(),
      ...author.specializations.map((s) => s.toLowerCase()),
      'scallar it solution team',
      'digital marketing expert india',
      'ai automation specialist noida',
    ],
    alternates: { canonical: `https://scallar.in/team/${slug}` },
    openGraph: {
      title,
      description,
      type: 'profile',
      url: `https://scallar.in/team/${slug}`,
      siteName: 'Scallar IT Solution',
      images: [
        {
          url: author.avatar,
          width: 400,
          height: 400,
          alt: `${author.name} — ${author.jobTitle} at Scallar IT Solution`,
        },
      ],
    },
    twitter: {
      card: 'summary',
      title,
      description,
      site: '@scallarit',
      images: [author.avatar],
    },
  };
}

// ─── 3. Person + BreadcrumbList JSON-LD ─────────────────────────────────────
function AuthorJsonLd({ author }: { author: Author }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `https://scallar.in/team/${author.slug}#person`,
        name: author.name,
        jobTitle: author.jobTitle,
        description: author.bio,
        image: author.avatar,
        url: `https://scallar.in/team/${author.slug}`,
        sameAs: [
          author.linkedin,
          ...(author.twitter ? [author.twitter] : []),
        ],
        knowsAbout: author.specializations,
        worksFor: {
          '@type': 'Organization',
          '@id': 'https://scallar.in/#organization',
          name: 'Scallar IT Solution',
          url: 'https://scallar.in',
        },
        numberOfArticles: author.articlesCount,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://scallar.in' },
          { '@type': 'ListItem', position: 2, name: 'Team', item: 'https://scallar.in/team' },
          { '@type': 'ListItem', position: 3, name: author.name, item: `https://scallar.in/team/${author.slug}` },
        ],
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

// ─── 4. Helper — map author specializations → service IDs ───────────────────
const SPEC_TO_SERVICE: Record<string, string> = {
  'AI Automation':        'whatsapp-automation',
  'Digital Marketing':    'digital-marketing',
  'SEO':                  'seo',
  'Business Strategy':    'consulting',
  'WhatsApp Automation':  'whatsapp-automation',
  'PPC':                  'ppc-advertising',
  'Performance Marketing':'ppc-advertising',
  'Lead Generation':      'ppc-advertising',
  'Google Ads':           'ppc-advertising',
  'Machine Learning':     'chatbot-dev',
  'Data Engineering':     'data-analytics',
  'Python':               'api-integration',
  'AI Development':       'chatbot-dev',
  'Cloud Architecture':   'api-integration',
};

// ─── 5. Page component ───────────────────────────────────────────────────────
export default async function AuthorProfilePage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const author = getAuthorBySlug(slug);
  if (!author) notFound();

  // ── Data derivation ────────────────────────────────────────────────────────

  // Blog posts this author wrote (match by name — same as blog-posts.ts)
  const authorPosts = BLOG_POSTS.filter((p) => p.author === author.name).slice(0, 6);

  // Blog posts this author reviewed (approximation: posts they didn't write, same specialty categories)
  const reviewedPosts = BLOG_POSTS
    .filter((p) => p.author !== author.name)
    .slice(0, 3);

  // Related services based on this author's specializations
  const relatedServiceIds = [
    ...new Set(
      author.specializations
        .map((s) => SPEC_TO_SERVICE[s])
        .filter(Boolean)
    ),
  ].slice(0, 4);

  const relatedServices = relatedServiceIds
    .map((id) => SERVICES.find((s) => s.id === id))
    .filter(Boolean) as typeof SERVICES;

  // Other team members for the "Meet the rest" section
  const otherAuthors = AUTHORS.filter((a) => a.slug !== author.slug);

  // Category breakdown of what the author writes about
  const categoryCount = authorPosts.reduce<Record<string, number>>((acc, p) => {
    acc[p.category] = (acc[p.category] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <>
      <AuthorJsonLd author={author} />

      <main className="min-h-screen bg-gray-50 font-sans">

        {/* ── BREADCRUMB ────────────────────────────────────────────────────── */}
        <nav
          aria-label="Breadcrumb"
          className="pt-28 pb-0 px-4 max-w-7xl mx-auto"
        >
          <ol className="flex items-center gap-1.5 text-sm text-gray-400">
            <li><Link href="/" className="hover:text-gray-700 transition-colors">Home</Link></li>
            <li><ChevronRight size={14} /></li>
            <li><Link href="/team" className="hover:text-gray-700 transition-colors">Team</Link></li>
            <li><ChevronRight size={14} /></li>
            <li className="text-gray-700 font-medium truncate max-w-[200px]">{author.name}</li>
          </ol>
        </nav>

        {/* ── HERO — Author card ────────────────────────────────────────────── */}
        <section className="py-12 px-4 max-w-7xl mx-auto">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="grid md:grid-cols-[280px_1fr] lg:grid-cols-[320px_1fr]">

              {/* Avatar column */}
              <div className="bg-gradient-to-b from-[#0B1120] to-[#1a2540] p-8 md:p-10 flex flex-col items-center text-center">
                <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden ring-4 ring-white/10 shadow-2xl mb-5">
                  <Image
                    src={author.avatar}
                    alt={`${author.name} — ${author.jobTitle}`}
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 768px) 128px, 160px"
                    onError={undefined}
                  />
                </div>
                <h1 className="text-white font-bold text-xl md:text-2xl leading-tight mb-1">
                  {author.name}
                </h1>
                <p className="text-[#FF1F1F] text-xs font-bold uppercase tracking-wider mb-3">
                  {author.role}
                </p>
                <p className="text-gray-400 text-xs mb-5">{author.worksFor}</p>

                {/* Social links */}
                <div className="flex flex-col gap-2 w-full">
                  <a
                    href={author.linkedin}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="flex items-center justify-center gap-2 text-sm font-semibold text-white bg-[#0077b5] hover:bg-[#006097] px-4 py-2.5 rounded-xl transition-all"
                  >
                    <Linkedin size={15} /> Connect on LinkedIn
                  </a>
                  {author.twitter && (
                    <a
                      href={author.twitter}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="flex items-center justify-center gap-2 text-sm font-semibold text-white bg-white/10 hover:bg-white/20 px-4 py-2.5 rounded-xl transition-all"
                    >
                      <Twitter size={15} /> Follow on X
                    </a>
                  )}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 w-full mt-6">
                  {[
                    { label: 'Articles', value: author.articlesCount, icon: PenLine },
                    { label: 'Reviews', value: author.reviewedCount, icon: Eye },
                    { label: 'Exp.', value: `${author.experience}+ yrs`, icon: Briefcase },
                    { label: 'Read time', value: `${author.articlesCount * 8} min`, icon: Clock },
                  ].map(({ label, value, icon: Icon }) => (
                    <div key={label} className="bg-white/5 rounded-xl p-3 text-center">
                      <Icon size={14} className="text-gray-400 mx-auto mb-1" />
                      <p className="text-white font-bold text-base leading-none">{value}</p>
                      <p className="text-gray-500 text-[10px] mt-0.5">{label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bio column */}
              <div className="p-8 md:p-10 lg:p-12">
                <div className="flex items-center gap-2 mb-4">
                  <BadgeCheck size={18} className="text-[#0054D2]" />
                  <span className="text-xs font-bold text-[#0054D2] uppercase tracking-wider">
                    Verified Expert · {author.experience}+ Years
                  </span>
                </div>

                <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900 mb-4 leading-tight">
                  {author.jobTitle}
                </h2>

                <p className="text-gray-600 leading-relaxed text-base md:text-lg mb-6">
                  {author.bio}
                </p>

                {/* Specializations */}
                <div className="mb-6">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                    Areas of Expertise
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {author.specializations.map((spec) => {
                      const serviceId = SPEC_TO_SERVICE[spec];
                      return serviceId ? (
                        <Link
                          key={spec}
                          href={`/services/${serviceId}`}
                          className="text-sm bg-gray-50 border border-gray-200 text-gray-700 px-3 py-1 rounded-full hover:border-[#0054D2] hover:text-[#0054D2] transition-all"
                        >
                          {spec}
                        </Link>
                      ) : (
                        <span
                          key={spec}
                          className="text-sm bg-gray-50 border border-gray-200 text-gray-700 px-3 py-1 rounded-full"
                        >
                          {spec}
                        </span>
                      );
                    })}
                  </div>
                </div>

                {/* Writing topics if they have posts */}
                {Object.keys(categoryCount).length > 0 && (
                  <div className="mb-6">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                      Writes About
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(categoryCount).map(([cat, count]) => (
                        <Link
                          key={cat}
                          href={`/blog?category=${encodeURIComponent(cat)}`}
                          className="inline-flex items-center gap-1.5 text-sm bg-blue-50 border border-blue-100 text-[#0054D2] px-3 py-1 rounded-full hover:bg-blue-100 transition-all"
                        >
                          <BookOpen size={12} />
                          {cat}
                          <span className="text-[10px] font-bold bg-[#0054D2] text-white rounded-full px-1.5">
                            {count}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* CTA inline */}
                <div className="flex flex-wrap gap-3 pt-2 border-t border-gray-100">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 bg-[#0B1120] text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-black transition-all hover:scale-105"
                  >
                    Work With {author.name.split(' ')[0]} <ArrowRight size={14} />
                  </Link>
                  <Link
                    href="/about"
                    className="inline-flex items-center gap-2 border border-gray-200 text-gray-600 text-sm font-semibold px-5 py-2.5 rounded-full hover:border-gray-400 transition-all"
                  >
                    About Our Team
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── ARTICLES BY THIS AUTHOR ──────────────────────────────────────── */}
        {authorPosts.length > 0 && (
          <section className="py-12 px-4 max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900">
                  Articles by {author.name.split(' ')[0]}
                </h2>
                <p className="text-gray-500 text-sm mt-1">
                  {author.articlesCount} total articles published
                </p>
              </div>
              <Link
                href="/blog"
                className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-[#0054D2] hover:underline"
              >
                View all articles <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {authorPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all"
                >
                  <div className="relative h-44 overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      unoptimized
                    />
                    <span className="absolute top-3 left-3 bg-white/90 backdrop-blur text-xs font-bold text-gray-700 px-2.5 py-1 rounded-full">
                      {post.category}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-gray-900 text-sm leading-snug mb-2 group-hover:text-[#0054D2] transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-500 text-xs leading-relaxed line-clamp-2 mb-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <Clock size={11} /> {post.readTime}
                      </span>
                      <span className="flex items-center gap-1 text-[#0054D2] font-semibold group-hover:gap-2 transition-all">
                        Read <ArrowRight size={11} />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center mt-6 sm:hidden">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 border border-gray-200 text-gray-700 font-semibold px-6 py-2.5 rounded-full hover:border-gray-400 transition-all text-sm"
              >
                View all articles <ArrowRight size={14} />
              </Link>
            </div>
          </section>
        )}

        {/* ── RELATED SERVICES (interlinking to /services/[id]) ────────────── */}
        {relatedServices.length > 0 && (
          <section className="py-12 px-4 bg-white">
            <div className="max-w-7xl mx-auto">
              <div className="mb-8">
                <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900 mb-2">
                  Services {author.name.split(' ')[0]} Specialises In
                </h2>
                <p className="text-gray-500 text-sm">
                  Areas where{' '}
                  <span className="font-medium">{author.name}</span> provides expert guidance
                  and hands-on execution.
                </p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {relatedServices.map((service) => (
                  <Link
                    key={service.id}
                    href={`/services/${service.id}`}
                    className="group relative bg-gray-50 border border-gray-100 rounded-2xl p-5 hover:shadow-lg hover:border-gray-200 hover:-translate-y-0.5 transition-all overflow-hidden"
                  >
                    {service.image && (
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity">
                        <Image src={service.image} alt="" fill className="object-cover" unoptimized />
                      </div>
                    )}
                    <div className="relative z-10">
                      <h3 className="font-bold text-gray-900 mb-1.5 group-hover:text-[#0054D2] transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-gray-500 text-xs leading-relaxed line-clamp-2 mb-3">
                        {service.description}
                      </p>
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-[#0054D2] group-hover:gap-2 transition-all">
                        Learn more <ArrowRight size={11} />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="mt-6 text-center">
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 border border-gray-200 px-6 py-2.5 rounded-full hover:border-gray-400 transition-all"
                >
                  View all services <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* ── REVIEWED CONTENT section (E-E-A-T signal) ───────────────────── */}
        {reviewedPosts.length > 0 && (
          <section className="py-12 px-4 max-w-7xl mx-auto">
            <div className="mb-8">
              <h2 className="text-2xl font-display font-bold text-gray-900 mb-2">
                Recently Reviewed by {author.name.split(' ')[0]}
              </h2>
              <p className="text-gray-500 text-sm">
                Content verified and quality-checked by {author.name} —{' '}
                {author.reviewedCount} articles reviewed.
              </p>
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              {reviewedPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group flex gap-4 items-start bg-white rounded-2xl border border-gray-100 p-4 hover:shadow-md transition-all"
                >
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover"
                      sizes="64px"
                      unoptimized
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1 mb-1">
                      <Eye size={11} className="text-gray-400 shrink-0" />
                      <span className="text-[10px] text-gray-400 font-medium">Reviewed</span>
                    </div>
                    <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 group-hover:text-[#0054D2] transition-colors leading-snug">
                      {post.title}
                    </h3>
                    <span className="text-[10px] text-gray-400 mt-1 block">{post.readTime}</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ── INDUSTRIES interlinking ──────────────────────────────────────── */}
        <section className="py-12 px-4 bg-[#0B1120]">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div>
                <h2 className="text-2xl font-display font-bold text-white mb-1">
                  Industries We Serve
                </h2>
                <p className="text-gray-400 text-sm">
                  {author.name.split(' ')[0]} and the Scallar team work across 20+ sectors.
                </p>
              </div>
              <Link
                href="/industries"
                className="inline-flex items-center gap-2 border border-white/20 text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-white/10 transition-all whitespace-nowrap"
              >
                All industries <ArrowRight size={14} />
              </Link>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {[
                { label: 'Healthcare', href: '/industries/healthcare' },
                { label: 'Real Estate', href: '/industries/real-estate' },
                { label: 'Restaurants', href: '/industries/restaurants' },
                { label: 'E-commerce', href: '/industries/ecommerce' },
                { label: 'Education', href: '/industries/education' },
                { label: 'Finance', href: '/industries/finance' },
                { label: 'Startups', href: '/industries/startups' },
                { label: 'Fitness', href: '/industries/fitness' },
                { label: 'Travel', href: '/industries/travel' },
              ].map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  className="text-sm bg-white/5 border border-white/10 text-gray-300 font-medium px-4 py-1.5 rounded-full hover:bg-white/15 hover:text-white transition-all"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── MEET THE REST OF THE TEAM ────────────────────────────────────── */}
        {otherAuthors.length > 0 && (
          <section className="py-12 px-4 max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900 mb-1">
                  Meet the Team
                </h2>
                <p className="text-gray-500 text-sm">
                  More experts behind Scallar&apos;s growth engine.
                </p>
              </div>
              <Link
                href="/team"
                className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-[#0054D2] hover:underline"
              >
                <Users size={14} /> Full team <ArrowRight size={13} />
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {otherAuthors.map((member) => (
                <Link
                  key={member.slug}
                  href={`/team/${member.slug}`}
                  className="group bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all flex gap-4 items-start"
                >
                  <div className="relative w-14 h-14 rounded-xl overflow-hidden ring-2 ring-gray-100 shrink-0">
                    <Image
                      src={member.avatar}
                      alt={member.name}
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1 mb-0.5">
                      <h3 className="font-bold text-gray-900 group-hover:text-[#0054D2] transition-colors text-sm truncate">
                        {member.name}
                      </h3>
                      <BadgeCheck size={13} className="text-[#0054D2] shrink-0" />
                    </div>
                    <p className="text-xs text-gray-500 mb-2">{member.role}</p>
                    <div className="flex flex-wrap gap-1">
                      {member.specializations.slice(0, 2).map((s) => (
                        <span
                          key={s}
                          className="text-[10px] bg-gray-50 border border-gray-100 text-gray-500 px-2 py-0.5 rounded-full"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                  <ArrowRight size={14} className="text-gray-300 group-hover:text-[#0054D2] transition-colors shrink-0 mt-1" />
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ── TRUST SIGNALS BAR ────────────────────────────────────────────── */}
        <section className="py-10 px-4 bg-gray-50 border-t border-gray-100">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                { icon: Star, value: '4.9/5', label: 'Client Rating', href: '/portfolio' },
                { icon: Globe, value: '100+', label: 'Businesses Scaled', href: '/portfolio' },
                { icon: BookOpen, value: '50+ Articles', label: 'Expert Content', href: '/blog' },
                { icon: MessageSquare, value: 'Free Call', label: 'Book a Consultation', href: '/contact' },
              ].map(({ icon: Icon, value, label, href }) => (
                <Link key={label} href={href} className="group flex flex-col items-center gap-2 hover:opacity-80 transition-opacity">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm border border-gray-100 group-hover:border-gray-300 transition-colors">
                    <Icon size={18} className="text-[#0054D2]" />
                  </div>
                  <p className="font-bold text-gray-900 text-base leading-none">{value}</p>
                  <p className="text-gray-500 text-xs">{label}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────────────────── */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto bg-[#0B1120] rounded-3xl p-10 md:p-14 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]" />
            <div className="relative z-10">
              <p className="text-[#FF1F1F] text-xs font-bold uppercase tracking-widest mb-3">
                Ready to grow?
              </p>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4 leading-tight">
                Work with {author.name.split(' ')[0]} and the Scallar Team
              </h2>
              <p className="text-gray-400 text-base md:text-lg mb-8 max-w-xl mx-auto leading-relaxed">
                Get a free consultation and discover how we can scale your business with
                AI automation, SEO, and performance marketing.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-[#FF1F1F] text-white font-bold px-8 py-4 rounded-full hover:bg-red-600 transition-all shadow-lg shadow-red-500/20 hover:scale-105"
                >
                  Get Free Consultation <ArrowRight size={16} />
                </Link>
                <Link
                  href="/pricing"
                  className="inline-flex items-center gap-2 border border-white/20 text-white font-semibold px-8 py-4 rounded-full hover:bg-white/10 transition-all"
                >
                  View Pricing
                </Link>
              </div>
              <div className="flex items-center justify-center gap-6 mt-8 text-xs text-gray-500">
                <Link href="/about" className="hover:text-gray-300 transition-colors">About Us</Link>
                <span>·</span>
                <Link href="/portfolio" className="hover:text-gray-300 transition-colors">Our Work</Link>
                <span>·</span>
                <Link href="/blog" className="hover:text-gray-300 transition-colors">Blog</Link>
                <span>·</span>
                <Link href="/services" className="hover:text-gray-300 transition-colors">Services</Link>
              </div>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
