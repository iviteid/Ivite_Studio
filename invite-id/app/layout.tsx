import type { Metadata } from 'next'
import { Inter, Cormorant_Garamond, Caveat } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const caveat = Caveat({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-caveat',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'INVITE.ID - Rancang Undangan Impian untuk Setiap Momen Berharga',
  description:
    'Jasa desain & pembuatan undangan digital website interaktif, video animasi aesthetic, dan cetak eksklusif untuk pernikahan, syukuran, aqiqah, serta berbagai acara spesial.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id">
      <body
        className={`${inter.variable} ${cormorant.variable} ${caveat.variable} font-sans min-h-screen text-stone-800 antialiased overflow-x-hidden selection:bg-amber-100 selection:text-amber-900`}
      >
        {children}
      </body>
    </html>
  )
}
