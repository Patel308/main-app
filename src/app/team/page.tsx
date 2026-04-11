// ✅ PURE SERVER COMPONENT — raw <img> tags replaced with next/image
import type { Metadata } from 'next';
import Image from 'next/image';
import { Linkedin } from 'lucide-react';
import { TEAM_MEMBERS } from '@/constants';
import Link from 'next/link';
import Button from '@/components/Button';

export const metadata: Metadata = {
  title: 'Our Team | Meet the Experts | Scallar IT Solution',
  description:
    'Meet the passionate team of digital marketers, developers, and AI specialists at Scallar IT Solution who drive measurable business growth for clients across India.',
  keywords:
    'scallar it solution team, digital marketing experts noida, web developers delhi ncr, ai specialists india',
  openGraph: {
    title: 'Our Team | Scallar IT Solution',
    description: 'Meet the people driving digital growth for businesses across India.',
    type: 'website',
    siteName: 'Scallar IT Solution',
    images: [{ url: 'https://scallar.in/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Team | Scallar IT Solution',
    description: 'Meet the people driving digital growth for businesses across India.',
    site: '@scallarit',
  },
  alternates: { canonical: 'https://scallar.in/team' },
};

export default function TeamPage() {
  return (
    <div className="w-full min-h-screen bg-brand-bg">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="pt-28 pb-12 md:pt-32 md:pb-20 px-6 relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto text-center relative z-10">
          <span className="inline-block py-1 px-3 rounded-full bg-brand-lime/20 text-brand-dark text-xs md:text-sm font-bold tracking-wide uppercase mb-4">
            The Brains Behind The Brand
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-brand-dark mb-6 tracking-tight leading-[1.1]">
            Driven by Passion, <br className="hidden md:block" /> Powered by Code.
          </h1>
          <p className="text-lg md:text-xl text-brand-dark/60 max-w-2xl mx-auto mb-10 md:mb-12 px-4">
            We are a collective of thinkers, creators, and engineers united by a single mission:
            to help your business scale effortlessly.
          </p>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[800px] h-[300px] md:h-[800px] bg-brand-lime/5 rounded-full blur-[80px] md:blur-[120px] pointer-events-none" />
      </section>

      {/* ── Founder ──────────────────────────────────────────────────────── */}
      <section className="px-4 md:px-6 pb-16 md:pb-24">
        <div className="max-w-[1200px] mx-auto">
          <div className="bg-brand-dark rounded-[2rem] md:rounded-[3rem] p-6 md:p-16 text-white relative overflow-hidden shadow-2xl">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center relative z-10">
              <div className="w-full lg:w-5/12 relative">
                <div className="aspect-[4/5] rounded-2xl md:rounded-[2rem] overflow-hidden border-4 border-white/10 shadow-2xl max-w-sm mx-auto lg:max-w-none relative">
                  {/* priority — founder image is above the fold */}
                  <Image
                    src={TEAM_MEMBERS[0].image}
                    alt={TEAM_MEMBERS[0].name}
                    fill
                    priority
                    className="object-cover object-top"
                    sizes="(max-width: 1024px) 384px, 40vw"
                  />
                </div>
                <div className="absolute -bottom-4 -right-2 md:-bottom-6 md:-right-6 bg-brand-lime text-brand-dark p-4 md:p-6 rounded-full shadow-lg scale-75 md:scale-100 origin-bottom-right">
                  <span className="font-display font-bold text-xl block">10+</span>
                  <span className="text-xs font-bold uppercase tracking-wider">Years Exp.</span>
                </div>
              </div>
              <div className="w-full lg:w-7/12 text-center lg:text-left">
                <span className="text-brand-lime font-bold tracking-wider uppercase text-xs mb-4 block">
                  Founder &amp; CEO
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4">
                  {TEAM_MEMBERS[0].name}
                </h2>
                <p className="text-gray-400 text-lg mb-6 leading-relaxed">{TEAM_MEMBERS[0].bio}</p>
                {TEAM_MEMBERS[0].linkedin && (
                  <a
                    href={TEAM_MEMBERS[0].linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-brand-lime hover:text-white transition-colors"
                  >
                    <Linkedin size={20} /> Connect on LinkedIn
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Team Grid ────────────────────────────────────────────────────── */}
      <section className="px-4 md:px-6 pb-20">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-dark text-center mb-12">
            Meet The Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM_MEMBERS.slice(1).map((member, idx) => (
              <div key={idx} className="bg-white rounded-[2rem] p-6 text-center hover:shadow-2xl transition-shadow">
                <div className="aspect-[4/5] rounded-2xl overflow-hidden mb-4 relative">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <h3 className="text-xl font-bold text-brand-dark mb-1">{member.name}</h3>
                <p className="text-brand-lime text-sm font-bold uppercase tracking-wide mb-3">
                  {member.role}
                </p>
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-brand-bg text-brand-dark hover:bg-brand-lime hover:text-white transition-colors"
                  >
                    <Linkedin size={18} />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="px-4 md:px-6 pb-20">
        <div className="max-w-[1400px] mx-auto text-center bg-brand-lime rounded-[3rem] p-12 md:p-20">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-dark mb-6">
            Join Our Team
          </h2>
          <p className="text-brand-dark/70 text-lg mb-8 max-w-2xl mx-auto">
            We&apos;re always looking for talented people to join our mission.
          </p>
          <Link href="/contact">
            <Button className="rounded-full bg-brand-dark text-white hover:bg-black">
              Get in Touch
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
