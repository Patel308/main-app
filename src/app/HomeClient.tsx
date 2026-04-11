'use client';

// All interactivity lives here. The Server Component (page.tsx) imports this.
// useState / useEffect / window access — all safe here.

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight, Check, Star, TrendingUp, Quote,
  ChevronLeft, ChevronRight, Linkedin, Zap, ArrowUpRight,
} from 'lucide-react';
import Button from '@/components/Button';
import RevealOnScroll from '@/components/RevealOnScroll';
import { SERVICES, PORTFOLIO, TESTIMONIALS, TEAM_MEMBERS } from '@/constants';

const CATEGORY_MAP: Record<string, string[]> = {
  Marketing: ['digital-marketing', 'seo', 'branding', 'content-marketing', 'social-media-marketing', 'ppc-advertising'],
  Development: ['web-dev', 'app-dev', 'ecommerce-dev', 'ui-ux-design', 'cms-dev', 'api-integration'],
  'Automation & AI': ['whatsapp-automation', 'email-automation', 'automation-crm', 'ai-voice', 'chatbot-dev', 'data-analytics'],
};

function getCategory(id: string): string {
  for (const [cat, ids] of Object.entries(CATEGORY_MAP)) {
    if (ids.includes(id)) return cat;
  }
  return 'Consulting';
}

export default function HomeClient() {
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const [currentTeamIndex, setCurrentTeamIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(
      () => setCurrentTestimonialIndex((prev) => (prev + 1) % TESTIMONIALS.length),
      4000
    );
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const teamInterval = setInterval(
      () => setCurrentTeamIndex((prev) => (prev + 1) % (TEAM_MEMBERS.length - 1)),
      3000
    );
    return () => clearInterval(teamInterval);
  }, []);

  const homeServices = [SERVICES[0], SERVICES[6], SERVICES[12], SERVICES[14], SERVICES[7], SERVICES[1]];
  const featuredPortfolio = PORTFOLIO.slice(0, 3);
  const extendedTestimonials = [...TESTIMONIALS, ...TESTIMONIALS.slice(0, 3)];
  const coreTeam = TEAM_MEMBERS.slice(1);
  const extendedTeam = [...coreTeam, ...coreTeam.slice(0, 4)];

  return (
    <div className="w-full">

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative pt-24 pb-12 md:pt-32 lg:pt-20 lg:pb-32 px-4 md:px-6 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-lime/5 rounded-full blur-[100px] animate-blob -z-10" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-400/5 rounded-full blur-[100px] animate-blob animation-delay-2000 -z-10" />
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-center">
          <div className="lg:col-span-5 relative z-10 text-center lg:text-left">
            <RevealOnScroll variant="up">
              <span className="inline-block py-1 px-3 rounded-full bg-brand-lime/20 text-brand-dark text-xs md:text-sm font-bold tracking-wide uppercase mb-4 md:mb-6">
                Digital Growth Agency
              </span>
            </RevealOnScroll>
            <RevealOnScroll variant="up" delay={100}>
              <h1 className="text-4xl sm:text-5xl lg:text-[4.5rem] xl:text-[5rem] font-display font-bold text-brand-dark leading-[1.1] lg:leading-[0.95] tracking-tight mb-6 md:mb-8">
                We Scale Your <br /> Business With <br /> AI & Design.
              </h1>
            </RevealOnScroll>
            <RevealOnScroll variant="up" delay={200}>
              <p className="text-brand-dark/70 text-base md:text-lg mb-8 md:mb-10 leading-relaxed max-w-md mx-auto lg:mx-0 px-2 md:px-0">
                Scallar IT Solution bridges the gap between <strong>creative design</strong> and{' '}
                <strong>revenue growth</strong>. We solve your visibility and conversion problems
                with data-driven strategies.
              </p>
            </RevealOnScroll>
            <RevealOnScroll variant="up" delay={300}>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 md:gap-6 mb-10 md:mb-16">
                <Link href="/contact" className="w-full sm:w-auto">
                  <Button className="bg-black text-white rounded-full px-8 py-4 text-base hover:bg-gray-800 flex items-center justify-center gap-2 w-full sm:w-auto transition-transform hover:scale-105">
                    Start Your Project <ArrowRight size={18} />
                  </Button>
                </Link>
                <Link href="/portfolio">
                  <span className="font-bold text-brand-dark underline decoration-1 underline-offset-4 hover:opacity-70 transition-opacity cursor-pointer">
                    View Our Work
                  </span>
                </Link>
              </div>
            </RevealOnScroll>
            <RevealOnScroll variant="up" delay={400}>
              <div className="space-y-4">
                <p className="text-sm font-bold text-brand-dark">Trusted by industry leaders</p>
                <div className="flex items-center justify-center lg:justify-start gap-8 md:gap-12 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                  <Image src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="Google" width={80} height={32} className="h-6 md:h-8 w-auto object-contain" unoptimized />
                  <Image src="https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg" alt="Meta" width={60} height={20} className="h-3 md:h-5 w-auto object-contain" unoptimized />
                  <Image src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="Amazon" width={80} height={28} className="h-5 md:h-7 w-auto object-contain mt-1" unoptimized />
                </div>
              </div>
            </RevealOnScroll>
          </div>

          <div className="lg:col-span-7 relative h-[300px] md:h-[600px] hidden lg:block perspective-1000">
            <RevealOnScroll variant="left" className="absolute left-[15%] top-[5%] w-[45%] h-[70%] z-20">
              <div className="w-full h-full rounded-[3rem] overflow-hidden bg-gray-200 shadow-2xl relative group animate-float">
               <Image
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80"
                  alt="Digital Marketing Team at Scallar IT Solution"
                    fill
                  priority
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
               />
                <div className="absolute top-8 right-8 w-16 h-16 bg-black rounded-full flex items-center justify-center text-brand-lime animate-pulse-glow shadow-xl">
                  <TrendingUp size={24} />
                </div>
              </div>
            </RevealOnScroll>
            <RevealOnScroll delay={200} variant="down" className="absolute right-0 top-0 w-[35%] h-[35%] z-10">
              <div className="w-full h-full rounded-[2.5rem] overflow-hidden bg-gray-100 shadow-xl animate-float-slow relative">
                <Image
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
                  alt="Team Collaboration at Scallar"
                  fill
                  className="object-cover"
                 
                />
              </div>
            </RevealOnScroll>
            <RevealOnScroll delay={400} variant="up" className="absolute right-[5%] bottom-[5%] w-[35%] h-[40%] z-10">
              <div className="w-full h-full rounded-[2.5rem] bg-brand-yellow p-8 flex flex-col justify-center relative overflow-hidden shadow-lg animate-float">
                <h3 className="text-4xl md:text-5xl font-bold text-brand-dark mb-2">230+</h3>
                <p className="text-brand-dark/80 text-sm font-medium leading-tight max-w-[120px]">
                  Success stories from satisfied clients.
                </p>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* ── Services ──────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-brand-bg md:bg-white rounded-[2rem] md:rounded-[3rem] mx-0 md:mx-6 shadow-none md:shadow-sm">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <RevealOnScroll variant="up">
            <div className="flex flex-col lg:flex-row justify-between items-end mb-12 md:mb-16 gap-6 md:gap-8 text-center lg:text-left">
              <div className="max-w-2xl mx-auto lg:mx-0">
                <span className="text-brand-lime font-bold tracking-wider uppercase text-xs md:text-sm mb-2 block">
                  Our Expertise
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-brand-dark mb-4 md:mb-6 leading-tight">
                  Digital Solutions for <br />
                  <span className="text-blue-600">Modern Businesses</span>
                </h2>
                <p className="text-gray-500 text-base md:text-lg leading-relaxed">
                  We provide integrated growth ecosystems. From SEO to AI Automation, we have the
                  expertise to scale your revenue.
                </p>
              </div>
              <Link href="/services" className="w-full sm:w-auto">
                <Button variant="outline" className="rounded-full px-8 w-full sm:w-auto">
                  Explore All Services <ArrowRight size={18} className="ml-2" />
                </Button>
              </Link>
            </div>
          </RevealOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {homeServices.map((service, idx) => (
              <RevealOnScroll key={service.id} delay={idx * 100} variant="up">
                <Link href={`/services/${service.id}`} className="group block h-full">
                  <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] p-4 h-full flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border border-gray-100 md:border-transparent shadow-sm md:shadow-none">
                    <div className="h-56 md:h-64 rounded-[1.5rem] md:rounded-[2rem] overflow-hidden mb-4 md:mb-6 relative">
                      {service.image && (
                        <Image
                          src={service.image}
                          alt={service.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                         
                        />
                      )}
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] md:text-xs font-bold text-brand-dark">
                        {getCategory(service.id)}
                      </div>
                    </div>
                    <div className="px-2 flex-grow flex flex-col">
                      <h3 className="text-lg md:text-xl font-display font-bold text-brand-dark mb-2 md:mb-3 leading-tight group-hover:text-brand-lime transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-gray-500 text-xs md:text-sm leading-relaxed mb-4 md:mb-6 line-clamp-3 flex-grow">
                        {service.description}
                      </p>
                      <div className="space-y-2 mb-6">
                        {service.features.slice(0, 2).map((feature, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs md:text-sm text-gray-600">
                            <Zap size={14} className="text-brand-lime fill-brand-lime shrink-0" />
                            <span className="truncate">{feature}</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-auto flex items-center gap-2 text-xs md:text-sm font-bold text-brand-dark group-hover:gap-3 transition-all">
                        Learn More <ArrowRight size={16} />
                      </div>
                    </div>
                  </div>
                </Link>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ── Portfolio ─────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 px-4 md:px-6 bg-brand-bg">
        <div className="max-w-[1400px] mx-auto">
          <RevealOnScroll variant="left">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4 text-center md:text-left">
              <div className="w-full md:w-auto">
                <span className="text-brand-lime font-bold tracking-wider uppercase text-xs md:text-sm mb-2 block">Portfolio</span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-brand-dark">
                  Selected Work
                </h2>
              </div>
              <Link href="/portfolio" className="text-brand-dark font-bold underline decoration-2 underline-offset-4 hover:text-brand-lime transition-colors mt-4 md:mt-0">
                View All Projects
              </Link>
            </div>
          </RevealOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {featuredPortfolio.map((project, idx) => {
              const Wrapper = project.link ? 'a' : 'div';
              const props = project.link
                ? { href: project.link, target: '_blank', rel: 'noopener noreferrer' }
                : {};
              return (
                <RevealOnScroll key={project.id} delay={idx * 150} variant="up">
                  <Wrapper className="group cursor-pointer block" {...(props as any)}>
                    <div className="relative overflow-hidden rounded-[1.5rem] md:rounded-[2rem] aspect-[4/3] mb-4 md:mb-6 shadow-lg hover:shadow-2xl transition-shadow duration-500">
                      <Image
                        src={project.image}
                        alt={project.client}
                        fill
                        className="object-cover transition-transform duration-1000 group-hover:scale-110"
                       
                      />
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 md:px-4 md:py-2 rounded-full font-bold text-[10px] md:text-xs text-brand-dark shadow-lg">
                        {project.result}
                      </div>
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center text-black scale-0 group-hover:scale-100 transition-transform duration-300">
                          <ArrowUpRight size={24} />
                        </div>
                      </div>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-brand-dark mb-1 flex items-center gap-2">
                      {project.client} {project.link && <ArrowUpRight size={18} className="opacity-50" />}
                    </h3>
                    <p className="text-gray-500 text-sm md:text-base">{project.category}</p>
                  </Wrapper>
                </RevealOnScroll>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Why Us ────────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 px-4 md:px-6 bg-white rounded-[2rem] md:rounded-[3rem] mx-2 lg:mx-6">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <RevealOnScroll variant="scale">
            <div className="relative h-[300px] md:h-[600px] rounded-[2rem] md:rounded-[3rem] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="Scallar IT Solution Team Collaboration"
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
               
              />
            </div>
          </RevealOnScroll>
          <RevealOnScroll delay={200} variant="left">
            <div className="pl-0 lg:pl-10">
              <span className="text-brand-lime font-bold tracking-wider uppercase text-xs md:text-sm mb-2 block">Why Trust Us</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-brand-dark mb-6 md:mb-8 leading-tight">
                We Combine Data <br /> With Design.
              </h2>
              <p className="text-gray-500 text-base md:text-lg mb-8 md:mb-12">
                In a crowded digital landscape, we stand out by diving deep into your business
                model. We don&apos;t just &quot;do marketing&quot;; we build sustainable revenue engines.
              </p>
              <div className="space-y-6 md:space-y-8">
                {[
                  { title: 'Proven ROI Strategies', desc: 'Our campaigns are engineered for profit, not just clicks.' },
                  { title: 'Transparent Reporting', desc: 'You get clear, actionable weekly reports showing exactly where your money goes.' },
                  { title: 'End-to-End Execution', desc: 'From design to code to marketing, we handle the entire lifecycle.' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 md:gap-6 group">
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-brand-bg rounded-2xl flex items-center justify-center text-brand-dark group-hover:bg-brand-lime transition-colors shrink-0">
                      <Check size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-bold text-brand-dark mb-1 md:mb-2">{item.title}</h3>
                      <p className="text-sm md:text-base text-gray-500 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── Founder Quote ─────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 px-4 md:px-6 bg-brand-bg">
        <div className="max-w-5xl mx-auto">
          <RevealOnScroll variant="scale">
            <div className="bg-brand-dark rounded-[2rem] md:rounded-[3rem] p-6 md:p-16 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-brand-lime opacity-10 rounded-full blur-[80px] md:blur-[100px] translate-x-1/2 -translate-y-1/2 animate-pulse-glow" />
              <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center relative z-10">
                <div className="w-28 h-28 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-brand-lime/30 shrink-0 shadow-2xl relative">
                  <Image
                    src={TEAM_MEMBERS[0].image}
                    alt="Deepanshu Kumar Prajapati, Founder of Scallar IT Solution"
                    fill
                    className="object-cover object-top"
                   
                  />
                </div>
                <div className="text-center md:text-left">
                  <Quote size={36} className="text-brand-lime mb-4 md:mb-6 opacity-50 mx-auto md:mx-0" />
                  <h3 className="text-xl md:text-3xl font-display font-bold mb-6 leading-normal">
                    &quot;I started Scallar with a simple mission: to stop businesses from wasting money
                    on &apos;vanity metrics&apos; and start focusing on what matters—Revenue. We treat your
                    business like our own.&quot;
                  </h3>
                  <div>
                    <p className="font-bold text-lg text-brand-lime">Deepanshu Kumar Prajapati</p>
                    <p className="text-white/60 text-sm">Founder, Scallar IT Solution</p>
                  </div>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── Team Carousel ─────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 px-4 md:px-6 bg-white overflow-hidden">
        <div className="max-w-[1400px] mx-auto relative">
          <RevealOnScroll variant="down">
            <div className="text-center mb-10 md:mb-16">
              <span className="text-brand-lime font-bold tracking-wider uppercase text-xs md:text-sm mb-2 block">Our Team</span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-dark">Meet The Experts</h2>
            </div>
          </RevealOnScroll>
          <RevealOnScroll variant="up" delay={200}>
            <div className="relative overflow-hidden -mx-4 px-4 py-4">
              <div
                className="flex transition-transform duration-700"
                style={{ transform: `translateX(-${currentTeamIndex * (isMobile ? 100 : 25)}%)` }}
              >
                {extendedTeam.map((member, idx) => (
                  <div key={`${member.id}-${idx}`} className="w-full md:w-1/4 flex-shrink-0 px-3">
                    <div className="group bg-brand-bg rounded-[2rem] p-4 hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100 h-full flex flex-col">
                      <div className="aspect-[4/5] rounded-[1.5rem] overflow-hidden mb-4 relative">
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                         
                        />
                        <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0 flex justify-between items-end">
                          {member.linkedin && (
                            <a href={member.linkedin} target="_blank" rel="noreferrer" className="bg-brand-lime p-2 rounded-full text-brand-dark shadow-md">
                              <Linkedin size={16} />
                            </a>
                          )}
                        </div>
                      </div>
                      <div className="px-1 text-center">
                        <h3 className="text-lg font-bold text-brand-dark mb-1">{member.name}</h3>
                        <p className="text-brand-lime text-xs font-bold uppercase tracking-wide mb-2">{member.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── Testimonials ──────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 px-4 md:px-6 bg-brand-bg overflow-hidden">
        <div className="max-w-[1400px] mx-auto relative">
          <RevealOnScroll variant="right">
            <div className="flex flex-col md:flex-row justify-between items-end mb-10 md:mb-12 gap-6">
              <div className="max-w-2xl text-center md:text-left">
                <span className="text-brand-lime font-bold tracking-wider uppercase text-xs md:text-sm mb-2 block">Testimonials</span>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-dark mb-4">What our clients say</h2>
                <p className="text-gray-500">Real results from real businesses.</p>
              </div>
              <div className="flex items-center justify-center gap-4 w-full md:w-auto">
                <button
                  onClick={() => setCurrentTestimonialIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
                  aria-label="Previous Testimonial"
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-brand-dark hover:text-white hover:border-brand-dark transition-all bg-white shadow-sm hover:shadow-lg"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={() => setCurrentTestimonialIndex((prev) => (prev + 1) % TESTIMONIALS.length)}
                  aria-label="Next Testimonial"
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-brand-dark hover:text-white hover:border-brand-dark transition-all bg-white shadow-sm hover:shadow-lg"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </RevealOnScroll>
          <div className="relative overflow-hidden -mx-4 px-4 py-4 md:py-8">
            <div
              className="flex transition-transform duration-700"
              style={{ transform: `translateX(-${currentTestimonialIndex * (isMobile ? 100 : 33.333)}%)` }}
            >
              {extendedTestimonials.map((t, idx) => (
                <div key={`${t.id}-${idx}`} className="w-full md:w-1/3 flex-shrink-0 px-2 md:px-4">
                  <div className="bg-white p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] hover:bg-white transition-colors h-full flex flex-col shadow-sm hover:shadow-xl border border-transparent hover:border-gray-100 group">
                    <div className="flex items-center gap-1 text-brand-yellow mb-4 md:mb-6">
                      {[1, 2, 3, 4, 5].map((star) => <Star key={star} size={14} fill="currentColor" />)}
                    </div>
                    <p className="text-brand-dark font-medium leading-relaxed mb-6 md:mb-8 flex-grow text-sm md:text-base">
                      &quot;{t.quote}&quot;
                    </p>
                    <div className="flex items-center gap-4 mt-auto">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden relative bg-gray-200 group-hover:scale-110 transition-transform">
                        <Image src={t.image} alt={t.name} fill className="object-cover" />
                      </div>
                      <div>
                        <h4 className="font-bold text-brand-dark text-xs md:text-sm">{t.name}</h4>
                        <p className="text-[10px] md:text-xs text-gray-500">{t.role}</p>
                      </div>
                    </div>
                    <div className="mt-4 md:mt-6 pt-4 border-t border-gray-100">
                      <p className="text-[10px] md:text-xs font-bold text-brand-lime uppercase tracking-wide">
                        Result: {t.result}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Blog Section — links to /blog ─────────────────────────────────── */}
      <section className="py-16 md:py-24 px-4 md:px-6 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <RevealOnScroll variant="up">
            <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
              <div>
                <span className="text-brand-lime font-bold tracking-wider uppercase text-xs md:text-sm mb-2 block">From the Blog</span>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-dark">
                  Insights & Strategies
                </h2>
              </div>
              <Link href="/blog" className="inline-flex items-center gap-2 font-bold text-brand-dark hover:text-brand-lime transition-colors shrink-0">
                View all posts <ArrowRight size={16} />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { slug: 'seo-tips-2025',              title: 'Top 10 SEO Strategies That Actually Work in 2025',              category: 'SEO',          image: 'https://images.unsplash.com/photo-1571786256017-aee7a0c009b6?auto=format&fit=crop&w=800' },
                { slug: 'whatsapp-automation-business', title: 'How WhatsApp Automation Is Transforming Indian Businesses',      category: 'AI Automation', image: 'https://images.unsplash.com/photo-1611746872915-64382b5c76da?auto=format&fit=crop&w=800' },
                { slug: 'google-ads-guide-2025',       title: 'Google Ads in 2025: Run Profitable Campaigns Without Waste',    category: 'Marketing',    image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=800' },
              ].map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="group bg-brand-bg rounded-[2rem] overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all">
                  <div className="h-48 overflow-hidden relative">
                    <Image src={post.image} alt={post.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                  </div>
                  <div className="p-6">
                    <span className="text-xs font-bold text-brand-lime uppercase tracking-wide">{post.category}</span>
                    <h3 className="font-bold text-brand-dark mt-2 mb-3 group-hover:text-brand-lime transition-colors line-clamp-2 leading-snug">{post.title}</h3>
                    <span className="inline-flex items-center gap-1 text-sm font-bold text-gray-400 group-hover:gap-2 transition-all">Read more <ArrowRight size={13} /></span>
                  </div>
                </Link>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── Industries Section — links to /industries/[niche] ─────────────── */}
      <section className="py-16 md:py-24 px-4 md:px-6 bg-brand-bg">
        <div className="max-w-[1400px] mx-auto">
          <RevealOnScroll variant="up">
            <div className="text-center mb-10">
              <span className="text-brand-lime font-bold tracking-wider uppercase text-xs md:text-sm mb-2 block">Industries We Serve</span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-dark mb-4">
                Tailored Strategies for Every Industry
              </h2>
              <p className="text-gray-500 max-w-2xl mx-auto">
                We don&apos;t do generic. Our strategies are built around the specific challenges and buyer behaviour of your sector.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mb-6">
              {[
                { slug: 'restaurants',  name: 'Restaurants'  },
                { slug: 'healthcare',   name: 'Healthcare'   },
                { slug: 'real-estate',  name: 'Real Estate'  },
                { slug: 'ecommerce',    name: 'E-commerce'   },
                { slug: 'startups',     name: 'Startups'     },
                { slug: 'finance',      name: 'Finance'      },
                { slug: 'hotels',       name: 'Hotels'       },
                { slug: 'fitness',      name: 'Fitness'      },
                { slug: 'technology',   name: 'Technology'   },
                { slug: 'law-firms',    name: 'Law Firms'    },
              ].map((ind) => (
                <Link
                  key={ind.slug}
                  href={`/industries/${ind.slug}`}
                  className="group bg-white rounded-2xl p-4 text-center hover:shadow-lg hover:-translate-y-1 transition-all border border-transparent hover:border-brand-lime/20"
                >
                  <p className="font-bold text-brand-dark text-sm group-hover:text-brand-lime transition-colors">{ind.name}</p>
                </Link>
              ))}
            </div>
            <div className="text-center">
              <Link href="/industries" className="inline-flex items-center gap-2 font-bold text-brand-dark hover:text-brand-lime transition-colors">
                View all 20 industries <ArrowRight size={16} />
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── Cities Section — links to /services/seo/[city] etc ────────────── */}
      <section className="py-16 md:py-20 px-4 md:px-6 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <RevealOnScroll variant="up">
            <div className="text-center mb-10">
              <span className="text-brand-lime font-bold tracking-wider uppercase text-xs md:text-sm mb-2 block">Global Reach</span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-dark mb-4">
                We Serve Businesses Worldwide
              </h2>
              <p className="text-gray-500 max-w-2xl mx-auto">
                From London to Singapore, our digital marketing and AI strategies work across every market.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              {[
                { slug: 'london',        name: 'London'       },
                { slug: 'dubai',         name: 'Dubai'        },
                { slug: 'new-york',      name: 'New York'     },
                { slug: 'singapore',     name: 'Singapore'    },
                { slug: 'toronto',       name: 'Toronto'      },
                { slug: 'sydney',        name: 'Sydney'       },
                { slug: 'noida',         name: 'Noida'        },
                { slug: 'mumbai',        name: 'Mumbai'       },
                { slug: 'bangalore',     name: 'Bangalore'    },
                { slug: 'delhi',         name: 'Delhi'        },
                { slug: 'berlin',        name: 'Berlin'       },
                { slug: 'amsterdam',     name: 'Amsterdam'    },
              ].map((city) => (
                <Link
                  key={city.slug}
                  href={`/services/seo/${city.slug}`}
                  className="px-4 py-2 rounded-full bg-brand-bg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-brand-dark hover:text-white hover:border-brand-dark transition-all"
                >
                  {city.name}
                </Link>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="py-20 md:py-32 px-4 mb-10">
        <RevealOnScroll variant="scale">
          <div className="max-w-[1400px] mx-auto relative overflow-hidden rounded-[3rem] bg-[#050505] text-center shadow-2xl border border-white/10 group isolate transition-transform duration-700 hover:scale-[1.01]">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px]" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#0054D2]/20 rounded-full blur-[120px] pointer-events-none" />
            <div className="relative z-10 px-6 py-20 md:py-28 lg:py-32 flex flex-col items-center">
              <span className="inline-block py-2 px-5 rounded-full bg-white/5 border border-white/10 text-white text-xs md:text-sm font-bold tracking-[0.2em] uppercase mb-8 backdrop-blur-md shadow-lg">
                Start Your Growth Journey
              </span>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-8 leading-[1.05] tracking-tight max-w-5xl">
                Ready to scale your <br />
                <span className="text-white relative inline-block">
                  revenue?
                  <svg className="absolute w-full h-3 -bottom-2 left-0 text-[#0054D2] opacity-80" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                  </svg>
                </span>
              </h2>
              <p className="text-gray-400 text-lg md:text-xl mb-12 max-w-2xl leading-relaxed font-medium">
                Stop guessing with your marketing budget. Join hundreds of fast-growing companies
                using Scallar&apos;s data-driven strategies.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <Link href="/contact">
                  <button className="group relative px-10 py-5 bg-white text-black rounded-full font-bold text-lg md:text-xl overflow-hidden transition-all hover:scale-105 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]">
                    <span className="relative z-10 flex items-center gap-3">
                      Get Your Free Quote <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </button>
                </Link>
                <Link href="/portfolio" className="px-8 py-5 rounded-full border border-white/20 hover:bg-white/10 text-white font-bold text-lg transition-all flex items-center gap-2 group backdrop-blur-sm">
                  View Success Stories <ArrowUpRight size={20} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </section>
    </div>
  );
}
