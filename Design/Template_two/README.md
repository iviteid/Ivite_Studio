# Janji — modern Javanese wedding invitation

Built with Astro. Run `npm install`, then `npm run dev`. Use `npm run build` for a static production build.

Edit the `wedding` object at the top of `src/pages/index.astro` to replace the four invitation placeholders. Styling uses warm ivory, antique gold, chocolate brown, and muted terracotta, with custom SVG botanical and palace line art and a subtle Kawung-inspired border.

The Print invitation button opens the browser print dialog. Choose A5, no margins, background graphics enabled, and save as PDF or print. The print layout includes the invitation only. SVG ornaments remain crisp at any resolution. Fonts load from Google Fonts; allow them to finish loading before printing. Physical gold foil requires a separate printer finishing process.

## Photo placeholders

The main fictional bridal portrait is `public/images/couple-editorial.png`. The Little moments gallery features the same fictional couple in three AI-generated photographs: walking hand in hand in a garden, seated in a pendopo, and facing each other in a palace-inspired courtyard. Original PNG assets and optimized `couple-garden.webp`, `couple-pendopo.webp`, and `couple-courtyard.webp` versions are stored in `public/images/`.

Replace these files with your own photos or edit the `photos` array and couple section in `src/pages/index.astro`. Update captions, alt text, dimensions, and AI labels when replacing photos. Photos have a keyboard-accessible full-size dialog. The A5 print view still prints only the invitation card.

## Decorations and motion

Five supplied PNG decorations are integrated using optimized WebP copies in `public/decorations/`; the source files in `public/images/` are preserved. `Decoration.astro` renders non-interactive, screen-reader-hidden ornament. Content reveals once as it enters the viewport; flowers sway gently. Reduced-motion preferences and printing disable animation. Content remains visible without JavaScript.

Additional ambient motion includes floating petals, subtle gold sparkles, slow portrait zoom, butterfly movement, and pointer depth on desktop. The topbar animation toggle pauses motion; reduced-motion preferences disable it. Looping effects pause offscreen and in hidden tabs. A slim reading progress line tracks scrolling.

## Wishes, RSVP and gifts

`src/components/GuestSections.astro` contains the guest form and gift placeholders. Edit its `gift` object for the actual bank, account holder, account number, recipient, and delivery address. Copy buttons use the Clipboard API and show an explanatory fallback if unavailable.

The form is explicitly a browser-local demo: up to 50 entries are stored under `janji-guestbook-v1` in localStorage, persist on reload, and are visible only in that browser. Nothing is sent to the couple and entries are not a shared guestbook. Guests may write wishes only or record attendance with an optional wish; attending guests can specify 1–10 people. Validation, safe text rendering and storage failure messages are included. Connect a real form endpoint/backend before using RSVP for a live event. The new sections are excluded from A5 printing.
