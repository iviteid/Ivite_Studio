export interface Feature {
  label: string
  highlight?: boolean
}

export interface Theme {
  id: string
  title: string
  badge: string
  badgeStyle: 'bestseller' | 'editorial' | 'tradisional'
  tagLabel: string
  tagStyle: string
  bgGradient: string
  phoneContent: {
    bg: string
    borderColor: string
    notchColor: string
    label: string
    names: string
    dividerColor: string
    subtext: string
    tag: string
    tagStyle: string
    footerLeft: string
    footerRight: string
    footerBorderColor: string
    textColor: string
    subtextColor: string
  }
  description: string
  features: string[]
  themeNumber: string
  themeNumberStyle: string
  demoHref: string
  waHref: string
}

export interface Testimonial {
  id: string
  quote: string
  name: string
  context: string
  avatarLetter: string
  avatarBg: string
  avatarText: string
}
