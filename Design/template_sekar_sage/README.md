# Sekar Sage

The invitation now uses a continuous illustrated stage: cover, a 5.4-second entrance sequence (birds, landscape, garden, descending arch, names), blessing, couple, story, ceremony/reception, RSVP and closing. The botanical frame remains fixed while the content scrolls. The entrance plays through automatically without a skip button; reduced-motion preferences bypass it automatically. `cinematic.css` contains the stage layout and entrance sequence; the original artwork remains in `assets/`.

Animated invitation using all ten supplied illustrations. Open `index.html` through a local HTTP server or static host. The catalog links to this theme.

Edit the `invitation` object at the beginning of `invitation.js` for names, parents, event times, date, venue and address. These currently contain illustrative sample details. Set `demo: false` and update the visible demo copy only after real details are supplied.

Guest personalization: `index.html?to=Nama%20Tamu`. Names and wishes are always rendered as text.

RSVP defaults to a local browser demo. It does not send or share responses. Set `rsvpEndpoint` to a working HTTPS JSON endpoint to collect responses; configure CORS on that endpoint if needed. Do not remove the demo disclosure without configuring and testing actual delivery.

Features: animated cover, layered transparent artwork, responsive split desktop layout, scroll reveals, countdown in Jakarta time, downloadable calendar event, map link, guest personalization, local RSVP, keyboard access, reduced-motion support and a pause control.

Artwork is supplied by the user; the Invitato reference informed the layered invitation experience. No reference-site artwork or code is copied.
