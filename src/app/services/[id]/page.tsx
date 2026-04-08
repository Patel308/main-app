'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { SERVICES } from '@/constants/constants';
import { ArrowRight, Check, ArrowLeft } from 'lucide-react';
import Button from '@/components/Button';

function RevealOnScroll({ children, className = "", delay = 0, variant = 'up' }: { children: React.ReactNode; className?: string; delay?: number; variant?: 'up' | 'down' | 'left' | 'right' | 'scale' }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setIsVisible(true); observer.unobserve(entry.target); }
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    );
    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, []);

  const variantClass = { up: 'reveal-up', down: 'reveal-down', left: 'reveal-left', right: 'reveal-right', scale: 'reveal-scale' }[variant];

  return <div ref={ref} className={`reveal-base ${variantClass} ${isVisible ? 'reveal-active' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

export default function ServiceDetailPage() {
  const params = useParams();
  const serviceId = params?.id as string;
  const service = SERVICES.find(s => s.id === serviceId);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Service Not Found</h1>
          <Link href="/services"><Button>Back to Services</Button></Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-brand-bg">
      <section className="pt-28 pb-12 md:pt-32 md:pb-16 px-4 md:px-6">
        <div className="max-w-[1400px] mx-auto">
          <Link href="/services" className="inline-flex items-center gap-2 text-gray-500 hover:text-brand-dark mb-6"><ArrowLeft size={18} /> Back to Services</Link>
          <RevealOnScroll variant="up">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-brand-dark mb-4 md:mb-6">{service.title}</h1>
                <p className="text-gray-500 text-lg md:text-xl leading-relaxed mb-8">{service.description}</p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/contact"><Button className="rounded-full">Get Started</Button></Link>
                  <Link href="/pricing"><Button variant="outline" className="rounded-full">View Pricing</Button></Link>
                </div>
              </div>
              <div className="relative">
                <div className="rounded-[2.5rem] overflow-hidden h-[300px] md:h-[500px]">
                  <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <section className="py-16 md:py-24 px-4 md:px-6 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <RevealOnScroll variant="up">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-dark text-center mb-12">What's Included</h2>
          </RevealOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.features.map((feature, idx) => (
              <RevealOnScroll key={idx} delay={idx * 100} variant="up">
                <div className="flex items-start gap-4 p-6 bg-brand-bg rounded-2xl">
                  <div className="w-8 h-8 rounded-full bg-brand-lime/20 flex items-center justify-center shrink-0"><Check size={16} className="text-brand-lime" /></div>
                  <p className="text-brand-dark font-medium">{feature}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 px-4 md:px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="bg-brand-dark rounded-[3rem] p-8 md:p-16 text-white text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">Let's discuss how we can help your business grow with {service.title}.</p>
            <Link href="/contact" className="inline-block"><Button className="rounded-full px-8">Book a Consultation</Button></Link>
          </div>
        </div>
      </section>
    </div>
  );
}