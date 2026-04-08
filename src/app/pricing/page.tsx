'use client';

import { Check, X } from 'lucide-react';
import Link from 'next/link';
import Button from '@/components/Button';

const PLANS = [
  { name: "Startup", tagline: "Ideal for beginners", price: "₹19,999", originalPrice: "₹35,000", discount: "45% OFF", features: ["Social Media Management (2 Platforms)", "Basic SEO Setup", "5 Graphic Designs/mo", "Monthly Performance Report", "Email Support"], missing: ["Ads Management", "AI Automation", "24/7 Support"], isPopular: false },
  { name: "Growth", tagline: "Everything you need to scale", price: "₹39,999", originalPrice: "₹75,000", discount: "50% OFF", features: ["Social Media (4 Platforms)", "Advanced SEO & Backlinking", "Google & Meta Ads Management", "10 Graphic Designs + 2 Reels/mo", "Bi-Weekly Strategy Calls"], missing: ["AI Chatbot Integration", "Custom CRM Setup"], isPopular: true },
  { name: "Business", tagline: "For aggressive expansion", price: "₹69,999", originalPrice: "₹1,20,000", discount: "40% OFF", features: ["Omnichannel Marketing Strategy", "Full AI Automation Suite", "Unlimited Graphic Design", "Video Editing (4 Reels/mo)", "Custom CRM & Lead Scoring", "Dedicated Account Manager"], missing: [], isPopular: false },
  { name: "Enterprise", tagline: "Custom solution for large orgs", price: "Custom", originalPrice: null, discount: null, features: ["Full Digital Transformation", "Custom App/Web Development", "Dedicated Dev & Marketing Team", "24/7 Priority Support", "White-label Services"], missing: [], isPopular: false }
];

export default function PricingPage() {
  return (
    <div className="w-full min-h-screen bg-brand-bg pt-24 md:pt-32 pb-20">
      <section className="px-4 md:px-6 mb-16">
        <div className="max-w-[1400px] mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-brand-dark mb-4">Simple, Transparent <span className="text-brand-lime">Pricing</span></h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">Choose the perfect plan for your business growth. All plans include dedicated support.</p>
        </div>
      </section>

      <section className="px-4 md:px-6">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PLANS.map((plan, idx) => (
            <div key={idx} className={`bg-white rounded-[2.5rem] p-6 md:p-8 flex flex-col ${plan.isPopular ? 'ring-2 ring-brand-lime shadow-2xl scale-105' : 'shadow-lg'} relative`}>
              {plan.isPopular && <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-lime text-white px-4 py-1 rounded-full text-sm font-bold">Most Popular</div>}
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-brand-dark mb-2">{plan.name}</h3>
                <p className="text-gray-500 text-sm">{plan.tagline}</p>
              </div>
              <div className="text-center mb-6">
                <div className="flex items-center justify-center gap-2">
                  {plan.originalPrice && <span className="text-gray-400 line-through">{plan.originalPrice}</span>}
                  <span className="text-4xl font-bold text-brand-dark">{plan.price}</span>
                </div>
                {plan.discount && <span className="inline-block mt-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">{plan.discount}</span>}
              </div>
              <div className="flex-grow space-y-3 mb-6">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-2"><Check size={16} className="text-green-500 shrink-0" /><span className="text-sm text-gray-600">{feature}</span></div>
                ))}
                {plan.missing.map((feature, i) => (
                  <div key={i} className="flex items-center gap-2"><X size={16} className="text-gray-300 shrink-0" /><span className="text-sm text-gray-400">{feature}</span></div>
                ))}
              </div>
              <Link href="/contact"><Button className="w-full rounded-full" variant={plan.isPopular ? 'brand' : 'outline'}>Get Started</Button></Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}