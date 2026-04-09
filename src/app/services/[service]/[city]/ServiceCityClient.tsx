'use client';

import Link from 'next/link';
import { Check, ArrowRight, MapPin, Phone, Mail } from 'lucide-react';
import Button from '@/components/Button';
import type { Service } from '@/types/types';
import type { City } from '@/data/cities';

interface Props {
  service: Service;
  city: City;
  relatedServices: Service[];
  citySlug: string;
  serviceId: string;
}

export default function ServiceCityClient({
  service,
  city,
  relatedServices,
  citySlug,
  serviceId,
}: Props) {
  return (
    <div className="w-full min-h-screen bg-brand-bg">

      {/* ── Breadcrumb ─────────────────────────────────────────────────── */}
      <div className="pt-24 md:pt-28 px-4 md:px-6">
        <div className="max-w-[1400px] mx-auto">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-brand-dark transition-colors">Home</Link>
            <span>/</span>
            <Link href="/services" className="hover:text-brand-dark transition-colors">Services</Link>
            <span>/</span>
            <Link href={`/services/${serviceId}`} className="hover:text-brand-dark transition-colors">{service.title}</Link>
            <span>/</span>
            <span className="text-brand-dark font-medium">{city.name}</span>
          </nav>
        </div>
      </div>

      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section className="pb-12 md:pb-16 px-4 md:px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <MapPin size={16} className="text-brand-lime" />
                <span className="text-sm font-medium text-gray-500">{city.name}, {city.country}</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-brand-dark mb-4 md:mb-6 leading-tight">
                {service.title} in {city.name}
              </h1>
              <p className="text-gray-500 text-lg md:text-xl leading-relaxed mb-4">
                {service.description}
              </p>
              <p className="text-gray-500 text-base leading-relaxed mb-8">
                Scallar IT Solution delivers expert {service.title.toLowerCase()} to businesses
                in {city.name}, {city.country}. Whether you're a startup or an established brand,
                our data-driven approach ensures measurable results.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/contact">
                  <Button className="rounded-full px-8">Get a Free Consultation</Button>
                </Link>
                <Link href={`/services/${serviceId}`}>
                  <Button variant="outline" className="rounded-full px-8">
                    About {service.title}
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-[2.5rem] overflow-hidden h-[300px] md:h-[480px]">
                <img
                  src={service.image}
                  alt={`${service.title} in ${city.name}`}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Us in This City ────────────────────────────────────────── */}
      <section className="py-16 md:py-24 px-4 md:px-6 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-dark mb-6">
                Why Businesses in {city.name} Choose Scallar
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed mb-8">
                We understand the {city.name} market — its competitive landscape, consumer behaviour,
                and what it takes to stand out. Our {service.title.toLowerCase()} strategies are
                tailored specifically for businesses operating in {city.name}.
              </p>
              <div className="space-y-4">
                {[
                  `Deep understanding of ${city.name}'s business ecosystem`,
                  'Data-driven strategies with transparent reporting',
                  'Dedicated account manager for your region',
                  'Results-focused: we measure revenue, not vanity metrics',
                  '230+ satisfied clients across global markets',
                ].map((point, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-brand-lime/20 flex items-center justify-center shrink-0 mt-0.5">
                      <Check size={14} className="text-brand-dark" />
                    </div>
                    <p className="text-gray-600">{point}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-display font-bold text-brand-dark mb-6">
                What&apos;s Included
              </h3>
              <div className="space-y-3">
                {service.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-4 bg-brand-bg rounded-2xl">
                    <div className="w-7 h-7 rounded-full bg-brand-lime/20 flex items-center justify-center shrink-0">
                      <Check size={14} className="text-brand-dark" />
                    </div>
                    <p className="text-brand-dark font-medium">{feature}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ──────────────────────────────────────────────────────── */}
      <section className="py-16 px-4 md:px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: '230+', label: 'Clients Served Globally' },
              { value: '10+', label: 'Years of Experience' },
              { value: '95%', label: 'Client Retention Rate' },
              { value: '48h', label: 'Average Onboarding Time' },
            ].map((stat, idx) => (
              <div key={idx} className="text-center p-6 bg-white rounded-[2rem] shadow-sm">
                <p className="text-3xl md:text-4xl font-display font-bold text-brand-dark mb-2">{stat.value}</p>
                <p className="text-gray-500 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Related Services (internal linking) ────────────────────────── */}
      <section className="py-16 md:py-20 px-4 md:px-6 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-brand-dark mb-2">
            Other Services in {city.name}
          </h2>
          <p className="text-gray-500 mb-8">
            Explore our full range of digital services available for businesses in {city.name}.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {relatedServices.map((s) => (
              <Link
                key={s.id}
                href={`/services/${s.id}/${citySlug}`}
                className="group p-5 bg-brand-bg rounded-2xl hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <h3 className="font-bold text-brand-dark mb-2 group-hover:text-brand-lime transition-colors">
                  {s.title}
                </h3>
                <p className="text-gray-500 text-sm line-clamp-2 mb-3">{s.description}</p>
                <span className="inline-flex items-center gap-1 text-sm font-bold text-brand-dark">
                  Learn more <ArrowRight size={14} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 px-4 md:px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="bg-brand-dark rounded-[3rem] p-8 md:p-16 text-white">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                  Ready to Grow Your Business in {city.name}?
                </h2>
                <p className="text-gray-400 text-lg mb-6">
                  Get a free audit of your current {service.title.toLowerCase()} strategy and
                  a clear roadmap to results.
                </p>
                <Link href="/contact">
                  <Button className="rounded-full px-8 py-4">
                    Book Free Consultation
                  </Button>
                </Link>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-300">
                  <Phone size={18} className="text-brand-lime shrink-0" />
                  <a href="tel:+918510806031" className="hover:text-white transition-colors">+91 8510806031</a>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Mail size={18} className="text-brand-lime shrink-0" />
                  <a href="mailto:Info@scallar.in" className="hover:text-white transition-colors">Info@scallar.in</a>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <MapPin size={18} className="text-brand-lime shrink-0" />
                  <span>Serving clients in {city.name} & worldwide</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
