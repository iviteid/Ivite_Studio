import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'Hana & Ren — Sakura Éternelle', description: 'Join Hana and Ren for a wedding celebration in Kyoto. April 18, 2027.', openGraph: { title: 'Hana & Ren · A love in bloom', description: 'Kyoto, Japan · April 18, 2027', images: ['https://images.unsplash.com/photo-1522383225653-ed111181a951?w=1200&q=80'] } };
export default function Layout({ children }: { children: React.ReactNode }) { return <html lang="en"><body>{children}</body></html>; }
