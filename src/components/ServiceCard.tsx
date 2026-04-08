'use client';

import { useEffect, useState, useRef } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Service } from '@/types/types';
import Link from 'next/link';

interface ServiceCardProps {
  service: Service;
  variant?: 'lime' | 'dark' | 'yellow';
}

export default function ServiceCard({ service, variant = 'dark' }: ServiceCardProps) {
  const [isHighlighted, setIsHighlighted] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const isLime = variant === 'lime';
  const isYellow = variant === 'yellow';
  
  const bgClass = isLime ? 'bg-brand-lime' : isYellow ? 'bg-brand-yellow' : 'bg-brand-card';
  const textClass = (isLime || isYellow) ? 'text-brand-dark' : 'text-white';
  const subTextClass = (isLime || isYellow) ? 'text-brand-dark/80' : 'text-gray-400';
  const borderClass = (isLime || isYellow) ? 'border-transparent' : 'border-white/5';

  useEffect(() => {
    const handleHighlight = (event: Event) => {
        const customEvent = event as CustomEvent;
        if (customEvent.detail.id === service.id) {
            setIsHighlighted(true);
            cardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            setTimeout(() => setIsHighlighted(false), 5000);
        }
    };

    window.addEventListener('highlight-service', handleHighlight);
    return () => window.removeEventListener('highlight-service', handleHighlight);
  }, [service.id]);

  return (
    <div 
        ref={cardRef}
        id={`service-${service.id}`}
        className={`group relative rounded-[2.5rem] p-4 ${bgClass} ${textClass} border ${borderClass} transition-all duration-500 hover:-translate-y-2 h-full flex flex-col overflow-hidden ${isHighlighted ? 'ring-4 ring-blue-500 scale-[1.02] shadow-2xl z-10' : ''}`}
    >
      <div className="h-48 w-full rounded-[2rem] overflow-hidden relative mb-6">
        <img 
            src={service.image} 
            alt={service.title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      
      <div className="px-4 pb-6 flex-grow flex flex-col">
          <h3 className="text-2xl font-display font-bold mb-3 leading-tight">
              {service.title}
          </h3>
          
          <p className={`${subTextClass} text-sm leading-relaxed mb-6 line-clamp-3`}>
            {service.description}
          </p>

          <div className="mt-auto space-y-4">
              <Link href={`/services/${service.id}`} className="inline-flex items-center gap-2 text-sm font-bold border-b border-current pb-0.5 hover:opacity-70 transition-opacity">
                Learn more <ArrowRight size={16} />
              </Link>
          </div>
      </div>

      <div className={`absolute inset-0 ${bgClass} p-8 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out z-10 flex flex-col`}>
          <h4 className="font-bold text-lg mb-4">Includes:</h4>
          <ul className="space-y-2 overflow-y-auto scrollbar-hide flex-grow">
              {service.features.slice(0, 5).map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 size={16} className="shrink-0 mt-0.5 opacity-70" />
                      <span>{feature}</span>
                  </li>
              ))}
              {service.features.length > 5 && <li className="text-xs opacity-60 italic">+ more</li>}
          </ul>
          <Link href={`/services/${service.id}`} className="mt-4 w-full py-3 bg-black/10 rounded-xl flex items-center justify-center font-bold text-sm hover:bg-black/20 transition-colors">
              View Details
          </Link>
      </div>
    </div>
  );
}