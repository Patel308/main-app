import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import ClientLayout from '@/components/AppLayout';
import { LocalBusinessJsonLd } from '@/components/JsonLd';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-display' });

export const metadata: Metadata = {
  title: {
    default: 'Digital Marketing & AI Automation Agency | Scallar IT Solution',
    template: '%s | Scallar IT Solution',
  },
  description:
    "Scallar IT Solution is Noida's premier Digital Marketing & AI Agency. We scale businesses with SEO, Web Development, Google Ads, and Custom AI Automation. Get a free audit today.",
  keywords:
    'digital marketing agency noida, ai automation services india, seo company delhi ncr, web development agency, whatsapp automation business, growth marketing expert, lead generation services',
  metadataBase: new URL('https://scallar.in'),
  openGraph: {
    title: 'Scallar IT Solution | AI-Driven Digital Marketing Agency',
    description:
      'Transform your online presence with data-driven SEO, PPC, and AI automation strategies. Book your free consultation today.',
    type: 'website',
    url: 'https://scallar.in',
    siteName: 'Scallar IT Solution',
    images: [
      {
        url: '/og-image.png',       // ← place a 1200×630 image at public/og-image.png
        width: 1200,
        height: 630,
        alt: 'Scallar IT Solution — AI-Driven Digital Marketing Agency',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Scallar IT Solution | AI-Driven Digital Marketing Agency',
    description:
      'Transform your online presence with data-driven SEO, PPC, and AI automation. Book a free consultation today.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* LocalBusiness JSON-LD — injected on every page */}
        <LocalBusinessJsonLd />
      </head>
      <body className={`${inter.variable} ${spaceGrotesk.variable}`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
