import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'Plus Jakarta Sans', 'sans-serif'],
        serif: ['var(--font-fraunces)', 'Fraunces', 'Georgia', 'serif'],
        handwriting: ['var(--font-pacifico)', 'Pacifico', 'cursive'],
      },
      colors: {
        brand: {
          gold: '#C5A059',
          goldDark: '#A8823B',
          rose: '#E8B4B8',
          warmIvory: '#FAF7F2',
          dark: '#1C1917',
          grayText: '#78716C',
        },
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
        'bounce-subtle': 'bounce 3s ease-in-out infinite',
        ping: 'ping 1.5s cubic-bezier(0,0,0.2,1) infinite',
      },
    },
  },
  plugins: [],
}

export default config
