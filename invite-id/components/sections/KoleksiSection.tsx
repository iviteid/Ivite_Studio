'use client'

import { useState } from 'react'
import { THEMES } from '@/constants/themes'
import { SITE } from '@/constants/site'
import ThemeCard from '@/components/ui/ThemeCard'

const FILTER_TABS = [
  'Semua Desain',
  'Pernikahan Modern & Minimalis',
  'Adat & Tradisional Nusantara',
  'Floral & Botanical',
  'Syukuran & Aqiqah',
  'Elegan & Luxury Gold',
]

export default function KoleksiSection() {
  const [activeTab, setActiveTab] = useState('Semua Desain')

  return (
    <section
      className="relative w-full max-w-7xl mx-auto px-6 py-20 lg:py-28 border-t border-stone-200/60"
      id="koleksi"
    >
      {/* Section Header */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200/70 text-amber-900 text-[11px] font-semibold tracking-wider uppercase mb-4">
          <span className="w-2 h-2 rounded-full bg-[#C5A059]" />
          <span>KATALOG LENGKAP TERSEDIA VIA WHATSAPP</span>
        </div>
        <h3 className="text-2xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight leading-snug mb-3">
          Ingin Melihat 50+ Pilihan Tema Lainnya?
        </h3>
        <p className="text-sm sm:text-base text-stone-600 max-w-2xl mx-auto leading-relaxed mb-6">
          Kami memiliki puluhan koleksi tema eksklusif lainnya untuk pernikahan modern, adat nusantara, syukuran,
          aqiqah, dan acara spesial. Dapatkan e-catalog PDF dan tautan demo interaktif lengkap langsung dari konsultan
          kami.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <a
            className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#A8823B] to-[#C5A059] hover:from-[#947230] hover:to-[#B6914B] text-white font-semibold text-sm transition-all shadow-md shadow-amber-900/15 hover:shadow-lg transform hover:-translate-y-0.5"
            href={SITE.wa}
            rel="noopener noreferrer"
            target="_blank"
          >
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
            </svg>
            <span>Minta Seluruh Katalog via WhatsApp</span>
          </a>
          <span className="text-xs text-stone-500 font-medium">Respon Cepat • Free E-Catalog PDF</span>
        </div>
      </div>

      {/* Interactive Filter Tabs */}
      <div className="flex items-center justify-center flex-wrap gap-2.5 mb-16 max-w-5xl mx-auto px-2">
        {FILTER_TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all ${
              activeTab === tab
                ? 'bg-[#A8823B] text-white shadow-md shadow-amber-900/15 hover:bg-[#947230]'
                : 'bg-white text-stone-700 border border-stone-200 hover:border-amber-200 hover:text-amber-800 shadow-xs'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 3-Theme Showcase Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {THEMES.map((theme) => (
          <ThemeCard key={theme.id} theme={theme} />
        ))}
      </div>

      {/* Dual Banner Row */}
      <div className="flex flex-col lg:flex-row items-stretch gap-5 max-w-6xl mx-auto mb-4">
        {/* Katalog Lengkap (wide) */}
        <div className="flex-1 bg-white/95 backdrop-blur-md rounded-3xl p-8 sm:p-10 border border-amber-200/80 shadow-soft-elevation relative overflow-hidden text-center flex flex-col items-center justify-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200/70 text-amber-900 text-[11px] font-semibold tracking-wider uppercase mb-4">
            <span className="w-2 h-2 rounded-full bg-[#C5A059]" />
            <span>KATALOG LENGKAP TERSEDIA VIA WHATSAPP</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 tracking-tight leading-snug mb-3">
            Ingin Melihat 50+ Pilihan Tema Lainnya?
          </h3>
          <p className="text-sm text-stone-600 max-w-xl mx-auto leading-relaxed mb-6">
            Kami memiliki puluhan koleksi tema eksklusif lainnya untuk pernikahan modern, adat nusantara, syukuran,
            aqiqah, dan acara spesial. Dapatkan e-catalog PDF dan tautan demo interaktif lengkap langsung dari konsultan
            kami.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <a
              className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#A8823B] to-[#C5A059] hover:from-[#947230] hover:to-[#B6914B] text-white font-semibold text-sm transition-all shadow-md shadow-amber-900/15 hover:shadow-lg transform hover:-translate-y-0.5"
              href={SITE.wa}
              rel="noopener noreferrer"
              target="_blank"
            >
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
              </svg>
              <span>Minta Seluruh Katalog via WhatsApp</span>
            </a>
            <span className="text-xs text-stone-500 font-medium">Respon Cepat • Free E-Catalog PDF</span>
          </div>
        </div>

        {/* Custom Bespoke (narrow) */}
        <div className="lg:w-72 bg-gradient-to-b from-[#FAF7F2] to-[#F0EAE0] rounded-3xl p-7 border border-stone-200/80 shadow-soft-elevation flex flex-col items-start justify-between gap-5 relative overflow-hidden flex-shrink-0">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-100/70 text-amber-900 text-[10px] font-bold uppercase tracking-wider mb-3">
              <span>✨ Custom Bespoke</span>
            </div>
            <h3 className="font-serif font-bold text-xl text-stone-900 mb-2 leading-snug">Punya Konsep Sendiri?</h3>
            <p className="text-sm text-stone-600 leading-relaxed">
              Kami wujudkan desain custom one-of-a-kind dengan fleksibilitas tata letak, palet warna, dan musik pilihan.
            </p>
          </div>
          <a
            className="inline-flex items-center justify-center gap-2 w-full px-5 py-3 rounded-full bg-[#1c1917] hover:bg-stone-800 text-white font-medium text-sm transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            href={SITE.wa}
            rel="noopener noreferrer"
            target="_blank"
          >
            <span>Konsultasi Sekarang</span>
            <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
