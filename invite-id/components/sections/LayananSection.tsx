import { TESTIMONIALS } from '@/constants/testimonials'
import Reveal from '@/components/ui/Reveal'

const StarIcon = () => (
  <svg className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
)

const delays = [0, 150, 300]

export default function LayananSection() {
  return (
    <section
      className="relative w-full max-w-7xl mx-auto px-6 py-20 lg:py-28 border-t border-stone-200/60"
      id="layanan"
    >
      {/* Section Header */}
      <Reveal direction="up">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-stone-200/80 shadow-xs mb-6">
            <span className="w-2 h-2 rounded-full bg-[#C5A059]" />
            <span className="text-[11px] font-semibold tracking-wider uppercase text-stone-700">
              KEUNGGULAN LAYANAN • DIPERCAYA RATUSAN KELUARGA
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-stone-900 tracking-tight leading-tight mb-5">
            Dipercaya Ratusan Pasangan &amp; Keluarga
          </h2>
          <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-2xl mx-auto">
            Kami bangga menjadi bagian dari momen bahagia Anda. Kepercayaan dan kepuasan klien adalah prioritas utama kami.
          </p>
        </div>
      </Reveal>

      {/* Testimonials Grid */}
      <div className="mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((testimonial, i) => (
            <Reveal key={testimonial.id} direction="scale" delay={delays[i]}>
              <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 border border-stone-100 shadow-soft-elevation testi-card h-full">
                {/* Stars */}
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <StarIcon key={j} />
                  ))}
                </div>
                {/* Quote */}
                <blockquote className="font-serif italic text-stone-700 text-sm leading-relaxed mb-4">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-stone-100">
                  <div
                    className={`w-9 h-9 rounded-full ${testimonial.avatarBg} flex items-center justify-center ${testimonial.avatarText} font-serif font-bold text-sm`}
                  >
                    {testimonial.avatarLetter}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-stone-900">{testimonial.name}</p>
                    <p className="text-[11px] text-stone-500">{testimonial.context}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
