'use client';

import { useState } from 'react';
import Link from 'next/link';
import { RESOURCES } from '@/constants';
import { Search, ArrowRight, Tag, Clock } from 'lucide-react';

export default function ResourcesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const categories = ['All', ...Array.from(new Set(RESOURCES.map(r => r.category)))];
  const filteredResources = RESOURCES.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) || resource.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || resource.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="w-full min-h-screen bg-brand-bg">
      <section className="pt-28 pb-12 md:pt-32 md:pb-16 px-4 md:px-6">
        <div className="max-w-[1400px] mx-auto text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-brand-lime/20 text-brand-dark text-xs md:text-sm font-bold tracking-wide uppercase mb-4">Blog</span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-brand-dark mb-6 tracking-tight">Our Blog</h1>
          <p className="text-lg md:text-xl text-brand-dark/60 max-w-2xl mx-auto mb-10 md:mb-12 px-4">Deep dives into digital strategy, automation, and design to help you stay ahead of the curve.</p>
          <div className="max-w-xl mx-auto relative mb-10 md:mb-16">
            <input type="text" placeholder="Search articles, guides..." className="w-full px-5 py-3 md:px-6 md:py-4 rounded-full bg-white border-2 border-transparent focus:border-brand-dark focus:outline-none shadow-lg text-base md:text-lg pl-12 md:pl-14 transition-all" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            <Search className="absolute left-4 md:left-5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          </div>
          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            {categories.map(cat => (
              <button key={cat} onClick={() => setSelectedCategory(cat)} className={`px-6 py-2 rounded-full font-medium transition-all ${selectedCategory === cat ? 'bg-brand-dark text-white' : 'bg-white text-gray-600 hover:bg-brand-dark hover:text-white'}`}>{cat}</button>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 md:px-6 pb-20">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredResources.map((resource) => (
              <div key={resource.id} className="group bg-white rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2">
                <div className="h-56 overflow-hidden">
                  <img src={resource.image} alt={resource.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-bold text-brand-lime uppercase tracking-wide">{resource.category}</span>
                    <span className="text-gray-300">•</span>
                    <span className="text-xs text-gray-400 flex items-center gap-1"><Clock size={12} /> {resource.date}</span>
                  </div>
                  <h3 className="text-xl font-bold text-brand-dark mb-3 group-hover:text-brand-lime transition-colors">{resource.title}</h3>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2">{resource.excerpt}</p>
                  <Link href="#" className="inline-flex items-center gap-2 text-sm font-bold text-brand-dark group-hover:gap-3 transition-all">Read More <ArrowRight size={16} /></Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}