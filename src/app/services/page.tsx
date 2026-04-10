

import type { Metadata } from 'next';
import ServicesClient from './ServicesClient';

export const metadata: Metadata = {
  title: 'Our Services | Scallar IT Solution',
  description: 'SEO, Web Development, AI Automation and more. Serving Noida, Delhi NCR.',
  alternates: { canonical: 'https://scallar.in/services' },
};

export default function ServicesPage() {
  return <ServicesClient />;
}
