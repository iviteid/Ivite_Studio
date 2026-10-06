import type { Theme } from '@/types'

interface ThemeCardProps {
  theme: Theme
}

export default function ThemeCard({ theme }: ThemeCardProps) {
  const { phoneContent: pc } = theme

  const badgeClass =
    theme.badgeStyle === 'bestseller'
      ? 'bg-white/95 text-stone-900 border border-stone-200/80'
      : theme.badgeStyle === 'editorial'
      ? 'bg-stone-900 text-white'
      : 'bg-amber-200 text-amber-950 border border-amber-300'

  return (
    <div className="bg-white rounded-3xl overflow-hidden border border-amber-200/70 shadow-soft-elevation hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group">
      <div>
        {/* Card Header with Phone Mockup */}
        <div
          className={`relative ${theme.bgGradient} p-7 pb-5 flex flex-col items-center justify-center border-b border-stone-100 overflow-hidden`}
        >
          <span className={`absolute top-4 left-4 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full z-10 shadow-xs ${badgeClass}`}>
            {theme.badge}
          </span>
          <span className={`absolute top-4 right-4 text-[10px] font-semibold tracking-wide px-3 py-1 rounded-full z-10 shadow-xs ${theme.tagStyle}`}>
            {theme.tagLabel}
          </span>

          {/* Phone Mockup */}
          <div
            className={`w-48 h-64 rounded-2xl ${pc.bg} shadow-xl border-2 ${pc.borderColor} p-3 mt-4 flex flex-col items-center justify-between text-center relative group-hover:scale-105 transition-transform duration-300`}
          >
            <div className={`w-14 h-1 rounded-full ${pc.notchColor} mb-2`} />
            <div className="flex flex-col items-center my-auto px-2">
              <span className={`text-[8px] sm:text-[9px] tracking-[0.2em] uppercase font-semibold mb-1 ${theme.id === 'minimalist-serif-noir' ? 'text-stone-400 tracking-[0.3em]' : theme.id === 'puspa-nusantara-jawa' ? 'text-[#D8B467]' : 'text-[#A8823B]'}`}>
                {pc.label}
              </span>
              <p className={`font-serif text-lg font-bold leading-tight mb-1 ${theme.id === 'minimalist-serif-noir' ? 'tracking-wide' : ''} ${pc.textColor}`}>
                {pc.names}
              </p>
              <div className={`w-6 h-px ${pc.dividerColor} my-2`} />
              <p className={`text-[8px] italic ${pc.subtextColor}`}>{pc.subtext}</p>
              <span className={`mt-3 text-[8px] px-2 py-0.5 rounded-full font-medium ${pc.tagStyle}`}>
                {pc.tag}
              </span>
            </div>
            <div className={`w-full flex items-center justify-between text-[8px] pt-1 border-t ${pc.footerBorderColor} ${theme.id === 'minimalist-serif-noir' ? 'text-stone-500' : theme.id === 'puspa-nusantara-jawa' ? 'text-amber-400/70' : 'text-stone-400'}`}>
              <span>{pc.footerLeft}</span>
              <span>{pc.footerRight}</span>
            </div>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-6 sm:p-7">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-serif font-bold text-xl text-stone-900 group-hover:text-[#A8823B] transition-colors">
              {theme.title}
            </h3>
            <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${theme.themeNumberStyle}`}>
              {theme.themeNumber}
            </span>
          </div>
          <p className="text-xs text-stone-500 leading-relaxed mb-4">{theme.description}</p>
          <div className="flex flex-wrap gap-1.5 mb-2 text-[10px] text-stone-600">
            {theme.features.map((f) => (
              <span key={f} className="bg-stone-100 px-2.5 py-1 rounded-md">
                {f}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="px-6 sm:px-7 pb-6 pt-2 border-t border-stone-100 flex items-center gap-3">
        <a
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border border-stone-200 text-xs font-semibold text-stone-700 hover:bg-stone-50 transition-colors shadow-xs"
          href={theme.demoHref}
        >
          <svg className="w-3.5 h-3.5 text-stone-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
            <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Live Demo
        </a>
        <a
          className="flex-1 inline-flex items-center justify-center py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#A8823B] to-[#C5A059] text-xs font-semibold text-white shadow-md shadow-amber-900/15 hover:from-[#947230] hover:to-[#B6914B] transition-all"
          href={theme.waHref}
          rel="noopener noreferrer"
          target="_blank"
        >
          Pilih Desain
        </a>
      </div>
    </div>
  )
}
