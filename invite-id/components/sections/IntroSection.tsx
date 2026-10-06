import Reveal from '@/components/ui/Reveal'

export default function IntroSection() {
  return (
    <section className="relative w-full max-w-7xl mx-auto px-6 py-20 lg:py-28" id="kata-pengantar">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <Reveal direction="up">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-stone-200/80 shadow-xs mb-6">
            <span className="w-2 h-2 rounded-full bg-[#C5A059]" />
            <span className="text-[11px] font-semibold tracking-wider uppercase text-stone-700">
              KATA PENGANTAR • KISAH KAMI
            </span>
          </div>
        </Reveal>
        <Reveal direction="up" delay={100}>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-stone-900 tracking-tight leading-tight mb-6">
            Setiap Perayaan Memiliki Cerita yang Layak Dirayakan dengan Indah
          </h2>
        </Reveal>
        <Reveal direction="up" delay={200}>
          <p className="text-base sm:text-lg text-stone-600 font-normal leading-relaxed max-w-2xl mx-auto">
            Bagi kami, undangan bukan sekadar lembaran informasi tanggal dan tempat. Undangan adalah pintu gerbang pertama
            yang menyampaikan rasa syukur, kehangatan, dan sukacita tuan rumah kepada keluarga serta kerabat tercinta. Kami
            hadir mendampingi Anda merancang kenangan awal yang tak terlupakan.
          </p>
        </Reveal>
      </div>

      {/* 3 Pillar Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16">
        <Reveal direction="up" delay={0}>
          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-7 border border-stone-100 shadow-soft-elevation hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full">
            <div>
              <div className="w-12 h-12 rounded-xl bg-rose-50 border border-rose-100 text-rose-700 flex items-center justify-center mb-6 shadow-sm">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </div>
              <h3 className="text-xl font-serif font-bold text-stone-900 mb-2">Pernikahan Agung (Wedding)</h3>
              <p className="text-sm text-stone-500 leading-relaxed">
                Desain romantis nan editorial modern, website interaktif dengan hitung mundur, audio player latar, galeri
                kisah cinta, navigasi peta, dan RSVP tamu otomatis.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-stone-100 flex items-center text-xs font-semibold text-rose-800">
              <span>Sentuhan romantis &amp; intim</span>
            </div>
          </div>
        </Reveal>

        <Reveal direction="up" delay={150}>
          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-7 border border-stone-100 shadow-soft-elevation hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full">
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-100 text-[#A8823B] flex items-center justify-center mb-6 shadow-sm">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="text-xl font-serif font-bold text-stone-900 mb-2">Syukuran &amp; Tradisi Penuh Doa</h3>
              <p className="text-sm text-stone-500 leading-relaxed">
                Nuansa hangat dengan ornamen islami elegan atau floral lembut untuk syukuran 4/7 bulanan, tasyakuran
                aqiqah buah hati, khitanan ananda, hingga syukuran rumah baru.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-stone-100 flex items-center text-xs font-semibold text-[#A8823B]">
              <span>Penuh berkah &amp; khidmat</span>
            </div>
          </div>
        </Reveal>

        <Reveal direction="up" delay={300}>
          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-7 border border-stone-100 shadow-soft-elevation hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full">
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-700 flex items-center justify-center mb-6 shadow-sm">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="text-xl font-serif font-bold text-stone-900 mb-2">Fleksibel: Digital, Video, &amp; Cetak</h3>
              <p className="text-sm text-stone-500 leading-relaxed">
                Pilihan format terlengkap dari undangan website responsif tanpa batas tamu, animasi video reels vertikal
                9:16 untuk media sosial, hingga cetak foil bertekstur premium.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-stone-100 flex items-center text-xs font-semibold text-emerald-700">
              <span>Satu pintu untuk semua format</span>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Editorial Quote Box */}
      <Reveal direction="scale" delay={100}>
        <div className="max-w-3xl mx-auto bg-white/90 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-stone-200/60 shadow-soft-elevation text-center relative">
          <div className="w-8 h-8 rounded-full bg-amber-50 text-[#A8823B] flex items-center justify-center mx-auto mb-3">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
          </div>
          <blockquote className="font-serif text-stone-800 text-lg sm:text-xl font-medium leading-relaxed italic mb-3">
            &ldquo;Undangan yang baik adalah doa yang dihantarkan dengan kehangatan dan keindahan.&rdquo;
          </blockquote>
          <p className="text-xs font-semibold text-[#A8823B] uppercase tracking-widest">
            Studio Tim Kreatif • INVITE.ID
          </p>
        </div>
      </Reveal>
    </section>
  )
}
