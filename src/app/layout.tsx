import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import ClientLayout from '@/components/AppLayout';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-display' });

export const metadata: Metadata = {
  title: 'Digital Marketing & AI Automation Agency | Scallar IT Solution',
  description: "Scallar IT Solution is Noida's premier Digital Marketing & AI Agency. We scale businesses with SEO, Web Development, Google Ads, and Custom AI Automation. Get a free audit today.",
  keywords: "digital marketing agency noida, ai automation services india, seo company delhi ncr, web development agency, whatsapp automation business, growth marketing expert, lead generation services",
  openGraph: {
    title: 'Scallar IT Solution | AI-Driven Digital Marketing Agency',
    description: "Transform your online presence with data-driven SEO, PPC, and AI automation strategies. Book your free consultation today.",
    type: 'website',
    siteName: 'Scallar IT Solution',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${spaceGrotesk.variable}`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}