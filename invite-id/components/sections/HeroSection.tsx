import { SITE } from '@/constants/site'

export default function HeroSection() {
  return (
    <main className="relative w-full max-w-7xl mx-auto px-4 pt-4 sm:pt-6 pb-16 sm:pb-24 min-h-[calc(100svh-72px)] flex flex-col items-center justify-center">

      {/* 1. Top-Left: Sticky Note + Checkmark Tile */}
      <div
        className="hidden md:block absolute -left-2 lg:left-6 top-4 lg:top-8 z-10 select-none transition-transform hover:scale-105 duration-300 pointer-events-auto animate-float"
        data-purpose="sticky-note-component"
      >
        {/* Underlayer moodboard card */}
        <div className="absolute -top-3 -left-3 w-52 h-48 bg-white/80 backdrop-blur-md rounded-2xl -rotate-6 border border-stone-200/60 shadow-lg -z-10" />
        {/* Yellow/Champagne Sticky Note */}
        <div className="relative w-60 p-5 bg-[#fffbeb] rounded-xl shadow-xl rotate-[-2deg] border border-amber-200/80 text-amber-950">
          {/* Pushpin Gold / Wax detail */}
          <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 flex items-center justify-center">
            <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-[#A8823B] to-[#E3C78B] shadow-md ring-2 ring-amber-100 flex items-center justify-center text-white text-[9px] font-bold">
              ✦
            </div>
          </div>
          <p className="font-handwriting text-xl leading-snug mt-1.5 text-stone-900 tracking-wide">
            Simpan tanggal &amp; bagikan kebahagiaan dengan undangan penuh kesan ✨
          </p>
          <div className="mt-2.5 flex items-center justify-between text-[10px]">
            <span className="text-stone-400 font-sans italic">INVITE.ID</span>
            <span className="font-sans font-semibold text-amber-800 bg-amber-100/80 px-2.5 py-0.5 rounded-full border border-amber-200/60">
              #MomenSpesial
            </span>
          </div>
        </div>
        {/* Floating Checkbox Badge Icon */}
        <div className="absolute -bottom-6 -right-2 bg-white p-2.5 rounded-2xl shadow-xl border border-stone-100 flex items-center justify-center rotate-[6deg]">
          <div className="w-8 h-8 rounded-xl bg-emerald-600 flex items-center justify-center shadow-inner text-white">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M4.5 12.75l6 6 9-13.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>

      {/* 2. Top-Right: Reminders / RSVP Widget */}
      <div
        className="hidden md:block absolute -right-2 lg:right-8 top-3 lg:top-6 z-10 select-none pointer-events-auto transition-transform hover:scale-105 duration-300 animate-float-alt"
        data-purpose="reminders-component"
      >
        {/* Angled Underlay Card */}
        <div className="absolute -top-2.5 -right-3 w-64 h-44 bg-white/70 backdrop-blur-md rounded-3xl rotate-3 border border-stone-200/50 shadow-md -z-10" />
        {/* Main RSVP Card */}
        <div className="relative w-68 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-stone-200/70 rotate-[-1deg]">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-stone-100">
            <span className="font-serif font-bold text-xs tracking-wider text-amber-900 uppercase flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#A8823B] animate-pulse" />
              Live RSVP &amp; Countdown
            </span>
            <span className="text-[9px] bg-rose-50 text-rose-700 font-semibold px-2 py-0.5 rounded-full border border-rose-100">
              Wedding
            </span>
          </div>
          <div>
            <p className="text-[14px] font-serif font-bold text-stone-900 tracking-wide">Arya &amp; Nabila</p>
            <p className="text-[10px] text-stone-500 mt-0.5">Grand Ballroom Jakarta • Akad &amp; Resepsi</p>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200/70 shadow-xs">
              <svg className="w-3 h-3 text-[#A8823B]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span className="text-[10px] font-bold text-[#A8823B]">H-12 Hari Lagi</span>
            </div>
            <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100 shadow-xs">
              248 Hadir
            </span>
          </div>
        </div>
        {/* Floating Wax Seal Emblem Badge */}
        <div className="absolute -bottom-4 -left-5 bg-white p-2 rounded-2xl shadow-xl border border-stone-100 flex items-center justify-center rotate-[-6deg]">
          <div className="w-8 h-8 rounded-full border border-amber-700 relative flex items-center justify-center bg-amber-50 shadow-inner">
            <svg className="w-4 h-4 text-amber-800" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
          </div>
        </div>
      </div>

      {/* 3. Bottom-Left: Katalog Acara & Pilihan Paket Widget */}
      <div
        className="absolute left-2 lg:left-8 bottom-4 lg:bottom-10 z-10 hidden sm:block pointer-events-auto transition-transform hover:scale-105 duration-300 animate-float-slow"
        data-purpose="tasks-component"
      >
        <div className="w-72 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-stone-200/70 rotate-[-1.5deg]">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Katalog Acara Populer
            </span>
            <span className="text-[9px] bg-amber-100 text-amber-900 font-semibold px-2 py-0.5 rounded-full border border-amber-200/60">
              Kilat 1-2 Hari
            </span>
          </div>
          {/* Event 1 */}
          <div className="space-y-1 pb-2.5 border-b border-stone-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="w-4 h-4 rounded bg-rose-500 text-white text-[9px] flex items-center justify-center font-bold">W</span>
                <span className="text-[11px] font-medium text-stone-700 truncate max-w-[130px]">Pernikahan &amp; Lamaran</span>
              </div>
              <div className="flex -space-x-1.5 overflow-hidden">
                <span className="inline-flex h-4 w-4 rounded-full ring-1 ring-white bg-rose-200 text-[8px] items-center justify-center font-bold text-rose-800">💍</span>
                <span className="inline-flex h-4 w-4 rounded-full ring-1 ring-white bg-amber-200 text-[8px] items-center justify-center font-bold text-amber-800">✨</span>
              </div>
            </div>
            <div className="flex items-center justify-between text-[10px] text-stone-400 pt-1">
              <span>Website &amp; Video</span>
              <div className="w-24 bg-stone-100 rounded-full h-1.5 overflow-hidden">
                <div className="bg-rose-400 h-1.5 rounded-full" style={{ width: '95%' }} />
              </div>
              <span className="font-medium text-stone-600">Terfavorit</span>
            </div>
          </div>
          {/* Event 2 */}
          <div className="space-y-1 pt-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="w-4 h-4 rounded bg-emerald-600 text-white text-[9px] flex items-center justify-center font-bold">S</span>
                <span className="text-[11px] font-medium text-stone-700 truncate max-w-[130px]">Aqiqah, Syukuran &amp; Khitan</span>
              </div>
              <div className="flex -space-x-1.5 overflow-hidden">
                <span className="inline-flex h-4 w-4 rounded-full ring-1 ring-white bg-emerald-200 text-[8px] items-center justify-center font-bold text-emerald-800">🌙</span>
                <span className="inline-flex h-4 w-4 rounded-full ring-1 ring-white bg-sky-200 text-[8px] items-center justify-center font-bold text-sky-800">👶</span>
              </div>
            </div>
            <div className="flex items-center justify-between text-[10px] text-stone-400 pt-1">
              <span>Tasyakuran 4/7 Bln</span>
              <div className="w-24 bg-stone-100 rounded-full h-1.5 overflow-hidden">
                <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '80%' }} />
              </div>
              <span className="font-medium text-stone-600">Elegan</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Bottom-Right: Fitur Interaktif Widget */}
      <div
        className="absolute right-2 lg:right-10 bottom-4 lg:bottom-10 z-10 hidden sm:block pointer-events-auto transition-transform hover:scale-105 duration-300 animate-float-delayed"
        data-purpose="integrations-component"
      >
        <div className="w-68 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-stone-200/70 rotate-[2deg]">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs font-bold text-stone-800">Fitur Undangan Modern</span>
            <span className="text-[9px] text-[#A8823B] font-semibold bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200/60">
              Semua Lengkap
            </span>
          </div>
          <div className="flex items-center gap-2.5">
            {/* RSVP WA Tile */}
            <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-stone-100 flex flex-col items-center justify-center p-1.5 hover:shadow-md transition-shadow">
              <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
                </svg>
              </div>
              <span className="text-[7.5px] font-semibold text-stone-600 mt-0.5">RSVP WA</span>
            </div>
            {/* QRIS / Amplop Tile */}
            <div className="w-12 h-12 bg-white rounded-xl border border-stone-100 flex flex-col items-center justify-center p-1.5 hover:shadow-md transition-shadow">
              <div className="w-7 h-7 rounded-lg bg-amber-50 text-[#A8823B] flex items-center justify-center">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <rect height="14" rx="2" width="18" x="3" y="5" />
                  <line x1="3" x2="21" y1="10" y2="10" />
                </svg>
              </div>
              <span className="text-[7.5px] font-semibold text-stone-600 mt-0.5">Amplop/QRIS</span>
            </div>
            {/* Peta & Music Tile */}
            <div className="w-12 h-12 bg-white rounded-xl border border-stone-100 flex flex-col items-center justify-center p-1.5 hover:shadow-md transition-shadow">
              <div className="w-7 h-7 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" />
                </svg>
              </div>
              <span className="text-[7.5px] font-semibold text-stone-600 mt-0.5">Peta &amp; Musik</span>
            </div>
          </div>
        </div>
      </div>

      {/* CENTER HERO CONTENT */}
      <div
        className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto my-auto px-2 sm:px-4 py-6 sm:py-8"
        data-purpose="hero-main-content"
      >
        {/* Central Brand Wax-Sealed Invitation Card Tile */}
        <div className="mb-8 w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-amber-200/80 flex items-center justify-center relative hover:scale-105 transition-transform duration-300 ring-4 ring-amber-100/70 hero-enter hero-delay-1">
          <div className="relative flex items-center justify-center">
            <div className="w-10 h-7 bg-amber-50 rounded border border-amber-200 shadow-inner flex items-center justify-center relative">
              <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-[#A8823B] to-[#D8B467] text-white flex items-center justify-center text-[10px] font-serif font-bold shadow-md ring-1 ring-amber-100">
                K
              </div>
            </div>
          </div>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-bold text-stone-900 tracking-tight leading-[1.1] mb-5 hero-enter hero-delay-2">
          Rancang Undangan Impian<br className="hidden sm:block" />
          untuk Setiap Momen Berharga
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-stone-600 font-normal max-w-xl mb-8 leading-relaxed hero-enter hero-delay-3">
          Jasa desain &amp; pembuatan undangan digital website interaktif, video animasi aesthetic, dan cetak eksklusif untuk
          pernikahan, syukuran, aqiqah, serta berbagai acara spesial.
        </p>

        {/* Primary CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3.5 hero-enter hero-delay-4">
          <a
            className="inline-flex items-center justify-center px-8 py-3.5 text-sm sm:text-base font-semibold rounded-full text-white bg-gradient-to-r from-[#A8823B] to-[#C5A059] hover:from-[#947230] hover:to-[#B6914B] shadow-lg shadow-amber-900/20 transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
            href="#katalog"
          >
            Lihat Katalog Undangan
          </a>
          <a
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm sm:text-base font-medium rounded-full text-stone-800 bg-white hover:bg-stone-50 border border-stone-200 shadow-sm transition-all duration-200"
            href={SITE.wa}
            rel="noopener noreferrer"
            target="_blank"
          >
            <svg className="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
            </svg>
            Konsultasi via WhatsApp
          </a>
        </div>
      </div>
    </main>
  )
}
