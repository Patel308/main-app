// ✅ SERVER COMPONENT
import type { Metadata } from 'next';
import Link from 'next/link';
import { BLOG_POSTS, BLOG_CATEGORIES } from '@/data/blog-posts';
import { Clock, Calendar, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Blog & Resources | Digital Marketing Insights | Scallar IT Solution',
  description: 'Expert guides, strategies, and insights on SEO, AI Automation, Digital Marketing, and Web Development from the Scallar IT Solution team.',
  keywords: 'digital marketing blog india, seo tips 2025, ai automation guide, web development blog, google ads tips',
  alternates: { canonical: 'https://scallar.in/blog' },
};

export default function BlogPage() {
  const featured = BLOG_POSTS[0];
  const rest = BLOG_POSTS.slice(1);

  return (
    <div className="w-full min-h-screen bg-brand-bg pt-24 md:pt-32 pb-20">

      <section className="px-4 md:px-6 mb-12">
        <div className="max-w-[1400px] mx-auto text-center">
          <span className="inline-block py-1 px-4 rounded-full bg-brand-lime/20 text-brand-dark text-xs font-bold tracking-wide uppercase mb-4">Blog</span>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-brand-dark mb-4">Insights & Strategies</h1>
          <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto">
            Deep dives into digital marketing, SEO, AI automation, and web development — to help you scale smarter.
          </p>
        </div>
      </section>

      {/* Featured Post */}
      <section className="px-4 md:px-6 mb-16">
        <div className="max-w-[1400px] mx-auto">
          <Link href={`/blog/${featured.slug}`} className="group grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white rounded-[3rem] overflow-hidden hover:shadow-2xl transition-all">
            <div className="h-72 lg:h-auto overflow-hidden">
              <img src={featured.image} alt={featured.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <span className="inline-block text-xs font-bold text-brand-lime uppercase tracking-wide mb-3">{featured.category}</span>
              <h2 className="text-2xl md:text-4xl font-display font-bold text-brand-dark mb-4 group-hover:text-brand-lime transition-colors leading-tight">
                {featured.title}
              </h2>
              <p className="text-gray-500 mb-6 leading-relaxed">{featured.excerpt}</p>
              <div className="flex items-center gap-4 text-sm text-gray-400 mb-6">
                <span className="flex items-center gap-1.5"><Calendar size={13} /> {new Date(featured.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                <span className="flex items-center gap-1.5"><Clock size={13} /> {featured.readTime}</span>
              </div>
              <span className="inline-flex items-center gap-2 font-bold text-brand-dark group-hover:gap-3 transition-all">
                Read Article <ArrowRight size={16} />
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* All Posts Grid */}
      <section className="px-4 md:px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {rest.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group bg-white rounded-[2rem] overflow-hidden hover:shadow-2xl transition-all hover:-translate-y-2">
                <div className="h-52 overflow-hidden">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-bold text-brand-lime uppercase tracking-wide">{post.category}</span>
                    <span className="text-gray-200">•</span>
                    <span className="text-xs text-gray-400 flex items-center gap-1"><Clock size={11} /> {post.readTime}</span>
                  </div>
                  <h3 className="text-lg font-bold text-brand-dark mb-2 group-hover:text-brand-lime transition-colors line-clamp-2 leading-tight">
                    {post.title}
                  </h3>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                  <span className="inline-flex items-center gap-1 text-sm font-bold text-brand-dark group-hover:gap-2 transition-all">
                    Read More <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
