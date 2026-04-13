export interface Author {
  id: string;
  name: string;
  slug: string;
  role: string;
  jobTitle: string;
  bio: string;
  shortBio: string;
  avatar: string;
  experience: number;
  specializations: string[];
  linkedin: string;
  twitter?: string;
  articlesCount: number;
  reviewedCount: number;
  worksFor: string;
  isPublic: boolean; // false = hidden from public listing
}

export const AUTHORS: Author[] = [
  {
    id: 'deepesh-patel',
    name: 'Deepesh Patel',
    slug: 'deepesh-patel',
    role: 'Founder & AI Automation Expert',
    jobTitle: 'Founder & AI Automation Specialist',
    bio: 'Deepesh Patel is the founder of Scallar IT Solution and a seasoned AI automation expert with over 5 years of experience helping businesses scale through intelligent automation, data-driven marketing, and custom AI solutions. He has worked with 100+ businesses across India, Dubai, and the UK, delivering measurable growth through SEO, PPC, and AI-powered workflows.',
    shortBio: 'Founder of Scallar IT Solution. 5+ years in AI automation & digital marketing.',
    avatar: 'https://media.licdn.com/dms/image/v2/D4D03AQGhKFyxWxWlOw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1699800990425',
    experience: 5,
    specializations: ['AI Automation', 'Digital Marketing', 'SEO', 'Business Strategy', 'WhatsApp Automation'],
    linkedin: 'https://www.linkedin.com/in/deepesh-patel-999070205/',
    twitter: 'https://twitter.com/deepeshpatel',
    articlesCount: 24,
    reviewedCount: 48,
    worksFor: 'Scallar IT Solution',
    isPublic: false,
  },
  {
    id: 'kamlesh-gupta',
    name: 'Kamlesh Gupta',
    slug: 'kamlesh-gupta',
    role: 'Senior Digital Marketing Strategist',
    jobTitle: 'Senior Digital Marketing Strategist',
    bio: 'Kamlesh Gupta is a Senior Digital Marketing Strategist at Scallar IT Solution with deep expertise in performance marketing, SEO, and lead generation. He has helped numerous startups and enterprises build their digital presence from scratch, consistently delivering 3-5x ROI on marketing investments.',
    shortBio: 'Senior Digital Marketing Strategist. Expert in SEO & performance marketing.',
    avatar: 'https://media.licdn.com/dms/image/v2/D4D03AQHxKFyxWxWlOw/profile-displayphoto-shrink_800_800/0/1699800990425',
    experience: 4,
    specializations: ['SEO', 'PPC', 'Performance Marketing', 'Lead Generation', 'Google Ads'],
    linkedin: 'https://www.linkedin.com/in/kamlesh-gupta-3b9315293/',
    articlesCount: 18,
    reviewedCount: 32,
    worksFor: 'Scallar IT Solution',
    isPublic: false,
  },
  {
    id: 'deepanshu-kumar',
    name: 'Deepanshu Kumar',
    slug: 'deepanshu-kumar',
    role: 'AI & Data Engineering Lead',
    jobTitle: 'AI & Data Engineering Lead',
    bio: 'Deepanshu Kumar Prajapati is the AI & Data Engineering Lead at Scallar IT Solution, specializing in building scalable data pipelines, machine learning models, and custom AI solutions. With expertise in Python, cloud infrastructure, and automation frameworks, he bridges the gap between complex AI technology and practical business applications.',
    shortBio: 'AI & Data Engineering Lead. Builds scalable ML systems and automation pipelines.',
    avatar: 'https://media.licdn.com/dms/image/v2/D4D03AQIxKFyxWxWlOw/profile-displayphoto-shrink_800_800/0/1699800990425',
    experience: 3,
    specializations: ['Machine Learning', 'Data Engineering', 'Python', 'AI Development', 'Cloud Architecture'],
    linkedin: 'https://www.linkedin.com/in/deepanshu-kumar-prajapati-093a03238/',
    articlesCount: 12,
    reviewedCount: 20,
    worksFor: 'Scallar IT Solution',
    isPublic: false,
  },
];

export function getAuthorBySlug(slug: string): Author | undefined {
  return AUTHORS.find((a) => a.slug === slug);
}

export function getAuthorById(id: string): Author | undefined {
  return AUTHORS.find((a) => a.id === id);
}