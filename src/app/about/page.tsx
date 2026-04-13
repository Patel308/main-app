import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { AUTHORS } from '@/data/authors';
import {
  ArrowRight, BadgeCheck, Users, Target, Zap,
  TrendingUp, Globe, Award, Linkedin, CheckCircle2,
  Star, Building2, Code2, BarChart3, Bot
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us | Scallar IT Solution — AI-Driven Digital Marketing Agency',
  description:
    'Learn about Scallar IT Solution — a Noida-based AI automation and digital marketing agency helping businesses scale with SEO, PPC, AI chatbots, and WhatsApp automation. Meet our expert team.',
  openGraph: {
    title: 'About Scallar IT Solution | AI & Digital Marketing Agency',
    description:
      'We bridge creative design and revenue growth. Meet the team behind 100+ successful business transformations.',
    url: 'https://scallar.in/about',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  alternates: { canonical: 'https://scallar.in/about' },
};

const aboutSchema = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  '@id': 'https://scallar.in/about#webpage',
  url: 'https://scallar.in/about',
  name: 'About Scallar IT Solution',
  description:
    'Scallar IT Solution is a Noida-based AI automation and digital marketing agency helping businesses scale.',
  isPartOf: { '@id': 'https://scallar.in/#website' },
  about: { '@id': 'https://scallar.in/#organization' },
};

const STATS = [
  { value: '100+', label: 'Businesses Scaled', icon: Building2 },
  { value: '5+', label: 'Years Experience', icon: Award },
  { value: '3x', label: 'Avg. ROI Delivered', icon: TrendingUp },
  { value: '15+', label: 'Countries Served', icon: Globe },
];

const VALUES = [
  {
    icon: Target,
    title: 'Results First',
    desc: 'Every strategy is tied to measurable outcomes — leads, revenue, and growth. No vanity metrics.',
  },
  {
    icon: Zap,
    title: 'AI-Powered',
    desc: 'We use cutting-edge AI tools to automate, scale, and optimize everything we do for our clients.',
  },
  {
    icon: Users,
    title: 'Long-term Partnership',
    desc: 'We don\'t just deliver projects. We become growth partners invested in your long-term success.',
  },
  {
    icon: CheckCircle2,
    title: 'Transparent Always',
    desc: 'No hidden fees, no fluff. Clear reporting, honest communication, and real-time dashboards.',
  },
];

const SERVICES_PREVIEW = [
  { icon: BarChart3, title: 'Digital Marketing', href: '/services/digital-marketing', desc: 'SEO, PPC, Social Media' },
  { icon: Bot, title: 'AI Automation', href: '/services/ai-automation', desc: 'Chatbots, Voice AI, Workflows' },
  { icon: Code2, title: 'Web Development', href: '/services/web-dev', desc: 'Next.js, React, E-commerce' },
  { icon: TrendingUp, title: 'Growth Strategy', href: '/services/seo', desc: 'SEO, CRO, Lead Generation' },
];

const TIMELINE = [
  { year: '2019', title: 'Founded in Noida', desc: 'Started with web development and SEO for local businesses.' },
  { year: '2021', title: 'Expanded to Marketing', desc: 'Launched full-service digital marketing with Google Ads and social media.' },
  { year: '2022', title: 'AI Integration', desc: 'Pioneered AI chatbots and WhatsApp automation for Indian SMEs.' },
  { year: '2023', title: 'Global Reach', desc: 'Expanded client base to Dubai, UK, Australia, and Singapore.' },
  { year: '2024', title: 'AI Voice Agents', desc: 'Launched AI voice agent solutions for 24/7 customer support.' },
  { year: '2025', title: 'Scale & Innovate', desc: 'Serving 100+ businesses with full AI-driven growth ecosystems.' },
];

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />

      <main className="min-h-screen bg-brand-bg font-sans overflow-x-hidden">

        {/* ── HERO ─────────────────────────────────────────────────────── */}
        <section className="pt-32 pb-20 px-4 max-w-7xl mx-auto">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-[#0054D2] text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
              <Star size={14} className="fill-[#0054D2]" />
              About Scallar IT Solution
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-gray-900 leading-tight mb-6">
              We Scale Businesses With{' '}
              <span className="text-[#FF1F1F]">AI</span> &{' '}
              <span className="text-[#0054D2]">Design</span>
            </h1>
            <p className="text-xl text-gray-500 leading-relaxed max-w-2xl mb-8">
              Scallar IT Solution bridges the gap between creative design and revenue growth.
              Based in Noida, we help businesses across India and globally scale with
              data-driven SEO, AI automation, and performance marketing.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-[#0B1120] text-white font-semibold px-8 py-4 rounded-full hover:bg-black transition-all shadow-lg hover:shadow-xl hover:scale-105"
              >
                Work With Us <ArrowRight size={18} />
              </Link>
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 border-2 border-gray-200 text-gray-700 font-semibold px-8 py-4 rounded-full hover:border-gray-400 transition-all"
              >
                View Our Work
              </Link>
            </div>
          </div>
        </section>

        {/* ── STATS ────────────────────────────────────────────────────── */}
        <section className="py-16 px-4 bg-[#0B1120]">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map(({ value, label, icon: Icon }) => (
              <div key={label} className="text-center">
                <Icon size={24} className="text-[#FF1F1F] mx-auto mb-3" />
                <p className="text-4xl font-display font-bold text-white">{value}</p>
                <p className="text-gray-400 text-sm font-medium mt-1">{label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── MISSION ──────────────────────────────────────────────────── */}
        <section className="py-20 px-4 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                We believe every business — from a local clinic in Noida to a startup in Dubai —
                deserves access to world-class digital marketing and AI technology.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                Our mission is to democratize AI-powered growth strategies, making them
                accessible, affordable, and measurably effective for businesses of all sizes.
              </p>
              <div className="space-y-3">
                {[
                  'AI-first approach to every solution',
                  'Data-driven decisions, not guesswork',
                  'Transparent reporting and communication',
                  'Long-term partnerships over quick wins',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle2 size={18} className="text-[#0054D2] shrink-0" />
                    <span className="text-gray-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl p-8 border border-gray-100">
              <blockquote className="text-2xl font-display font-bold text-gray-900 leading-tight mb-6">
                "We don't just run campaigns. We build growth engines that work while you sleep."
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-white shadow">
                  <Image
                    src={`https://ui-avatars.com/api/?name=Deepesh+Patel&background=0B1120&color=fff&size=128`}
                    alt="Deepesh Patel"
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>
                <div>
                  <p className="font-bold text-gray-900">Deepesh Patel</p>
                  <p className="text-sm text-gray-500">Founder, Scallar IT Solution</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── VALUES ───────────────────────────────────────────────────── */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
                What We Stand For
              </h2>
              <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                Our values shape every decision, every campaign, and every client relationship.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {VALUES.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all hover:-translate-y-1">
                  <div className="w-12 h-12 bg-[#0B1120] rounded-xl flex items-center justify-center mb-4">
                    <Icon size={22} className="text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg mb-2">{title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TEAM ─────────────────────────────────────────────────────── */}
        <section className="py-20 px-4 max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
              The Experts Behind Your Growth
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Our team combines deep technical expertise with creative marketing thinking.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {AUTHORS.map((author) => (
              <div key={author.id} className="group bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="flex items-start gap-4 mb-4">
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden ring-2 ring-gray-100 shrink-0">
                    <Image
                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(author.name)}&background=0B1120&color=fff&size=128`}
                      alt={author.name}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <h3 className="font-bold text-gray-900">{author.name}</h3>
                      <BadgeCheck size={16} className="text-[#0054D2]" />
                    </div>
                    <p className="text-sm text-gray-500">{author.role}</p>
                    <p className="text-xs text-[#FF1F1F] font-medium mt-0.5">{author.experience}+ years</p>
                  </div>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{author.shortBio}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {author.specializations.slice(0, 3).map((spec) => (
                    <span key={spec} className="text-xs bg-gray-50 border border-gray-200 text-gray-600 px-2 py-0.5 rounded-full">
                      {spec}
                    </span>
                  ))}
                </div>
                <a
                  href={author.linkedin}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0077b5] hover:underline"
                >
                  <Linkedin size={13} />
                  Connect on LinkedIn
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* ── TIMELINE ─────────────────────────────────────────────────── */}
        <section className="py-20 px-4 bg-[#0B1120]">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
                Our Journey
              </h2>
              <p className="text-gray-400 text-lg">From a local agency to a global growth partner.</p>
            </div>
            <div className="relative">
              <div className="absolute left-6 top-0 bottom-0 w-px bg-white/10" />
              <div className="space-y-10">
                {TIMELINE.map(({ year, title, desc }, i) => (
                  <div key={year} className="flex gap-8 items-start pl-2">
                    <div className="relative shrink-0">
                      <div className="w-10 h-10 bg-[#FF1F1F] rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg shadow-red-500/20 z-10 relative">
                        {year.slice(2)}
                      </div>
                    </div>
                    <div className="pb-2">
                      <p className="text-[#FF1F1F] text-xs font-bold mb-1">{year}</p>
                      <h3 className="text-white font-bold text-lg">{title}</h3>
                      <p className="text-gray-400 text-sm mt-1 leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── SERVICES INTERLINKING ─────────────────────────────────────── */}
        <section className="py-20 px-4 max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
              What We Do
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              From AI automation to performance marketing — we cover every aspect of digital growth.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {SERVICES_PREVIEW.map(({ icon: Icon, title, href, desc }) => (
              <Link
                key={title}
                href={href}
                className="group bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-lg hover:border-gray-200 transition-all hover:-translate-y-1"
              >
                <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#FF1F1F] transition-colors">
                  <Icon size={22} className="text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{title}</h3>
                <p className="text-gray-500 text-sm">{desc}</p>
                <div className="flex items-center gap-1 text-[#0054D2] text-sm font-semibold mt-4 group-hover:gap-2 transition-all">
                  Learn more <ArrowRight size={14} />
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 border-2 border-gray-200 text-gray-700 font-semibold px-8 py-3 rounded-full hover:border-gray-900 hover:text-gray-900 transition-all"
            >
              View All Services <ArrowRight size={16} />
            </Link>
          </div>
        </section>

        {/* ── INDUSTRIES INTERLINKING ───────────────────────────────────── */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-display font-bold text-gray-900 mb-8 text-center">
              Industries We Serve
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { label: 'Healthcare', href: '/industries/healthcare' },
                { label: 'Real Estate', href: '/industries/real-estate' },
                { label: 'Restaurants', href: '/industries/restaurants' },
                { label: 'E-commerce', href: '/industries/ecommerce' },
                { label: 'Education', href: '/industries/education' },
                { label: 'Finance', href: '/industries/finance' },
                { label: 'Startups', href: '/industries/startups' },
                { label: 'All Industries', href: '/industries' },
              ].map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  className="bg-white border border-gray-200 text-gray-700 font-medium px-5 py-2 rounded-full hover:border-gray-900 hover:text-gray-900 transition-all text-sm"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────────────── */}
        <section className="py-20 px-4 max-w-7xl mx-auto">
          <div className="bg-[#0B1120] rounded-3xl p-10 md:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">
                Ready to Scale Your Business?
              </h2>
              <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">
                Book a free consultation and let's build your growth engine together.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-[#FF1F1F] text-white font-bold px-8 py-4 rounded-full hover:bg-red-600 transition-all shadow-lg shadow-red-500/20 hover:scale-105"
                >
                  Get Free Consultation <ArrowRight size={18} />
                </Link>
                <Link
                  href="/pricing"
                  className="inline-flex items-center gap-2 border border-white/20 text-white font-semibold px-8 py-4 rounded-full hover:bg-white/10 transition-all"
                >
                  View Pricing
                </Link>
              </div>
              <p className="text-gray-500 text-sm mt-6">
                Trusted by 100+ businesses · No contracts · Cancel anytime
              </p>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}