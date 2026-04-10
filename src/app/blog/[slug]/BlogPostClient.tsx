'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Calendar, Clock, User, Tag } from 'lucide-react';
import Button from '@/components/Button';
import type { BlogPost } from '@/data/blog-posts';
import type { Service } from '@/types/types';

interface Props {
  post: BlogPost;
  relatedService: Service | undefined;
  relatedPosts: BlogPost[];
}

export default function BlogPostClient({ post, relatedService, relatedPosts }: Props) {
  // Convert simple markdown-ish content to paragraphs/headings
  const renderContent = (content: string) => {
    return content.split('\n\n').map((block, idx) => {
      if (block.startsWith('## ')) {
        return (
          <h2 key={idx} className="text-2xl md:text-3xl font-display font-bold text-brand-dark mt-10 mb-4">
            {block.replace('## ', '')}
          </h2>
        );
      }
      if (block.startsWith('### ')) {
        return (
          <h3 key={idx} className="text-xl font-bold text-brand-dark mt-6 mb-3">
            {block.replace('### ', '')}
          </h3>
        );
      }
      if (block.startsWith('- ') || block.match(/^\d+\./)) {
        const items = block.split('\n').filter(Boolean);
        return (
          <ul key={idx} className="space-y-2 my-4 pl-4">
            {items.map((item, i) => (
              <li key={i} className="text-gray-600 leading-relaxed flex gap-2">
                <span className="text-brand-lime mt-1.5 shrink-0">•</span>
                <span>{item.replace(/^[-\d+.]\s*/, '').replace(/\*\*(.*?)\*\*/g, '$1')}</span>
              </li>
            ))}
          </ul>
        );
      }
      if (block.trim()) {
        const html = block.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        return (
          <p key={idx} className="text-gray-600 leading-relaxed my-4 text-lg"
            dangerouslySetInnerHTML={{ __html: html }} />
        );
      }
      return null;
    });
  };

  return (
    <div className="w-full min-h-screen bg-brand-bg">

      {/* ── Breadcrumb ─────────────────────────────────────────────────── */}
      <div className="pt-24 md:pt-28 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-brand-dark transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-brand-dark transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-brand-dark font-medium line-clamp-1">{post.title}</span>
          </nav>
        </div>
      </div>

      {/* ── Article Header ─────────────────────────────────────────────── */}
      <article className="px-4 md:px-6 pb-20">
        <div className="max-w-4xl mx-auto">

          <span className="inline-block py-1 px-4 rounded-full bg-brand-lime/20 text-brand-dark text-xs font-bold tracking-wide uppercase mb-4">
            {post.category}
          </span>

          <h1 className="text-3xl md:text-5xl font-display font-bold text-brand-dark mb-6 leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-8">
            <span className="flex items-center gap-1.5"><User size={14} /> {post.author}</span>
            <span className="flex items-center gap-1.5"><Calendar size={14} /> {new Date(post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
            <span className="flex items-center gap-1.5"><Clock size={14} /> {post.readTime} read</span>
          </div>

          {/* Hero Image */}
          <div className="rounded-[2.5rem] overflow-hidden h-[300px] md:h-[460px] mb-12 relative">
            <Image src={post.image} alt={post.title} fill className="object-cover" unoptimized />
          </div>

          {/* Content */}
          <div className="prose-custom">
            {renderContent(post.content)}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-gray-100">
            <Tag size={14} className="text-gray-400 mt-1" />
            {post.tags.map((tag) => (
              <span key={tag} className="text-xs font-medium px-3 py-1 rounded-full bg-white border border-gray-200 text-gray-500">
                {tag}
              </span>
            ))}
          </div>

          {/* ── Internal link to related service ──────────────────────── */}
          {relatedService && (
            <div className="mt-12 p-6 md:p-8 bg-brand-dark rounded-[2.5rem] text-white">
              <p className="text-sm text-gray-400 mb-2">Related service</p>
              <h3 className="text-xl md:text-2xl font-bold mb-3">{relatedService.title}</h3>
              <p className="text-gray-400 mb-5">{relatedService.description}</p>
              <Link href={`/services/${relatedService.id}`}>
                <Button className="rounded-full">
                  Learn About {relatedService.title} <ArrowRight size={16} />
                </Button>
              </Link>
            </div>
          )}

          {/* ── Related Posts (internal links) ────────────────────────── */}
          {relatedPosts.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-display font-bold text-brand-dark mb-8">
                Related Articles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((rp) => (
                  <Link key={rp.slug} href={`/blog/${rp.slug}`} className="group">
                    <div className="h-44 rounded-2xl overflow-hidden mb-3 relative">
                      <Image src={rp.image} alt={rp.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" unoptimized />
                    </div>
                    <span className="text-xs font-bold text-brand-lime uppercase tracking-wide">{rp.category}</span>
                    <h3 className="font-bold text-brand-dark mt-1 group-hover:text-brand-lime transition-colors line-clamp-2">{rp.title}</h3>
                    <span className="inline-flex items-center gap-1 text-sm font-bold text-gray-400 mt-2">
                      Read <ArrowRight size={12} />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* ── CTA ───────────────────────────────────────────────────── */}
          <div className="mt-16 text-center bg-brand-lime/10 rounded-[2.5rem] p-10">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-brand-dark mb-3">
              Ready to Apply These Strategies?
            </h2>
            <p className="text-gray-500 mb-6 max-w-xl mx-auto">
              Let our team audit your current digital presence and build a plan based on exactly
              what will work for your business.
            </p>
            <Link href="/contact">
              <Button className="rounded-full px-8">Get a Free Audit</Button>
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
