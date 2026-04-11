import type { Metadata } from 'next';
import MonikaClient from './MonikaClient';

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function MonikaEmbedPage() {
  return <MonikaClient />;
}