// ✅ SERVER COMPONENT — SSG for all blog posts
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
    keywords: post.tags.join(', '),
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
    },
  };
}

function ArticleJsonLd({ post }: { post: ReturnType<typeof getBlogPostBySlug> }) {
  if (!post) return null;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: post.image,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Person',
      name: post.author,
      worksFor: { '@type': 'Organization', name: 'Scallar IT Solution' },
    },
    publisher: {
      '@type': 'Organization',
      name: 'Scallar IT Solution',
      logo: { '@type': 'ImageObject', url: 'https://scallar.in/favicon.svg' },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://scallar.in/blog/${post.slug}` },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default async function BlogPostPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const relatedService = SERVICES.find((s) => s.id === post.relatedService);
  const relatedPosts = BLOG_POSTS.filter(
    (p) => p.slug !== slug && p.category === post.category
  ).slice(0, 3);

  return (
    <>
      <ArticleJsonLd post={post} />
      <BlogPostClient post={post} relatedService={relatedService} relatedPosts={relatedPosts} />
    </>
  );
}
