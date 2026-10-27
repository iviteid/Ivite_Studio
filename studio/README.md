# ivite Studio

A local digital invitation design workspace inspired by Sekar Sage, with Sage and Prada artwork collections. The original theme folders are preserved.

## Run on Windows

Double-click **Start Studio.cmd**. Python must be installed. Keep its server window open while editing.
Studio uses `http://127.0.0.1:8081/`. The launcher reuses a running Studio at that address.
For a manual launch: `python start-studio.py` from this folder. A generic static server does not provide the catalog artwork connection.
Use the same browser and address each time: browser storage belongs to that exact address.
Do not open index.html through file://; exports and the preview need HTTP.

## Design tools

- **Designs**: apply Sekar Sage or Sekar Prada palettes and the default artwork collection. Existing text and explicitly replaced layers stay intact.
- **Content**: edit names, cover, headings, body copy, event details, button text, form labels, and navigation. Event time uses Jakarta (UTC+7).
- **Elements**: choose a layer; mix artwork from either collection or upload PNG, JPG, WebP, SVG, GIF or AVIF. Adjust size, offsets, rotation and opacity. Hide or reset layers. A layer's settings affect all its uses in the invitation. Painted artwork colors are changed by replacing the image, not the color tokens.
- **Colors**: nine independent theme colors.
- **Typography**: heading and body font families, name and heading sizes, body size, line height and heading letter spacing. Fonts use Google Fonts, with local fallbacks.
- **Photos**: upload portraits, add gallery images, reorder or remove photos.
- **Layout**: reorder and toggle seven sections; change event-card arches and entrance animation.

The live preview supports mobile and wide widths, section navigation, and restart. On narrow screens, use Preview invitation to switch between editing and viewing. Undo/redo covers design edits within the current session; changing a design name is not part of design history.

## Save, import and export

Changes autosave to IndexedDB in this browser. **My designs** supports creating, copying and opening separate invitations. Local storage is not a cloud backup: export editable projects regularly and before clearing browser data.

**Export invitation** offers:

1. A standalone HTML invitation containing the selected artwork, photos, styles, configuration and renderer. Open the downloaded HTML or host it as an index.html. Google Fonts and outbound maps still require an internet connection.
2. An editable `.ivite.json` project containing the full configuration and uploaded images. Import creates a new design and also accepts the older configuration-only JSON format.

Guest personalization works via `?to=Guest%20Name` on hosted invitations. Uploaded artwork remains local until you share or publish an export. Image upload limit: 12 MB per image; exports embed the original bytes.

## RSVP

RSVP is explicitly a local browser demo. It stores confirmations in the guest's browser only. It does not send responses to the couple and does not create a shared guest list. Real collection needs a backend or external RSVP service, which is outside this version.

## Files

`index.html`, `config.js`, `studio.js`, `studio.css`: editor, design defaults and controls.
`template/`: invitation markup, renderer and styles used for preview and export.
`assets/sage/`, `assets/prada/`, `assets/photos/`: local artwork and sample photographs.

## Verification

Checked text, artwork upload/replacement, layer transforms, colors, fonts, undo/redo, section visibility and order, design copies and reload persistence, project import/export, standalone HTML artwork and interaction, and desktop/mobile layouts. RSVP is a demo, not server delivery.

## Connected catalog artwork

Elements → Artwork collection reads image files directly from `invitation_catalog/assets/` and `invitation_catalog/themes/*/assets/`. Nested subfolders become separate collections. Original files are used in place, without copying them into Studio. Use filename search to find an image and **Refresh folder** after adding or removing files. The built-in Studio Sage/Prada collections remain available.

The local launcher serves `/api/artwork` for the current folder index and `/catalog-artwork/` for allowed images. Other catalog files are not exposed through these routes. The server stays on loopback. Catalog artwork is embedded into standalone HTML exports; editable projects retain their catalog paths.

## Sekar Sage renderer

The invitation template now derives directly from `themes/sekar-sage/index.html`, `style.css`, `cinematic.css`, `gallery.css`, and `invitation.js`; the original theme folder is unchanged. It retains the original cover garden, continuous illustrated scene and botanical frame, 5.4-second entrance, large portraits, story timeline, eight-photo gallery with captions and dialog viewer, active navigation, motion pause, reduced-motion behavior, desktop scene, and local-demo RSVP form with party size.

Use **Play invitation** to restart and play the real entrance inside Studio. The Viewing menu jumps directly to a section for editing. Older designs migrate default-only text and typography to the source theme while preserving customized text, images and layout choices. Story and garden artwork have their own editor controls.

## Cinematic journey

Layout → Entrance direction offers **Cinematic journey** (default) and **Original Sekar Sage**. The new entrance uses one adjustable 6–14 second clock (9 seconds by default) for mist, layered camera movement, pavilion and garden reveals, descending arch, floral curtains, staggered name reveals, warm light, dust, and opening/closing cinematic framing. Atmosphere controls the light and particles. **Lewati intro** skips immediately to the invitation. Restart cancels the active sequence; reduced-motion preferences and disabling Cinematic entrance bypass it. All entrance settings and effects are included in HTML and project exports.

The lower garden remains in its final position when the entrance completes. Navigation fades/slides in over 18% of the cinematic sequence, settling before its end, and its background uses 68% opacity to let the artwork show through.

The invitation reserves a stable scrollbar gutter before scrolling unlocks. On mobile, the fixed illustrated panel uses the available viewport width rather than 100vw so the arch remains centered without clipping into the reserved gutter.

The cinematic handoff keeps the completed visual tracks attached instead of replacing them with freshly started idle animations. Scene and title movement settle early; completion follows the overlay's actual animationend event, with a delayed fallback. Skipping/jumping explicitly finishes finite animation tracks, and replay starts a fresh sequence. This prevents cloud drift/flower rotation resets and cuts in the last text reveal.

The separate **Cinematic gateway** option opens a dark sage gateway onto the landscape. **Cinematic journey** remains the previous entrance and the default selection. Near and distant mist move in opposite directions while the pavilion, mountains and foreground flowers pull back at different depths. A warm halo fades before the staggered name reveal. These effects share the existing duration, atmosphere, skip and reduced-motion controls; completed scene tracks retain their final positions through the handoff.

The Mobile preview uses a 390 × 780 (9:18) viewport. The complete device scales to fit the workspace without changing the invitation layout; Wide uses 720 × 780.

Content → Event details includes GPS coordinates in latitude, longitude format (for example -7.7956, 110.3695). Lihat lokasi opens a Google Maps universal URL using valid coordinates; blank coordinates use the existing map search/address. Invalid coordinates are flagged and disable the location link. Settings are included in saved designs and exports. Mobile app opening depends on the device's Google Maps installation and link settings; otherwise the web map opens.

## Imported Gusti & Zidni design
Designs → Gusti & Zidni → Open creates a separate editable invitation from andika-putri-wedding-main/dist. The imported layout, original botanical opening, photos, artwork, gift cards and local RSVP remain available. Content includes the original text groups; Elements includes original artwork and layer transforms. Saved projects remember their renderer. Export HTML embeds the imported renderer, artwork and soundtrack.

## Music
The Music tab works with both renderers. Upload MP3, M4A, OGG, WAV or WebM (up to 20 MB), enable/disable music, adjust volume, and choose whether it starts when the invitation is opened. Guests have a play/pause button. Uploads remain in browser storage and are embedded in project/HTML exports. Playback requires a guest gesture and browser audio-format support. The imported design starts with its original local soundtrack.

## Element animations
The Animations tab discovers artwork, photos, text, buttons, cards, sections and decorative elements in both renderers. Filter by element type or use Pick element in preview. Matching text/artwork instances share a setting; stagger can offset their start times.

Choose entrance effects (fade, directional slide, zoom), reveals (soft focus, curtain, circle), emphasis (bounce, pulse, swing, shake, rotation), ambient movement (float, drift, breathing), or lift interaction. Controls include duration, delay, intensity, easing, looping, stagger and visible/entrance/hover triggers. Preview animation tests a selected element; Reset restores the original design motion. Existing designs default to their original animation.

Custom transforms compose with the existing placement. Motion observes the global Cinematic entrance switch and reduced-motion preferences; loops pause offscreen. Saved projects and HTML exports include the per-element settings and runtime.

## Position any element
The Position tab uses the same element discovery as Animations and adds control over individual copies. Choose an element and copy, or pick it in the preview. Drag elements in preview moves the selection directly; turn drag mode off to use invitation links and scrolling normally. X/Y inputs, arrow nudges (1/5/10/25 pixels), scale and rotation are available.

Shared and individual offsets add together. Placement composes with existing layer adjustments and animations, remains active when motion is disabled, and uses invitation pixels independent of editor zoom. Reset position removes only the selected copy/group setting; Undo and saved projects/HTML exports include placement changes.

## Botanical Garden · Romi & Nadia
Designs → Romi & Nadia → Open creates a separate editable botanical invitation inspired by the supplied [Romi & Nadia reference](https://invitato.net/template-rominadia/?code=DUMMY-P0001). It has a white-flower garden cover, a camera-and-flower entrance, desktop portrait panel, couple profiles, story, countdown, three events, RSVP, two gift accounts, optional live-stream link, photo lightbox and closing. Existing designs remain in My designs.

Content includes Garden details, Wedding gift and Live streaming. Clear the tea ceremony name to hide that event. Add an account number to enable its copy button, and an HTTP(S) streaming URL to show the streaming card. Date input uses Jakarta time; this Bali sample displays the calendar date in Asia/Makassar. Music, artwork, typography, colors, per-element animation/position, section visibility/order and standalone/project exports use the existing Studio controls.

RSVP and wishes are explicitly local browser records, with no shared guest database, check-in QR code or external submission. Sample account numbers are blank and no commercial soundtrack is bundled. Sample photos and decorative images were obtained from the user-supplied reference; image source URLs are recorded in designs/rominadia/assets/sources.json. The renderer is implemented locally and makes no requests to the reference's guest-data API. Replace the sample photos/content with the couple's own materials before sharing.

Verified mobile artwork, live editing, valid/invalid GPS, gallery empty/repopulate, gift fields, section ordering/visibility, reduced-motion entrance bypass, entrance replay/completion, placement with motion disabled, local RSVP/wishes, lightbox navigation, responsive overflow and standalone HTML embedding.

## Silver Blue · Lxa & Clarashinta
Designs → Lxa & Clarashinta → Open adds a separate editable design inspired by the supplied [Clara & Lxa reference](https://invitato.net/template-claralxa/?code=DUMMY-P0001). The photographic cover has dusty-blue and silver flowers, floating petals, glitter, a fountain and a slow camera opening. It includes a desktop photo/quote panel, couple portraits, story, countdown, two events, RSVP, gift accounts, optional streaming, gallery and closing. Dates display in Jakarta time.

Photos includes dedicated cover and desktop replacements. Elements names the fountain, glitter, petals, orchids, lilies, portrait frame and floor. Content, typography, colors, music, animations, per-copy placement, layout, saving and exports use the Studio controls. The shared botanical renderer is selected explicitly during standalone export; each design keeps its own markup, stylesheet, default configuration and assets.

RSVP/wishes remain local to the guest browser. No reference-site RSVP service, QR check-in, account numbers or soundtrack are included. Decorative/sample photo URLs are documented in designs/claralxa/assets/sources.json. Verified responsive artwork, live text, map validation, section ordering/visibility, entrance/replay, position and animation composition, local RSVP, gallery/lightbox and independent HTML export.

## Latest Andika Putri folder design
Designs → Gusti & Zidni · Latest → Open imports the current `D:/ai/andika-putri-wedding/dist` as a separate editable invitation. The original folder contains Gusti & Zidni content; its newer source artwork, mountain layers, mobile optimizations and staged entrance are retained. The earlier Gusti & Zidni design is still available.

Content, artwork, typography, music, animations, element placement and layout use the Studio controls. The original entrance supports replay and preview navigation; calendar/GPS and gift-copy links use edited values. Local RSVP records are separated from the older renderer. HTML export embeds the current renderer, images and selected song. The source folder can be previewed separately at `http://127.0.0.1:8083/` while its local server is running.

## Three additional invitation profiles
Designs now also includes **Clarissa & Sandro · Javanese Lilac**, **Omar & Yasmina · Golden Arch**, and **Aurélie & Noah · Ivory Garden**, each as a separate saved invitation. Their carved gate/lilac trees, gilded arch/pastel flowers, and modern ivory garden/wayang compositions follow the supplied references. Each profile has its own markup, CSS, images and editable defaults in collection-designs.js; the shared renderer is selected explicitly for exports.

Photos supports cover-background and desktop-photo replacement alongside portraits/gallery. Elements lists the full downloaded artwork collection with design-specific labels. Layout, colors, fonts, music, element animation and per-copy positioning work across all three. The gate, arch and garden have separate entrance tracks. Aurélie & Noah also exposes a second event date, venue, address and GPS/map search; the second date displays in Singapore time while date inputs are entered in Jakarta time. Its labels and date formatting are English.

Reference images and sample photographs are recorded in each assets/sources.json. No reference-site RSVP backend, QR access service or soundtrack is bundled. RSVP/wishes remain local browser records. Verified mobile layouts, live edits, map validation, section ordering/visibility, replay/motion bypass, placement + animation, gallery/lightbox, local RSVP, the second event's timezone/venue/map, persistence and independent standalone exports.
