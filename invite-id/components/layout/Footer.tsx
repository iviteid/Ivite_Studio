import { SITE } from '@/constants/site'

export default function Footer() {
  return (
    <footer className="w-full bg-[#f6f4ee] text-stone-600 pt-16 pb-12 border-t border-amber-200/70 relative z-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-stone-200/80">
          {/* Brand Column */}
          <div className="lg:col-span-5 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#A8823B] to-[#E3C78B] p-[1.5px] shadow-sm flex items-center justify-center">
                <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center text-[#A8823B]">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <circle cx="9" cy="12" r="5" />
                    <circle cx="15" cy="12" r="5" />
                  </svg>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-bold text-2xl tracking-wider text-stone-900 leading-none">
                  {SITE.name}
                </span>
                <span className="text-[9px] font-semibold tracking-[0.25em] text-[#A8823B] uppercase mt-1">
                  {SITE.tagline}
                </span>
              </div>
            </div>
            <p className="text-sm text-stone-600 leading-relaxed max-w-md">
              Atelier desain undangan terpadu untuk pernikahan istimewa, syukuran penuh doa, dan momen berharga lainnya.
              Menghadirkan harmonisasi antara keanggunan digital interaktif dan kemewahan sentuhan cetak bertekstur premium.
            </p>
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white border border-stone-200 text-stone-700 text-xs shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Craftsmanship Terpercaya • Garansi Tepat Waktu</span>
            </div>
          </div>

          {/* Layanan & Format */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-serif text-base font-bold text-stone-900 tracking-wide">Layanan &amp; Format</h4>
            <ul className="space-y-2.5 text-xs text-stone-600 font-medium">
              <li><a href="#" className="hover:text-[#A8823B] transition-colors">Website Interaktif</a></li>
              <li><a href="#" className="hover:text-[#A8823B] transition-colors">Video Reels &amp; Motion</a></li>
              <li><a href="#" className="hover:text-[#A8823B] transition-colors">Cetak Foil &amp; Hardcover</a></li>
              <li><a href="#" className="hover:text-[#A8823B] transition-colors">Custom RSVP System</a></li>
              <li><a href="#" className="hover:text-[#A8823B] transition-colors">Filter IG &amp; QR Check-in</a></li>
            </ul>
          </div>

          {/* Kategori Tema */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-serif text-base font-bold text-stone-900 tracking-wide">Kategori Tema</h4>
            <ul className="space-y-2.5 text-xs text-stone-600 font-medium">
              <li><a href="#koleksi" className="hover:text-[#A8823B] transition-colors">Modern &amp; Minimalis</a></li>
              <li><a href="#koleksi" className="hover:text-[#A8823B] transition-colors">Tradisional Nusantara</a></li>
              <li><a href="#koleksi" className="hover:text-[#A8823B] transition-colors">Floral &amp; Botanical</a></li>
              <li><a href="#koleksi" className="hover:text-[#A8823B] transition-colors">Syukuran &amp; Aqiqah</a></li>
              <li><a href="#koleksi" className="hover:text-[#A8823B] transition-colors">Elegan &amp; Luxury Gold</a></li>
            </ul>
          </div>

          {/* Studio & Kontak */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-serif text-base font-bold text-stone-900 tracking-wide">Studio &amp; Kontak</h4>
            <div className="space-y-2.5 text-xs text-stone-600 leading-relaxed">
              <p className="flex items-start gap-2">
                <svg className="w-4 h-4 text-[#A8823B] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{SITE.address}</span>
              </p>
              <p className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#A8823B] flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>{SITE.email}</span>
              </p>
              <p className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#A8823B] flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
                <span>{SITE.ig}</span>
              </p>
            </div>
            <div className="pt-2 border-t border-stone-200/80 text-[11px] text-stone-500">
              <p className="font-medium text-stone-800">Jam Konsultasi Studio:</p>
              <p>{SITE.hours}</p>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-stone-500 gap-4 text-center md:text-left">
          <p>© 2025 INVITE.ID. All rights reserved. Crafted with care for unforgettable moments.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-[#A8823B] transition-colors">Kebijakan Privasi</a>
            <span className="text-stone-300">•</span>
            <a href="#" className="hover:text-[#A8823B] transition-colors">Syarat &amp; Ketentuan</a>
            <span className="text-stone-300">•</span>
            <a href={SITE.wa} className="hover:text-[#A8823B] transition-colors">Bantuan Desain</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
