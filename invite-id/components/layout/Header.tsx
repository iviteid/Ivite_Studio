import { SITE } from '@/constants/site'

export default function Header() {
  return (
    <header className="w-full max-w-7xl mx-auto px-6 py-5 flex items-center justify-between relative z-20">
      {/* Brand Logo */}
      <a className="flex items-center gap-3 group" href="#" data-purpose="brand-logo">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#A8823B] to-[#E3C78B] p-[1.5px] shadow-sm flex items-center justify-center">
          <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center text-[#A8823B]">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="9" cy="12" r="5" />
              <circle cx="15" cy="12" r="5" />
            </svg>
          </div>
        </div>
        <div className="flex flex-col">
          <span className="font-serif font-bold text-xl tracking-wide text-stone-900 group-hover:text-[#A8823B] transition-colors leading-none">
            {SITE.name}
          </span>
          <span className="text-[9px] font-semibold tracking-[0.2em] text-[#A8823B] uppercase">
            Invitation Studio
          </span>
        </div>
      </a>

      {/* Navigation Menu Links */}
      <nav className="hidden md:flex items-center gap-7 text-[14px] font-medium text-stone-600" data-purpose="main-nav">
        <a className="hover:text-amber-800 transition-colors" href="#">Beranda</a>
        <a className="hover:text-amber-800 transition-colors" href="#kata-pengantar">Tentang Kami</a>
        <a className="hover:text-amber-800 transition-colors" href="#fitur">Fitur Undangan</a>
        <a className="hover:text-amber-800 transition-colors" href="#koleksi">Koleksi Tema</a>
        <a className="hover:text-amber-800 transition-colors" href="#layanan">Paket Layanan</a>
        <a className="hover:text-amber-800 transition-colors" href="#kontak">Kontak</a>
      </nav>

      {/* Header Actions */}
      <div className="flex items-center gap-3 text-[14px]">
        <a
          className="hidden sm:inline-block text-stone-700 font-medium hover:text-amber-800 transition-colors px-3 py-1.5"
          href={SITE.wa}
          rel="noopener noreferrer"
          target="_blank"
        >
          Konsultasi Desain
        </a>
        <a
          className="px-5 py-2 rounded-full font-medium text-white bg-gradient-to-r from-[#A8823B] to-[#C5A059] hover:from-[#947230] hover:to-[#B6914B] transition-all shadow-md shadow-amber-900/15"
          href="#pesan"
        >
          Pesan Undangan
        </a>
      </div>
    </header>
  )
}
