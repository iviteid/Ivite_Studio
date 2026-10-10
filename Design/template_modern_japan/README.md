# Sakura Éternelle

A responsive Next.js App Router wedding invitation for Hana & Ren, using editable sample content and stock photographs.

## Run

```bash
npm install
npm run dev
```

Open http://localhost:3000. `npm run build` creates the production build; `npm start` serves it.

## Personalize

Edit `lib/wedding.ts` for names, date (include the timezone offset), venues, images, maximum guests, approved guestbook messages, optional music URL, and gift account. Editorial prose and timeline are in `components/Invitation.tsx`; the palette and typography are in `app/globals.css`. Replace stock photography with your own before publication. Keep displayed date labels consistent with the configured date.

## Private submissions

Without credentials, RSVP and guestbook forms save local drafts only and say so explicitly. They do not claim responses were sent.

To enable persistence:

1. Run `db/schema.sql` in your Supabase SQL editor.
2. Copy `.env.example` to `.env.local`, set the Supabase URL, server-only service role key, a private invitation code, and wedding ID.
3. Restart the app and privately share the invitation code with guests.

The server validates submissions, enforces the configured guest maximum, and writes to a table with row-level security and no anonymous policies. Never expose the service key. Public guestbook messages are curated in the configuration; responses remain private and unapproved until owner review. This starter uses one shared invitation code and one guest limit; add individual invitation records and rate limiting before a large public launch.

Maps open external Google Maps searches. Calendar downloads contain exact UTC event times. Gallery supports keyboard arrows, Escape, and touch swipes. Animations respect reduced-motion settings. Music appears only after a URL is supplied and only plays after a click. Gifts are hidden until configured.
