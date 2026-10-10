import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap'
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '500', '600', '700'],
  display: 'swap'
});

export const metadata: Metadata = {
  title: 'Hana & Ren — Sakura Éternelle',
  description: 'A luxury wedding invitation for Hana and Ren in Kyoto, Japan on April 18, 2027.',
  keywords: ['wedding invitation', 'Kyoto wedding', 'Sakura Éternelle', 'Hana and Ren', 'Japanese wedding invitation'],
  applicationName: 'Sakura Éternelle',
  authors: [{ name: 'Hana & Ren' }],
  category: 'wedding',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Hana & Ren · Sakura Éternelle',
    description: 'Kyoto, Japan · April 18, 2027',
    url: 'https://example.com/',
    siteName: 'Sakura Éternelle',
    locale: 'en_US',
    type: 'website',
    images: [{ url: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?w=1200&q=80', width: 1200, height: 800, alt: 'Hana and Ren wedding invitation' }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hana & Ren — Sakura Éternelle',
    description: 'Kyoto, Japan · April 18, 2027',
    images: ['https://images.unsplash.com/photo-1522383225653-ed111181a951?w=1200&q=80']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true
    }
  }
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#090909'
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${cormorant.variable}`}>
        {children}
      </body>
    </html>
  );
}
