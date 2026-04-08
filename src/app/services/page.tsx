'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { SERVICES } from '@/constants/constants';
import { Search, ArrowRight, CheckCircle2, Zap } from 'lucide-react';
import Button from '@/components/Button';

function RevealOnScroll({ children, className = "", delay = 0, variant = 'up' }: { children: React.ReactNode; className?: string; delay?: number; variant?: 'up' | 'down' | 'left' | 'right' | 'scale' }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    );

    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, []);

  const variantClass = { up: 'reveal-up', down: 'reveal-down', left: 'reveal-left', right: 'reveal-right', scale: 'reveal-scale' }[variant];

  return (
    <div ref={ref} className={`reveal-base ${variantClass} ${isVisible ? 'reveal-active' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

export default function ServicesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const getCategory = (id: string) => {
    const marketingIds = ['digital-marketing', 'seo', 'branding', 'content-marketing', 'social-media-marketing', 'ppc-advertising'];
    const developmentIds = ['web-dev', 'app-dev', 'ecommerce-dev', 'ui-ux-design', 'cms-dev', 'api-integration'];
    const automationIds = ['whatsapp-automation', 'email-automation', 'automation-crm', 'ai-voice', 'chatbot-dev', 'data-analytics'];
    const consultingIds = ['consulting', 'startup-mentorship', 'it-strategy', 'digital-transformation', 'market-research', 'brand-strategy'];
    if (marketingIds.includes(id)) return 'Marketing';
    if (developmentIds.includes(id)) return 'Development';
    if (automationIds.includes(id)) return 'Automation & AI';
    if (consultingIds.includes(id)) return 'Consulting';
    return 'Consulting';
  };

  const categories = ['All', 'Marketing', 'Development', 'Automation & AI', 'Consulting'];
  const filteredServices = SERVICES.filter(service => {
    const category = getCategory(service.id);
    const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) || service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredService = SERVICES[0];

  return (
    <div className="w-full min-h-screen bg-brand-bg">
      <section className="pt-28 pb-12 md:pt-32 md:pb-16 px-4 md:px-6">
        <div className="max-w-[1400px] mx-auto">
          <RevealOnScroll variant="up">
            <span className="text-brand-lime font-bold tracking-wider uppercase text-xs md:text-sm mb-2 md:mb-4 block text-center">Our Services</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-brand-dark text-center mb-4 md:mb-6">Comprehensive Digital <br /><span className="text-brand-lime">Solutions</span></h1>
            <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto text-center mb-8 md:mb-12">From strategic branding to AI-powered automation, we provide end-to-end digital solutions tailored to your business goals.</p>
          </RevealOnScroll>

          <div className="max-w-xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input type="text" placeholder="Search services..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-12 pr-4 py-4 rounded-full border border-gray-200 focus:border-brand-lime focus:ring-2 focus:ring-brand-lime/20 outline-none transition-all" />
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map(cat => (
              <button key={cat} onClick={() => setSelectedCategory(cat)} className={`px-6 py-2 rounded-full font-medium transition-all ${selectedCategory === cat ? 'bg-brand-dark text-white' : 'bg-white text-gray-600 hover:bg-brand-dark hover:text-white'}`}>{cat}</button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 px-4 md:px-6 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredServices.map((service, idx) => {
              const category = getCategory(service.id);
              return (
                <RevealOnScroll key={service.id} delay={idx * 100} variant="up">
                  <Link href={`/services/${service.id}`} className="group block h-full">
                    <div className="bg-brand-bg rounded-[2.5rem] p-6 h-full flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                      <div className="h-56 rounded-[2rem] overflow-hidden mb-6 relative">
                        <img src={service.image} alt={service.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-brand-dark">{category}</div>
                      </div>
                      <div className="flex-grow flex flex-col">
                        <h3 className="text-xl font-bold text-brand-dark mb-3 group-hover:text-brand-lime transition-colors">{service.title}</h3>
                        <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3">{service.description}</p>
                        <div className="mt-auto flex items-center gap-2 text-sm font-bold text-brand-dark group-hover:gap-3 transition-all">Learn More <ArrowRight size={16} /></div>
                      </div>
                    </div>
                  </Link>
                </RevealOnScroll>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}