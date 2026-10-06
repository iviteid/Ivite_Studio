import { FEATURES } from '@/constants/features'
import Reveal from '@/components/ui/Reveal'

const CheckIcon = () => (
  <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
    <path d="M4.5 12.75l6 6 9-13.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export default function FeaturesSection() {
  const leftFeatures = FEATURES.slice(0, 8)
  const rightFeatures = FEATURES.slice(8, 16)

  return (
    <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 py-14 sm:py-20 lg:py-28" id="fitur">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">

          {/* Left: Woman Photo Orbit */}
          <Reveal direction="left" className="lg:col-span-6">
            <div className="relative flex items-center justify-center min-h-[360px] sm:min-h-[480px] select-none py-8 sm:py-6">
              <div className="relative w-full max-w-[320px] sm:max-w-[460px] aspect-square flex items-center justify-center">
                {/* Spinning dashed orbit ring */}
                <div className="absolute inset-4 rounded-full border-2 border-dashed border-amber-200/70 animate-spin-slow pointer-events-none" />
                {/* Warm glow blob */}
                <div className="absolute w-72 h-72 rounded-full bg-gradient-to-tr from-[#f5ede1] via-[#faede0] to-[#f4ebe1] blur-xl opacity-90" />

                {/* Circular woman photo */}
                <div className="relative w-52 h-52 sm:w-60 sm:h-60 rounded-full overflow-hidden border-4 border-white shadow-xl bg-amber-50/60 flex items-start justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/woman.png"
                    alt="Model Preview"
                    className="w-[155%] h-[155%] object-contain object-top -translate-y-3 hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/25 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Stat: 180 Siap Hadir */}
                <div className="absolute top-2 right-0 sm:right-10 bg-gradient-to-br from-[#fcf7ee] to-[#f4ede0] text-stone-900 px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl shadow-xl border border-amber-200/80 flex flex-col items-center justify-center min-w-[76px] sm:min-w-[90px] animate-bounce-subtle z-20">
                  <span className="text-xl sm:text-3xl font-serif font-bold leading-none tracking-tight text-amber-950">180</span>
                  <span className="text-[9px] sm:text-[10px] font-semibold tracking-wider mt-1 text-[#A8823B] uppercase">Siap Hadir</span>
                </div>

                {/* Stat: 26 Tidak Hadir */}
                <div className="absolute top-20 sm:top-24 right-0 sm:right-4 bg-gradient-to-br from-[#faf4f2] to-[#f5e9e5] text-stone-900 px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl shadow-xl border border-rose-200/80 flex flex-col items-center justify-center min-w-[76px] sm:min-w-[90px] z-20">
                  <span className="text-xl sm:text-3xl font-serif font-bold leading-none tracking-tight text-stone-800">26</span>
                  <span className="text-[9px] sm:text-[10px] font-semibold tracking-wider mt-1 text-rose-800/80 uppercase">Tidak Hadir</span>
                </div>

                {/* Wish card: Doni Irza */}
                <div className="absolute -bottom-2 left-0 sm:left-4 bg-white/95 backdrop-blur-md p-2.5 sm:p-3 rounded-2xl shadow-lg border border-amber-200/70 max-w-[160px] sm:max-w-[210px] z-20 rotate-[-2deg]">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="w-2 h-2 rounded-full bg-[#A8823B]" />
                    <p className="text-xs font-serif font-bold text-stone-900 leading-tight">Doni Irza</p>
                  </div>
                  <p className="text-[10px] text-stone-600 leading-snug">
                    Semoga Sakinah Mawaddah wa Rahmah ✨
                  </p>
                </div>

                {/* Wish card: Evita — hidden on xs, show sm+ */}
                <div className="hidden sm:block absolute -bottom-3 right-6 bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-lg border border-amber-200/70 max-w-[210px] z-20 rotate-[1deg]">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="w-2 h-2 rounded-full bg-[#C5A059]" />
                    <p className="text-xs font-serif font-bold text-stone-900 leading-tight">Evita</p>
                  </div>
                  <p className="text-[10px] text-stone-600 leading-snug">
                    Selamat menempuh hidup baru, semoga senantiasa sakinah dan penuh berkah
                  </p>
                </div>

                {/* Wish card: Chelvin — hidden on xs, show sm+ */}
                <div className="hidden sm:block absolute bottom-20 right-6 bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-lg border border-rose-200/70 max-w-[210px] z-20 rotate-[-1.5deg]">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="w-2 h-2 rounded-full bg-rose-400" />
                    <p className="text-xs font-serif font-bold text-stone-900 leading-tight">Chelvin</p>
                  </div>
                  <p className="text-[10px] text-stone-600 leading-snug">
                    Selamat ya, semoga langgeng dan bahagia selamanya 🌸
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Right: Feature List */}
          <Reveal direction="right" className="lg:col-span-6">
            <div className="flex flex-col justify-center lg:pl-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-stone-200/80 shadow-xs mb-4 w-fit">
                <span className="w-2 h-2 rounded-full bg-[#C5A059]" />
                <span className="text-[11px] font-semibold tracking-wider uppercase text-stone-700">
                  FITUR LENGKAP • SEGALANYA DALAM SATU UNDANGAN
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-serif font-bold text-stone-900 tracking-tight leading-[1.18] mb-4">
                Undangan impian dengan beragam fitur andalan
              </h2>
              <p className="text-base text-stone-600 leading-relaxed mb-8 max-w-xl">
                Lengkapi{' '}
                <span className="text-stone-900 font-medium underline decoration-amber-300 underline-offset-4">
                  website undangan digital eksklusif
                </span>{' '}
                dengan fitur interaktif yang dirancang sempurna untuk kenyamanan Anda dan tamu terhormat.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3.5">
                {/* Left Column */}
                <div className="space-y-3.5">
                  {leftFeatures.map((feature, i) => (
                    <div
                      key={feature.label}
                      className="flex items-center gap-3 opacity-0 animate-fade-in-item"
                      style={{ animationDelay: `${i * 60}ms`, animationFillMode: 'both' }}
                    >
                      <div className="w-5 h-5 rounded-full bg-amber-100 text-[#A8823B] flex items-center justify-center flex-shrink-0 shadow-xs border border-amber-200/60">
                        <CheckIcon />
                      </div>
                      <span className={`text-sm font-medium ${feature.highlight ? 'text-[#A8823B]' : 'text-stone-800'}`}>
                        {feature.label}
                      </span>
                    </div>
                  ))}
                </div>
                {/* Right Column */}
                <div className="space-y-3.5">
                  {rightFeatures.map((feature, i) => (
                    <div
                      key={feature.label}
                      className="flex items-center gap-3 opacity-0 animate-fade-in-item"
                      style={{ animationDelay: `${(i + 8) * 60}ms`, animationFillMode: 'both' }}
                    >
                      <div className="w-5 h-5 rounded-full bg-amber-100 text-[#A8823B] flex items-center justify-center flex-shrink-0 shadow-xs border border-amber-200/60">
                        <CheckIcon />
                      </div>
                      <span className={`text-sm font-medium ${feature.highlight ? 'text-[#A8823B]' : 'text-stone-800'}`}>
                        {feature.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  )
}
