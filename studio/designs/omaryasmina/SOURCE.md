# Editable invitation profile

Inspired by the user-supplied reference: https://invitato.net/template-omaryasmina/?code=DUMMY-P0001

The design is implemented locally with its own markup, styling and editable profile. It uses the shared Studio animation, music, placement, gallery and invitation runtime. Downloaded artwork and sample photography are documented in assets/sources.json. Original third-party JavaScript, RSVP APIs, check-in QR codes and commercial soundtracks are not included.

Names, text, dates, pictures, colors, fonts, music, section order/visibility and per-element placement/animation are editable. RSVP and wishes use local browser storage. Standalone HTML embeds the selected artwork and images.

Opening scenery uses the reference’s 16-second original video, remuxed without audio, looping continuously. Editable names and content remain separate. Motion-off and playback failure use a still poster. Standalone HTML embeds the video and poster.

The opening now runs once. Subsequent cycles start at 12 seconds, within the settled scenery. The tail plays forward and back to avoid restarting the entrance or a visible jump; Aurélie’s exit/fade is excluded.
