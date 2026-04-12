import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import ClientLayout from '@/components/AppLayout';
import { LocalBusinessJsonLd, OrganizationJsonLd, WebSiteJsonLd } from '@/components/JsonLd';
import type { Viewport } from 'next';
// 1. Import the Script component from Next.js
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-display' });

export const metadata: Metadata = {
  title: {
    default: 'Digital Marketing & AI Automation Agency | Scallar IT Solution',
    template: '%s | Scallar IT Solution',
  },
  description:
    "Scallar IT Solution is Noida's premier Digital Marketing & AI Agency. We scale businesses with SEO, Web Development, Google Ads, and Custom AI Automation. Get a free audit today.",
  keywords: [
    'digital marketing agency noida',
    'ai automation services india',
    'seo company delhi ncr',
    'web development agency',
    'whatsapp automation business',
    'growth marketing expert',
    'lead generation services',
  ],
  metadataBase: new URL('https://scallar.in'),

  // ── Favicon & Icons ──────────────────────────────────────────────────────────
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/logo.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
  },

  openGraph: {
    title: 'Scallar IT Solution | AI-Driven Digital Marketing Agency',
    description:
      'Transform your online presence with data-driven SEO, PPC, and AI automation strategies. Book your free consultation today.',
    type: 'website',
    url: 'https://scallar.in',
    siteName: 'Scallar IT Solution',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Scallar IT Solution — AI-Driven Digital Marketing Agency',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@scallarit',
    creator: '@scallarit',
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

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FFFFFF' },
    { media: '(prefers-color-scheme: dark)', color: '#050505' },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* 2. GA4 Scripts added here */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-Y8BC9QB4QH"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-Y8BC9QB4QH');
          `}
        </Script>

        {/* Structured data — on every page */}
        <LocalBusinessJsonLd />
        <OrganizationJsonLd />
        <WebSiteJsonLd />
      </head>
      <body className={`${inter.variable} ${spaceGrotesk.variable}`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}