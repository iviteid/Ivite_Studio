# Editable invitation profile

Inspired by the user-supplied reference: https://invitato.net/template-clarissasandro/?code=DUMMY-P0001

The design is implemented locally with its own markup, styling and editable profile. It uses the shared Studio animation, music, placement, gallery and invitation runtime. Downloaded artwork and sample photography are documented in assets/sources.json. Original third-party JavaScript, RSVP APIs, check-in QR codes and commercial soundtracks are not included.

Names, text, dates, pictures, colors, fonts, music, section order/visibility and per-element placement/animation are editable. RSVP and wishes use local browser storage. Standalone HTML embeds the selected artwork and images.

The opening uses the reference’s 15-second welcome scene, remuxed without its audio. The scene’s painted ornaments are part of the video; names and invitation content remain separate editable text. The scene loops continuously after opening. Reduced motion and playback failure use the final-frame poster. HTML exports embed both video and poster.

The opening now runs once. Subsequent cycles start at 9 seconds, within the settled scenery. The tail plays forward and back to avoid restarting the entrance or a visible jump; Aurélie’s exit/fade is excluded.
