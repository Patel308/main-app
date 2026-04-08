'use client';

import { PORTFOLIO } from '@/constants';
import { ArrowUpRight } from 'lucide-react';

export default function PortfolioPage() {
  return (
    <div className="pt-24 md:pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12 md:mb-16">
          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">Our Projects</h1>
          <p className="text-base md:text-lg text-slate-600">A showcase of our most recent collaborations and the results we achieved.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {PORTFOLIO.map((item) => {
            const Wrapper = item.link ? 'a' : 'div';
            const props = item.link ? { href: item.link, target: "_blank", rel: "noopener noreferrer" } : {};
            return (
              <Wrapper key={item.id} className="group cursor-pointer block" {...props}>
                <div className="relative overflow-hidden rounded-2xl aspect-[4/3] mb-4">
                  <img src={item.image} alt={item.client} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                    <ArrowUpRight size={20} className="text-slate-900" />
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-xs md:text-sm font-semibold text-blue-600 uppercase tracking-wide">{item.category}</p>
                  <h3 className="text-lg md:text-xl font-bold text-slate-900 flex items-center gap-2">{item.client} {item.link && <ArrowUpRight size={14} className="opacity-50" />}</h3>
                  <p className="text-slate-500 text-sm line-clamp-2">{item.description}</p>
                  <div className="mt-2 inline-block px-2 py-1 bg-green-100 text-green-700 text-[10px] md:text-xs font-bold rounded">{item.result}</div>
                </div>
              </Wrapper>
            );
          })}
        </div>
      </div>
    </div>
  );
}