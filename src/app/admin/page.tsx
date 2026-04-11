import type { Metadata } from 'next';
import AdminClient from './AdminClient';

export const metadata: Metadata = {
  title: 'Admin | Scallar IT Solution',
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};

export default function AdminPage() {
  return <AdminClient />;
}