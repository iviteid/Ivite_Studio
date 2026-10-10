# A little forever

An Astro wedding invitation inspired by contemporary Seoul stationery. Includes an AI-generated fictional couple photograph, editable invitation copy, browser-local saving, and an A5 print stylesheet.

## Run

```sh
npm install
npm run dev
```

## Build

```sh
npm run build
npm run preview
```

Use **Make it yours** to edit names, date, time/venue, and message. Changes are stored only in this browser. Use **Print your invitation**, choose A5, enable background graphics, and disable browser headers/footers. The card is 148 × 210 mm. Browser PDF text and line art are vector; this is not a CMYK/bleed-ready commercial press file. For a 300 DPI raster export, use 1748 × 2480 pixels; the embedded photograph's native resolution may limit effective print detail.

Typography: Cormorant Garamond, DM Sans, Nothing You Could Do via Google Fonts (with local system fallbacks). The photo is a fictional generated couple; replace `src/assets/seoul-couple.png` with your own portrait when personalizing.

Asset generation: built-in imagegen. The exact prompt is saved in `image-prompt.txt`.

## Guest experience

The opening screen uses two animated window panels. It supports keyboard navigation and reduced-motion preferences. A floating menu links to the invitation, gallery, RSVP, wishes, and wedding gifts. Gallery photos open in a dialog.

RSVP and wishes are explicitly local demos: each browser has its own list. Nothing is submitted to a server. RSVP entries with the same name update that browser's previous response. The attendance list can be exported as CSV. If browser storage fails, the form reports that the entry was not saved. Bank details are editable using **Make it yours**; the copy button stays disabled until an account number is supplied. Bank and invitation edits are also browser-local.

The two extra wedding photographs were generated with built-in imagegen using the original fictional couple as a reference. They are stored in `src/assets/seoul-garden.png` and `src/assets/seoul-closeup.png`.

## Asset optimization

Source PNGs live in `src/assets` and are processed at build time into responsive WebP images. The page requests optimized variants; Astro may also emit imported originals in `dist/_astro`, but those are not requested by the page. The opening photo loads eagerly, while the invitation and gallery use lazy loading. Full gallery images load when a visitor opens the lightbox.
