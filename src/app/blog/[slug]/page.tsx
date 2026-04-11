// ✅ SERVER COMPONENT — SSG for all blog posts with BreadcrumbList JSON-LD
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BLOG_POSTS, getBlogPostBySlug } from '@/data/blog-posts';
import { SERVICES } from '@/constants/constants';
import BlogPostClient from './BlogPostClient';

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return { title: 'Post Not Found' };

  const title = `${post.title} | Scallar IT Solution Blog`;
  return {
    title,
    description: post.excerpt,
    keywords: post.tags,
    alternates: { canonical: `https://scallar.in/blog/${slug}` },
    openGraph: {
      title,
      description: post.excerpt,
      type: 'article',
      url: `https://scallar.in/blog/${slug}`,
      siteName: 'Scallar IT Solution',
      publishedTime: post.date,
      authors: [post.author],
      images: [{ url: post.image, width: 800, height: 600 }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: post.excerpt,
      images: [post.image],
      site: '@scallarit',
    },
  };
}

// ─── Article JSON-LD ─────────────────────────────────────────────────────────
function ArticleJsonLd({ post }: { post: ReturnType<typeof getBlogPostBySlug> }) {
  if (!post) return null;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: post.image,
    url: `https://scallar.in/blog/${post.slug}`,
    datePublished: post.date,
    dateModified: post.date,
    wordCount: post.content.split(' ').length,
    author: {
      '@type': 'Person',
      name: post.author,
      url: 'https://scallar.in/team',
      worksFor: {
        '@type': 'Organization',
        name: 'Scallar IT Solution',
        url: 'https://scallar.in',
      },
    },
    publisher: {
      '@type': 'Organization',
      name: 'Scallar IT Solution',
      url: 'https://scallar.in',
      logo: {
        '@type': 'ImageObject',
        url: 'https://scallar.in/og-image.png',
        width: 1200,
        height: 630,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://scallar.in/blog/${post.slug}`,
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

// ─── BreadcrumbList JSON-LD ──────────────────────────────────────────────────
function BreadcrumbJsonLd({ post }: { post: ReturnType<typeof getBlogPostBySlug> }) {
  if (!post) return null;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://scallar.in',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: 'https://scallar.in/blog',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: `https://scallar.in/blog/${post.slug}`,
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

// ─── Page ────────────────────────────────────────────────────────────────────
export default async function BlogPostPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const relatedService = SERVICES.find((s) => s.id === post!.relatedService);
  const relatedPosts = BLOG_POSTS.filter(
    (p) => p.slug !== slug && p.category === post!.category
  ).slice(0, 3);

  return (
    <>
      <BreadcrumbJsonLd post={post} />
      <ArticleJsonLd post={post} />
      <BlogPostClient post={post!} relatedService={relatedService} relatedPosts={relatedPosts} />
    </>
  );
}