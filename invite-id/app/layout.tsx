import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, Fraunces, Pacifico } from 'next/font/google'
import './globals.css'

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: 'variable',
  style: ['normal', 'italic'],
  variable: '--font-fraunces',
  display: 'swap',
})

const pacifico = Pacifico({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-pacifico',
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
        className={`${plusJakarta.variable} ${fraunces.variable} ${pacifico.variable} font-sans min-h-screen text-stone-800 antialiased overflow-x-hidden selection:bg-amber-100 selection:text-amber-900`}
      >
        {children}
      </body>
    </html>
  )
}
