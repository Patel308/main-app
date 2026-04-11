// ✅ noindex added — admin dashboard must never appear in Google search results
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Dashboard | Scallar IT Solution',
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};