'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Check, ArrowRight, MapPin, BookOpen } from 'lucide-react';
import Button from '@/components/Button';
import RevealOnScroll from '@/components/RevealOnScroll';
import type { Service } from '@/types/types';

// Top cities to show on service pages — highest search volume globally
const TOP_CITIES = [
  { slug: 'london',        name: 'London'       },
  { slug: 'dubai',         name: 'Dubai'        },
  { slug: 'new-york',      name: 'New York'     },
  { slug: 'singapore',     name: 'Singapore'    },
  { slug: 'mumbai',        name: 'Mumbai'       },
  { slug: 'sydney',        name: 'Sydney'       },
  { slug: 'toronto',       name: 'Toronto'      },
  { slug: 'noida',         name: 'Noida'        },
  { slug: 'delhi',         name: 'Delhi'        },
  { slug: 'bangalore',     name: 'Bangalore'    },
  { slug: 'manchester',    name: 'Manchester'   },
  { slug: 'berlin',        name: 'Berlin'       },
];

// Industry niches most relevant per service — drives industry → service cross-links
const SERVICE_INDUSTRIES: Record<string, { slug: string; name: string }[]> = {
  'seo':                  [{ slug: 'healthcare',   name: 'Healthcare'   }, { slug: 'real-estate', name: 'Real Estate'  }, { slug: 'ecommerce',    name: 'E-commerce'   }, { slug: 'restaurants',  name: 'Restaurants'  }],
  'digital-marketing':    [{ slug: 'restaurants',  name: 'Restaurants'  }, { slug: 'retail',      name: 'Retail'       }, { slug: 'startups',     name: 'Startups'     }, { slug: 'fitness',      name: 'Fitness'      }],
  'web-dev':              [{ slug: 'healthcare',   name: 'Healthcare'   }, { slug: 'ecommerce',   name: 'E-commerce'   }, { slug: 'startups',     name: 'Startups'     }, { slug: 'technology',   name: 'Technology'   }],
  'whatsapp-automation':  [{ slug: 'restaurants',  name: 'Restaurants'  }, { slug: 'real-estate', name: 'Real Estate'  }, { slug: 'beauty',       name: 'Beauty'       }, { slug: 'fitness',      name: 'Fitness'      }],
  'ai-voice':             [{ slug: 'healthcare',   name: 'Healthcare'   }, { slug: 'automotive',  name: 'Automotive'   }, { slug: 'hotels',       name: 'Hotels'       }, { slug: 'real-estate',  name: 'Real Estate'  }],
  'ppc-advertising':      [{ slug: 'ecommerce',    name: 'E-commerce'   }, { slug: 'real-estate', name: 'Real Estate'  }, { slug: 'finance',      name: 'Finance'      }, { slug: 'technology',   name: 'Technology'   }],
  'social-media-marketing':[{ slug: 'restaurants', name: 'Restaurants'  }, { slug: 'beauty',      name: 'Beauty'       }, { slug: 'fitness',      name: 'Fitness'      }, { slug: 'retail',       name: 'Retail'       }],
  'app-dev':              [{ slug: 'healthcare',   name: 'Healthcare'   }, { slug: 'ecommerce',   name: 'E-commerce'   }, { slug: 'startups',     name: 'Startups'     }, { slug: 'logistics',    name: 'Logistics'    }],
  'branding':             [{ slug: 'startups',     name: 'Startups'     }, { slug: 'retail',      name: 'Retail'       }, { slug: 'beauty',       name: 'Beauty'       }, { slug: 'technology',   name: 'Technology'   }],
  'email-automation':     [{ slug: 'ecommerce',    name: 'E-commerce'   }, { slug: 'education',   name: 'Education'    }, { slug: 'finance',      name: 'Finance'      }, { slug: 'technology',   name: 'Technology'   }],
  'content-marketing':    [{ slug: 'technology',   name: 'Technology'   }, { slug: 'finance',     name: 'Finance'      }, { slug: 'healthcare',   name: 'Healthcare'   }, { slug: 'education',    name: 'Education'    }],
  'ecommerce-dev':        [{ slug: 'retail',       name: 'Retail'       }, { slug: 'beauty',      name: 'Beauty'       }, { slug: 'fashion',      name: 'Fashion'      }, { slug: 'fitness',      name: 'Fitness'      }],
};

// Blog posts relevant to each service
const SERVICE_BLOGS: Record<string, { slug: string; title: string }[]> = {
  'seo':               [{ slug: 'seo-tips-2025',           title: 'Top 10 SEO Strategies That Work in 2025'                }, { slug: 'local-seo-guide-india',   title: 'Complete Local SEO Guide for Businesses'                 }, { slug: 'technical-seo-checklist', title: 'Technical SEO Checklist: 25 Fixes That Boost Rankings'   }],
  'digital-marketing': [{ slug: 'digital-marketing-roi-guide', title: 'How to Measure Digital Marketing ROI'               }, { slug: 'digital-marketing-mistakes', title: '10 Mistakes Killing Your Business Growth'               }, { slug: 'google-ads-guide-2025',   title: 'Google Ads: Run Profitable Campaigns Without Waste'      }],
  'web-dev':           [{ slug: 'why-website-speed-matters',   title: 'Why Website Speed Is Killing Your Business'         }, { slug: 'landing-page-conversion-tips', title: '15 Landing Page Practices That Double Conversion'       }, { slug: 'shopify-vs-woocommerce-2025', title: 'Shopify vs WooCommerce in 2025: Honest Comparison'       }],
  'whatsapp-automation':[{ slug: 'whatsapp-automation-business', title: 'How WhatsApp Automation Is Transforming Businesses' }, { slug: 'whatsapp-automation-case-study', title: 'Case Study: WhatsApp Automation Tripled Lead Response'   }, { slug: 'marketing-automation-guide', title: 'Marketing Automation for Small Businesses: Start Here'    }],
  'ai-voice':          [{ slug: 'ai-voice-agent-guide',         title: 'AI Voice Agents: The Future of Customer Support'   }, { slug: 'chatbot-vs-live-chat',       title: 'AI Chatbot vs Live Chat: Which Is Right?'               }, { slug: 'marketing-automation-guide', title: 'Marketing Automation for Small Businesses'               }],
  'ppc-advertising':   [{ slug: 'google-ads-guide-2025',        title: 'Google Ads: Run Profitable Campaigns'              }, { slug: 'digital-marketing-roi-guide', title: 'How to Measure Digital Marketing ROI'                    }, { slug: 'digital-marketing-mistakes', title: '10 Mistakes Killing Your Business Growth'               }],
  'social-media-marketing':[{ slug: 'social-media-strategy-2025', title: 'Social Media Strategy: What Actually Works'      }, { slug: 'instagram-reels-strategy',   title: 'Instagram Reels: Get More Views and Conversions'        }, { slug: 'email-marketing-2025',       title: 'Email Marketing: How to Get 40%+ Open Rates'           }],
  'branding':          [{ slug: 'brand-identity-guide',          title: 'Building a Brand Identity Customers Remember'      }, { slug: 'digital-marketing-mistakes', title: '10 Mistakes Killing Your Business Growth'               }, { slug: 'social-media-strategy-2025', title: 'Social Media Strategy: What Actually Works'             }],
};

const DEFAULT_INDUSTRIES = [
  { slug: 'startups',   name: 'Startups'   },
  { slug: 'ecommerce',  name: 'E-commerce' },
  { slug: 'healthcare', name: 'Healthcare' },
  { slug: 'retail',     name: 'Retail'     },
];
const DEFAULT_BLOGS = [
  { slug: 'digital-marketing-roi-guide',  title: 'How to Measure Digital Marketing ROI'         },
  { slug: 'digital-marketing-mistakes',   title: '10 Mistakes Killing Your Business Growth'      },
  { slug: 'how-we-doubled-organic-traffic', title: 'Case Study: How We Doubled Organic Traffic' },
];

interface Props {
  service: Service;
}

export default function ServiceDetailClient({ service }: Props) {
  const relatedIndustries = SERVICE_INDUSTRIES[service.id] ?? DEFAULT_INDUSTRIES;
  const relatedBlogs      = SERVICE_BLOGS[service.id]      ?? DEFAULT_BLOGS;

  return (
    <div className="w-full min-h-screen bg-brand-bg">

      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section className="pt-28 pb-12 md:pt-32 md:pb-16 px-4 md:px-6">
        <div className="max-w-[1400px] mx-auto">
          <Link href="/services" className="inline-flex items-center gap-2 text-gray-500 hover:text-brand-dark mb-6">
            <ArrowLeft size={18} /> Back to Services
          </Link>

          <RevealOnScroll variant="up">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-brand-dark mb-4 md:mb-6">
                  {service.title}
                </h1>
                <p className="text-gray-500 text-lg md:text-xl leading-relaxed mb-8">
                  {service.description}
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/contact">
                    <Button className="rounded-full">Get Started</Button>
                  </Link>
                  <Link href="/pricing">
                    <Button variant="outline" className="rounded-full">View Pricing</Button>
                  </Link>
                </div>
              </div>
              <div className="relative">
                <div className="rounded-[2.5rem] overflow-hidden h-[300px] md:h-[500px] relative">
                  <Image
                    src={service.image ?? 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800'}
                    alt={service.title}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── Features ───────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 px-4 md:px-6 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <RevealOnScroll variant="up">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-dark text-center mb-12">
              What&apos;s Included
            </h2>
          </RevealOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.features.map((feature, idx) => (
              <RevealOnScroll key={idx} delay={idx * 100} variant="up">
                <div className="flex items-start gap-4 p-6 bg-brand-bg rounded-2xl">
                  <div className="w-8 h-8 rounded-full bg-brand-lime/20 flex items-center justify-center shrink-0">
                    <Check size={16} className="text-brand-lime" />
                  </div>
                  <p className="text-brand-dark font-medium">{feature}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ── City Pages — internal links to /services/[id]/[city] ──────────── */}
      <section className="py-16 md:py-20 px-4 md:px-6">
        <div className="max-w-[1400px] mx-auto">
          <RevealOnScroll variant="up">
            <div className="flex items-center gap-3 mb-3">
              <MapPin size={20} className="text-brand-lime" />
              <h2 className="text-2xl md:text-3xl font-display font-bold text-brand-dark">
                {service.title} — By City
              </h2>
            </div>
            <p className="text-gray-500 mb-8">
              We deliver {service.title.toLowerCase()} to businesses across major global cities.
              Find your city below for a tailored local strategy.
            </p>
            <div className="flex flex-wrap gap-3">
              {TOP_CITIES.map((city) => (
                <Link
                  key={city.slug}
                  href={`/services/${service.id}/${city.slug}`}
                  className="px-5 py-2.5 rounded-full bg-white border border-gray-200 text-sm font-medium text-gray-600 hover:bg-brand-dark hover:text-white hover:border-brand-dark transition-all hover:shadow-md"
                >
                  {service.title.split(' ')[0]} in {city.name}
                </Link>
              ))}
              <Link
                href="/contact"
                className="px-5 py-2.5 rounded-full bg-brand-lime text-brand-dark text-sm font-bold hover:bg-brand-dark hover:text-white transition-all"
              >
                My city isn&apos;t listed →
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── Industries We Serve — links to /industries/[niche] ────────────── */}
      <section className="py-16 md:py-20 px-4 md:px-6 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <RevealOnScroll variant="up">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-brand-dark mb-2">
              {service.title} for Specific Industries
            </h2>
            <p className="text-gray-500 mb-8">
              We tailor our {service.title.toLowerCase()} strategies to the unique needs of each industry.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedIndustries.map((industry) => (
                <Link
                  key={industry.slug}
                  href={`/industries/${industry.slug}`}
                  className="group p-5 bg-brand-bg rounded-2xl hover:shadow-lg hover:-translate-y-1 transition-all text-center"
                >
                  <p className="font-bold text-brand-dark group-hover:text-brand-lime transition-colors mb-1">
                    {industry.name}
                  </p>
                  <p className="text-xs text-gray-500 group-hover:text-gray-600">
                    {service.title.split(' ')[0]} for {industry.name}
                  </p>
                </Link>
              ))}
            </div>
            <div className="mt-4">
              <Link href="/industries" className="inline-flex items-center gap-1 text-sm font-bold text-brand-dark hover:text-brand-lime transition-colors">
                View all industries <ArrowRight size={14} />
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── Related Blog Posts — links to /blog/[slug] ─────────────────────── */}
      <section className="py-16 md:py-20 px-4 md:px-6">
        <div className="max-w-[1400px] mx-auto">
          <RevealOnScroll variant="up">
            <div className="flex items-center gap-3 mb-3">
              <BookOpen size={20} className="text-brand-lime" />
              <h2 className="text-2xl md:text-3xl font-display font-bold text-brand-dark">
                Learn More About {service.title}
              </h2>
            </div>
            <p className="text-gray-500 mb-8">
              Guides, strategies, and case studies on {service.title.toLowerCase()} from our team.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedBlogs.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group p-6 bg-white rounded-2xl border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all"
                >
                  <p className="text-xs font-bold text-brand-lime uppercase tracking-wide mb-2">Blog</p>
                  <h3 className="font-bold text-brand-dark group-hover:text-brand-lime transition-colors leading-snug mb-3">
                    {post.title}
                  </h3>
                  <span className="inline-flex items-center gap-1 text-sm font-bold text-gray-400 group-hover:gap-2 transition-all">
                    Read article <ArrowRight size={13} />
                  </span>
                </Link>
              ))}
            </div>
            <div className="mt-4">
              <Link href="/blog" className="inline-flex items-center gap-1 text-sm font-bold text-brand-dark hover:text-brand-lime transition-colors">
                View all blog posts <ArrowRight size={14} />
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 px-4 md:px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="bg-brand-dark rounded-[3rem] p-8 md:p-16 text-white text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
              Let&apos;s discuss how we can help your business grow with {service.title}.
            </p>
            <Link href="/contact" className="inline-block">
              <Button className="rounded-full px-8">Book a Consultation</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
