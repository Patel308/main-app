// ✅ SERVER COMPONENT — SSG enabled
import type { Metadata } from 'next';
import ResourcesClient from './ResourcesClient';

export const metadata: Metadata = {
  title: 'Blog & Resources | Digital Marketing & AI Insights | Scallar IT Solution',
  description:
    'Read expert guides, strategies, and insights on SEO, AI Automation, Digital Marketing, and Web Development from the Scallar IT Solution team.',
  keywords:
    'digital marketing blog india, seo tips 2025, ai automation guide, web development blog, google ads tips, scallar it solution blog',
  openGraph: {
    title: 'Blog & Resources | Scallar IT Solution',
    description: 'Expert insights on SEO, AI, Digital Marketing & Web Development.',
    type: 'website',
    siteName: 'Scallar IT Solution',
  },
  alternates: {
    canonical: 'https://scallar.in/resources',
  },
};

export default function ResourcesPage() {
  return <ResourcesClient />;
}
