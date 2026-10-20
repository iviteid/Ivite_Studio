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
