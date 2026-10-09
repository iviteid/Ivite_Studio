# Janji — modern Javanese wedding invitation

Built with Astro. Run `npm install`, then `npm run dev`. Use `npm run build` for a static production build.

Edit the `wedding` object at the top of `src/pages/index.astro` to replace the four invitation placeholders. Styling uses warm ivory, antique gold, chocolate brown, and muted terracotta, with custom SVG botanical and palace line art and a subtle Kawung-inspired border.

The Print invitation button opens the browser print dialog. Choose A5, no margins, background graphics enabled, and save as PDF or print. The print layout includes the invitation only. SVG ornaments remain crisp at any resolution. Fonts load from Google Fonts; allow them to finish loading before printing. Physical gold foil requires a separate printer finishing process.

## Photo placeholders

Example photos are stored locally in `public/images/`: `couple-editorial.png` (AI-generated fictional couple), `rings.jpg`, `bouquet.jpg`, and `reception.jpg`. Replace these files with your photos, or edit the `photos` array and couple section in `src/pages/index.astro`. Sample-photo attribution links are shown below the images; update captions, alt text, and credits when replacing the photos. Photos have a keyboard-accessible full-size dialog. The A5 print view still prints only the invitation card.

## Decorations and motion

Five supplied PNG decorations are integrated using optimized WebP copies in `public/decorations/`; the source files in `public/images/` are preserved. `Decoration.astro` renders non-interactive, screen-reader-hidden ornament. Content reveals once as it enters the viewport; flowers sway gently. Reduced-motion preferences and printing disable animation. Content remains visible without JavaScript.

Additional ambient motion includes floating petals, subtle gold sparkles, slow portrait zoom, butterfly movement, and pointer depth on desktop. The topbar animation toggle pauses motion; reduced-motion preferences disable it. Looping effects pause offscreen and in hidden tabs. A slim reading progress line tracks scrolling.
