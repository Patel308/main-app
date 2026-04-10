
import { Service, CaseStudy, BookingSlot, Resource, TeamMember } from '../types/types';
export const NAV_LINKS = [
  { name: 'Home',       path: '/'           },
  { name: 'Services',   path: '/services'   },
  { name: 'Industries', path: '/industries' },
  { name: 'Blog',       path: '/blog'       },
  { name: 'Pricing',    path: '/pricing'    },
  { name: 'Team',       path: '/team'       },
  { name: 'Project',    path: '/portfolio'  },
  { name: 'Contact',    path: '/contact'    },
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: "Rohan Mehta",
    role: "Founder, Urban Retail",
    image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200",
    quote: "Scallar didn't just build a website; they built a sales engine. We saw our organic traffic double within 3 months of launch.",
    result: "200% Growth"
  },
  {
    id: 2,
    name: "Sarah Jenkins",
    role: "Marketing Head, FinTech Corp",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200",
    quote: "The AI automation strategies they implemented saved our team 20 hours a week. Truly transformative for our workflow.",
    result: "20hrs/week Saved"
  },
  {
    id: 3,
    name: "Amit Patel",
    role: "CEO, HealthPlus",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200",
    quote: "Their design team has an incredible eye for detail. Our rebranding campaign got us featured in top industry magazines.",
    result: "Brand Award Winner"
  },
  {
    id: 4,
    name: "Priya Sharma",
    role: "Director, EdTech Solutions",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200",
    quote: "The lead generation campaign delivered 500+ qualified leads in the first month. Incredible ROI.",
    result: "500+ Leads"
  },
  {
    id: 5,
    name: "James Wilson",
    role: "CTO, LogiTech",
    image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=200",
    quote: "Their web development team built a robust, scalable platform that handles our massive traffic spikes effortlessly.",
    result: "99.9% Uptime"
  },
  {
    id: 6,
    name: "Anita Roy",
    role: "Owner, Roy Interiors",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200",
    quote: "Social media engagement skyrocketed. Scallar truly understands how to build a community around a brand.",
    result: "300% Engagement"
  },
  {
    id: 7,
    name: "Arjun Singh",
    role: "CTO, TechFlow",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200",
    quote: "The cloud migration strategy was flawless. Zero downtime and improved performance across the board.",
    result: "Zero Downtime"
  },
  {
    id: 8,
    name: "Meera Reddy",
    role: "Marketing Director, StyleHub",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200",
    quote: "Our ROI on Instagram ads went up by 150% in just two months. The creative team is top-notch.",
    result: "150% ROI"
  },
  {
    id: 9,
    name: "Vikram Malhotra",
    role: "CEO, AutoDrive",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200",
    quote: "The lead management CRM they built has streamlined our entire sales process. Highly recommended.",
    result: "2x Sales Efficiency"
  }
];

export const SERVICES: Service[] = [
  // --- MARKETING (6 Items) ---
  {
    id: 'digital-marketing',
    title: 'Digital Marketing Services',
    description: 'Comprehensive performance marketing strategies to dominate your market.',
    icon: 'Megaphone',
    image: 'https://images.unsplash.com/photo-1557838923-2985c318be48?auto=format&fit=crop&w=800',
    features: [
      'Google Ads (Search, Display, Video)',
      'Facebook & Instagram Ads',
      'Lead Generation Campaigns',
      'Social Media Marketing',
      'Retargeting / Remarketing Ads'
    ],
  },
  {
    id: 'seo',
    title: 'SEO Optimization',
    description: 'Drive organic traffic and rank higher on search engines with proven strategies.',
    icon: 'Search',
    image: 'https://images.unsplash.com/photo-1560472355-536de3962603?auto=format&fit=crop&w=800',
    features: [
      'On-Page SEO',
      'Off-Page SEO',
      'Technical SEO',
      'Local SEO',
      'Keyword Ranking Optimization'
    ],
  },
  {
    id: 'branding',
    title: 'Branding & Design',
    description: 'Create a lasting impact with world-class design and creative assets.',
    icon: 'PenTool',
    image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&w=800',
    features: [
      'Logo design',
      'Brand identity design',
      'Marketing creatives',
      'Ad creatives',
      'Social media posts',
      'Short video editing for ads'
    ],
  },
  {
    id: 'content-marketing',
    title: 'Content Marketing',
    description: 'Strategic content creation that drives traffic, engagement, and conversions.',
    icon: 'FileText',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800',
    features: [
      'Blog Writing & Strategy',
      'Video Scriptwriting',
      'Whitepapers & E-books',
      'Copywriting',
      'Email Newsletter Content'
    ]
  },
  {
    id: 'social-media-marketing',
    title: 'Social Media Management',
    description: 'Build a loyal community and increase brand awareness on all major platforms.',
    icon: 'Share2',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800',
    features: [
      'Content Calendar Planning',
      'Community Management',
      'Influencer Marketing',
      'Analytics Reporting',
      'Organic Growth Strategy'
    ]
  },
  {
    id: 'ppc-advertising',
    title: 'PPC Advertising',
    description: 'Maximize your ROI with targeted Pay-Per-Click campaigns across search and display networks.',
    icon: 'MousePointerClick',
    image: 'https://images.unsplash.com/photo-1599658880436-c61792e70672?auto=format&fit=crop&w=800',
    features: [
      'Google Search Ads',
      'Display Advertising',
      'Shopping Ads',
      'A/B Testing',
      'Conversion Tracking Setup'
    ]
  },

  // --- DEVELOPMENT (6 Items) ---
  {
    id: 'web-dev',
    title: 'Website Development',
    description: 'Custom, high-performance websites tailored to your specific business needs.',
    icon: 'Monitor',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800',
    features: [
      'Business Websites',
      'E-commerce Stores',
      'Landing Page Development',
      'Portfolio Websites',
      'Custom CRM/Portal Development'
    ],
  },
  {
    id: 'app-dev',
    title: 'App Development',
    description: 'Native and cross-platform mobile applications for iOS and Android.',
    icon: 'Smartphone',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800',
    features: [
      'iOS App Development',
      'Android App Development',
      'Flutter / React Native',
      'App Store Optimization',
      'UI/UX Design for Mobile'
    ],
  },
  {
    id: 'ecommerce-dev',
    title: 'E-commerce Solutions',
    description: 'Scalable online stores built on Shopify, WooCommerce, or custom stacks to maximize sales.',
    icon: 'ShoppingCart',
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800',
    features: [
      'Shopify & WooCommerce',
      'Custom Cart Development',
      'Payment Gateway Setup',
      'Inventory Management',
      'Mobile Commerce Optimization'
    ]
  },
  {
    id: 'ui-ux-design',
    title: 'UI/UX Design',
    description: 'User-centric designs that ensure intuitive navigation and exceptional digital experiences.',
    icon: 'Layout',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800',
    features: [
      'Wireframing',
      'Interactive Prototyping',
      'User Research',
      'Mobile App Design',
      'Web Interface Design'
    ]
  },
  {
    id: 'cms-dev',
    title: 'CMS Development',
    description: 'Flexible content management systems tailored to your specific workflow requirements.',
    icon: 'Database',
    image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=800',
    features: [
      'Custom WordPress Themes',
      'Plugin Development',
      'CMS Migration',
      'Headless CMS Setup',
      'Maintenance & Support'
    ]
  },
  {
    id: 'api-integration',
    title: 'API Integration',
    description: 'Seamlessly connect third-party services to your applications for unified operations.',
    icon: 'Server',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800',
    features: [
      'REST API Development',
      'GraphQL Implementation',
      'Third-party Integrations',
      'Secure Data Sync',
      'Custom API Architecture'
    ]
  },

  // --- AUTOMATION & AI (6 Items) ---
  {
    id: 'whatsapp-automation',
    title: 'WhatsApp Automation',
    description: 'Automate customer interactions and sales directly through WhatsApp.',
    icon: 'MessageCircle',
    image: 'https://images.unsplash.com/photo-1611746872915-64382b5c76da?auto=format&fit=crop&w=800',
    features: [
      'WhatsApp API setup',
      'WhatsApp Chatbot',
      'Broadcast Campaigns',
      'Automated Lead Capture',
      'CRM WhatsApp integration'
    ],
  },
  {
    id: 'email-automation',
    title: 'Email Automation',
    description: 'Nurture leads and increase conversions with intelligent email flows.',
    icon: 'Mail',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800',
    features: [
      'Drip campaign setup',
      'Lead nurturing',
      'Cold email setup',
      'Auto follow-up flows',
      'Bulk email marketing'
    ],
  },
  {
    id: 'ai-voice',
    title: 'AI Voice Agent',
    description: 'Next-gen AI agents for 24/7 support, sales, and booking.',
    icon: 'Mic',
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=800',
    features: [
      'Website Voice Assistant',
      'AI Sales Agent',
      'AI Appointment Booking',
      'Lead Qualification AI',
      'Multilingual AI bots'
    ],
  },
  {
    id: 'automation-crm',
    title: 'Automation & CRM',
    description: 'Streamline your operations with powerful integrations and workflows.',
    icon: 'Workflow',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800',
    features: [
      'Zapier, Make.com automations',
      'Lead routing systems',
      'Google Calendar automation',
      'Funnel automation',
      'CRM Integration'
    ],
  },
  {
    id: 'chatbot-dev',
    title: 'Custom Chatbot Dev',
    description: 'Intelligent conversational agents to automate support and sales on your website.',
    icon: 'MessageSquare',
    image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=800',
    features: [
      'NLP Integration',
      'Multi-platform Support',
      'Lead Qualification',
      '24/7 Support Automation',
      'Custom Conversation Flows'
    ]
  },
  {
    id: 'data-analytics',
    title: 'Data Analytics & AI',
    description: 'Transform raw data into actionable business intelligence using advanced AI analytics.',
    icon: 'BarChart',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800',
    features: [
      'Predictive Analytics',
      'Data Visualization Dashboards',
      'Business Intelligence',
      'Customer Behavior Insights',
      'Performance Tracking'
    ]
  },

  // --- CONSULTING (6 Items) ---
  {
    id: 'consulting',
    title: 'Business Consulting',
    description: 'Strategic guidance to help you scale your operations and revenue.',
    icon: 'Briefcase',
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800',
    features: [
      'Digital Transformation',
      'Growth Strategy',
      'Process Optimization',
      'Market Research',
      'Tech Stack Consulting'
    ],
  },
  {
    id: 'startup-mentorship',
    title: 'Startup Mentorship',
    description: 'Expert guidance for early-stage ventures to navigate growth challenges and scaling.',
    icon: 'Rocket',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800',
    features: [
      'Business Model Planning',
      'Pitch Deck Review',
      'Go-to-Market Strategy',
      'Fundraising Advice',
      'Product-Market Fit'
    ]
  },
  {
    id: 'it-strategy',
    title: 'IT Strategy Consulting',
    description: 'Align your technology infrastructure and roadmap with your long-term business objectives.',
    icon: 'Cpu',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800',
    features: [
      'Tech Stack Audit',
      'Digital Roadmap Planning',
      'Risk Assessment',
      'Security Compliance',
      'Cloud Infrastructure Strategy'
    ]
  },
  {
    id: 'digital-transformation',
    title: 'Digital Transformation',
    description: 'Modernize legacy systems and processes to thrive in the digital age.',
    icon: 'Globe',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800',
    features: [
      'Process Automation',
      'Cloud Migration',
      'Change Management',
      'Digital Training',
      'Innovation Workshops'
    ]
  },
  {
    id: 'market-research',
    title: 'Market Research',
    description: 'Data-driven insights to validate ideas and understand your competition deeply.',
    icon: 'PieChart',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800',
    features: [
      'Competitor Analysis',
      'Customer Surveys',
      'Trend Forecasting',
      'Product Validation',
      'Market Sizing'
    ]
  },
  {
    id: 'brand-strategy',
    title: 'Brand Strategy',
    description: 'Define who you are, your voice, and why you matter in the crowded marketplace.',
    icon: 'Target',
    image: 'https://images.unsplash.com/photo-1434626881859-194d67b2b86f?auto=format&fit=crop&w=800',
    features: [
      'Brand Positioning',
      'Voice & Tone Guidelines',
      'Visual Identity System',
      'Brand Architecture',
      'Rebranding Strategy'
    ]
  }
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 't1',
    name: 'Deepanshu Kumar Prajapati',
    role: 'Founder & CEO',
    image: '/founder.png',
    bio: 'Visionary leader with 10+ years in digital transformation. Passionate about helping businesses scale through technology.',
    linkedin: '#'
  },
  {
    id: 't2',
    name: 'Aisha Verma',
    role: 'Head of Digital Marketing',
    image: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=600',
    bio: 'Expert strategist who has managed ad spends over ₹5Cr. Specializes in high-ROI PPC and social media campaigns.',
    linkedin: '#'
  },
  {
    id: 't3',
    name: 'Kamlesh Gupta',
    role: 'Full Stack Developer',
    image: 'https://images.unsplash.com/photo-1595152772835-219674b2a8a6?auto=format&fit=crop&w=600',
    bio: 'Full-stack wizard responsible for the robust and scalable architecture behind our client solutions.',
    linkedin: '#'
  },
  {
    id: 't7',
    name: 'Deepesh Patel',
    role: 'Senior Full Stack Developer',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600',
    bio: 'Specialist in MERN stack and cloud architecture. Builds scalable backend systems for high-traffic applications.',
    linkedin: '#'
  },
  {
    id: 't8',
    name: 'Rohan Deshmukh',
    role: 'Backend Lead',
    image: 'https://images.unsplash.com/photo-1480455624313-e29b44bbfde1?auto=format&fit=crop&w=600',
    bio: 'Expert in database optimization and API security. Ensures 99.9% uptime for all client applications.',
    linkedin: '#'
  },
  {
    id: 't4',
    name: 'Priya Singh',
    role: 'Creative Director',
    image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=600',
    bio: 'Award-winning designer with an eye for aesthetics. She ensures every pixel serves the brand narrative.',
    linkedin: '#'
  },
  {
    id: 't5',
    name: 'Vikram Malhotra',
    role: 'SEO Specialist',
    image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=600',
    bio: 'Master of algorithms. Helping clients rank #1 on Google through white-hat technical and content SEO.',
    linkedin: '#'
  },
  {
    id: 't6',
    name: 'Neha Kapoor',
    role: 'Client Success Manager',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=600',
    bio: 'Dedicated to client happiness. She ensures smooth communication and timely delivery of all projects.',
    linkedin: '#'
  }
];

export const MOCK_SLOTS: BookingSlot[] = [
  { id: 's1', date: new Date(Date.now() + 86400000).toISOString(), time: '10:00 AM', available: true },
  { id: 's2', date: new Date(Date.now() + 86400000).toISOString(), time: '02:00 PM', available: true },
  { id: 's3', date: new Date(Date.now() + 172800000).toISOString(), time: '11:00 AM', available: true },
];

export const PORTFOLIO: CaseStudy[] = [
  {
    id: 'p8',
    client: 'Hoarding Booking App',
    category: 'Web Application',
    image: 'https://images.unsplash.com/photo-1562577309-4932fdd64cd1?auto=format&fit=crop&w=800',
    result: 'Real-time Inventory',
    description: 'A comprehensive platform for browsing and booking outdoor advertising spaces with map integration.',
    link: 'https://hoarding-hd9a.vercel.app/'
  },
  {
    id: 'p10',
    client: 'Prescripto',
    category: 'Healthcare App',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800',
    result: '5k+ Bookings',
    description: 'A doctor appointment booking platform with specialty filtering and profile management.',
    link: 'https://prescripto-8ni8.vercel.app/'
  },
  {
    id: 'p11',
    client: 'QuickBite',
    category: 'Food Delivery',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800',
    result: '30min Delivery',
    description: 'A full-stack food delivery application with cart management and order tracking.',
    link: 'https://quick-bite-two.vercel.app/'
  },
  {
    id: 'p9',
    client: 'Dayal Hospitals',
    category: 'Healthcare Website',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800',
    result: 'Patient Trust',
    description: 'A modern healthcare portal allowing patients to easily find doctors, book appointments, and access services.',
    link: 'http://dayalhospitals.com/'
  },
  {
    id: 'p7',
    client: 'Inflate Agency',
    category: 'Web Design & Development',
    image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=800',
    result: 'Site of the Day',
    description: 'A visually immersive digital agency website featuring fluid animations and high-performance React architecture.',
    link: 'https://www.inflate.agency/'
  },
  {
    id: 'p12',
    client: 'Forever',
    category: 'E-commerce',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800',
    result: '150% Sales Boost',
    description: 'A modern fashion e-commerce store with category filtering and cart functionality.',
    link: 'https://forever-buy.vercel.app/'
  },
  {
    id: 'p1',
    client: 'TechNova',
    category: 'Web Development',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800',
    result: '40% Conversion Lift',
    description: 'A complete overhaul of their corporate website focusing on speed and lead generation.',
  },
  {
    id: 'p2',
    client: 'GreenEarth',
    category: 'Branding',
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800',
    result: 'Brand of the Year',
    description: 'Comprehensive brand identity design including logo, guidelines, and packaging.',
  },
  {
    id: 'p3',
    client: 'UrbanStyle',
    category: 'Digital Marketing',
    image: 'https://images.unsplash.com/photo-1533750516457-a7f992034fec?auto=format&fit=crop&w=800',
    result: '10x ROAS',
    description: 'Instagram and Facebook ad campaigns targeting fashion-forward millennials.',
  },
  {
    id: 'p4',
    client: 'HealthFirst',
    category: 'SEO',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800',
    result: '#1 Rank on Google',
    description: 'Local SEO strategy that dominated search results for healthcare keywords in their region.',
  },
  {
    id: 'p5',
    client: 'EduLearn',
    category: 'App Development',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800',
    result: '100k+ Downloads',
    description: 'Cross-platform mobile app for online learning with live video capabilities.',
  },
  {
    id: 'p6',
    client: 'FoodieExpress',
    category: 'Automation',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800',
    result: '50% Ops Cost Reduction',
    description: 'Automated order processing and delivery tracking system using AI.',
  }
];

export const RESOURCES: Resource[] = [
  {
    id: 'r1',
    title: 'The Future of AI in Digital Marketing',
    category: 'AI Trends',
    date: 'Oct 12, 2024',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800',
    excerpt: 'How artificial intelligence is reshaping the way brands interact with customers and optimize campaigns.',
  },
  {
    id: 'r2',
    title: 'Top 5 SEO Strategies for 2025',
    category: 'SEO',
    date: 'Sep 28, 2024',
    image: 'https://images.unsplash.com/photo-1571786256017-aee7a0c009b6?auto=format&fit=crop&w=800',
    excerpt: 'Stay ahead of algorithm updates with these proven search engine optimization techniques.',
  },
  {
    id: 'r3',
    title: 'Why Your Website Needs to be Fast',
    category: 'Web Development',
    date: 'Sep 15, 2024',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800',
    excerpt: 'Page speed is a critical ranking factor. Learn how to optimize your site for lightning-fast performance.',
  },
  {
    id: 'r4',
    title: 'Mastering Google Ads: A Beginner\'s Guide',
    category: 'Marketing',
    date: 'Aug 30, 2024',
    image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=800',
    excerpt: 'A comprehensive guide to setting up and managing profitable Google Ad campaigns.',
  },
  {
    id: 'r5',
    title: 'The Power of Video Marketing',
    category: 'Content Strategy',
    date: 'Aug 10, 2024',
    image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800',
    excerpt: 'Video content is king. Discover how to create engaging videos that drive conversions.',
  },
  {
    id: 'r6',
    title: 'Building a Brand Identity that Lasts',
    category: 'Branding',
    date: 'Jul 22, 2024',
    image: 'https://images.unsplash.com/photo-1434626881859-194d67b2b86f?auto=format&fit=crop&w=800',
    excerpt: 'Your brand is more than just a logo. Learn the secrets of building a strong, memorable brand.',
  }
];
