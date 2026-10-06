'use client'

import { useState } from 'react'
import { SITE } from '@/constants/site'

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between relative z-20">
      {/* Brand Logo */}
      <a className="flex items-center gap-2.5 group" href="#" data-purpose="brand-logo">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#A8823B] to-[#E3C78B] p-[1.5px] shadow-sm flex items-center justify-center">
          <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center text-[#A8823B]">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="9" cy="12" r="5" />
              <circle cx="15" cy="12" r="5" />
            </svg>
          </div>
        </div>
        <div className="flex flex-col">
          <span className="font-serif font-bold text-lg sm:text-xl tracking-wide text-stone-900 group-hover:text-[#A8823B] transition-colors leading-none">
            {SITE.name}
          </span>
          <span className="text-[9px] font-semibold tracking-[0.2em] text-[#A8823B] uppercase">
            Invitation Studio
          </span>
        </div>
      </a>

      {/* Navigation Menu Links — desktop */}
      <nav className="hidden md:flex items-center gap-7 text-[14px] font-medium text-stone-600" data-purpose="main-nav">
        <a className="hover:text-amber-800 transition-colors" href="#">Beranda</a>
        <a className="hover:text-amber-800 transition-colors" href="#kata-pengantar">Tentang Kami</a>
        <a className="hover:text-amber-800 transition-colors" href="#fitur">Fitur Undangan</a>
        <a className="hover:text-amber-800 transition-colors" href="#koleksi">Koleksi Tema</a>
        <a className="hover:text-amber-800 transition-colors" href="#layanan">Paket Layanan</a>
        <a className="hover:text-amber-800 transition-colors" href="#kontak">Kontak</a>
      </nav>

      {/* Header Actions */}
      <div className="flex items-center gap-2 sm:gap-3 text-[14px]">
        <a
          className="hidden sm:inline-block text-stone-700 font-medium hover:text-amber-800 transition-colors px-3 py-1.5"
          href={SITE.wa}
          rel="noopener noreferrer"
          target="_blank"
        >
          Konsultasi
        </a>
        <a
          className="hidden sm:inline-flex px-5 py-2 rounded-full font-medium text-white bg-gradient-to-r from-[#A8823B] to-[#C5A059] hover:from-[#947230] hover:to-[#B6914B] transition-all shadow-md shadow-amber-900/15 text-sm"
          href="#pesan"
        >
          Pesan Undangan
        </a>

        {/* Hamburger button — mobile only */}
        <button
          className="md:hidden p-2 rounded-lg text-stone-700 hover:bg-stone-100 transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Nav Dropdown */}
      {mobileOpen && (
        <div className="absolute top-full left-0 right-0 md:hidden bg-white/98 backdrop-blur-md border-b border-stone-200/80 shadow-lg z-50 px-4 py-5">
          <nav className="flex flex-col gap-1 text-[15px] font-medium text-stone-700" data-purpose="mobile-nav">
            {[
              { label: 'Beranda', href: '#' },
              { label: 'Tentang Kami', href: '#kata-pengantar' },
              { label: 'Fitur Undangan', href: '#fitur' },
              { label: 'Koleksi Tema', href: '#koleksi' },
              { label: 'Paket Layanan', href: '#layanan' },
              { label: 'Kontak', href: '#kontak' },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="px-3 py-3 rounded-xl hover:bg-amber-50 hover:text-amber-800 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="mt-4 pt-4 border-t border-stone-100 flex flex-col gap-2.5">
            <a
              href={SITE.wa}
              rel="noopener noreferrer"
              target="_blank"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-full font-medium text-stone-800 bg-stone-50 border border-stone-200 text-sm"
            >
              Konsultasi via WhatsApp
            </a>
            <a
              href="#pesan"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center w-full py-3 rounded-full font-semibold text-white bg-gradient-to-r from-[#A8823B] to-[#C5A059] text-sm shadow-md shadow-amber-900/15"
            >
              Pesan Undangan
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
