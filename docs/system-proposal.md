# ivite — Proposal Sistem Undangan (DRAFT)

> **Status: USULAN, BELUM DIKUNCI.** Keputusan schema, hosting, dan pricing adalah
> keputusan dua pihak → butuh persetujuan **aqua-tny + Dani** sebelum diimplementasi/di-merge.
> Dokumen ini dibuat agar bisa dibahas bersama. Tidak ada tabel/koleksi yang dibuat dari dokumen ini.

Tanggal draft: 2026-10-13 · Pengusul: aqua-tny (via Claude Code)

---

## 1. Tujuan
Menjadikan katalog undangan ivite bukan sekadar mockup desain statis, melainkan
**sistem undangan digital seperti Invitato**: interaktif, sinematik, personal per tamu,
dengan RSVP & buku tamu yang benar-benar tersimpan.

## 2. Apa yang SUDAH jadi (tanpa backend, sudah berjalan)
Lapis interaktif front-end sudah dibangun & diuji di **Sekar Prada** (`shared/invite.js`):
- Nama tamu otomatis dari link: `?kepada=Nama%20Tamu`
- Hitung mundur **live** ke tanggal acara
- Salin nomor rekening (clipboard) + feedback
- Simpan ke kalender (unduh `.ics`)
- Buka peta (Google Maps)
- Galeri **lightbox** (zoom + navigasi + keyboard)
- Musik on/off (sumber audio OFL dipasang nanti)
- Elemen botani **melayang** (parallax) + animasi sinematik (draw-on, Ken Burns, debu emas)
- RSVP & buku tamu → **DEMO localStorage** (belum tersimpan ke server)

Yang belum: **persistensi nyata** (RSVP, buku tamu, daftar tamu) → butuh backend di bawah ini.

## 3. Rekomendasi arsitektur
**Static front-end (tema HTML/CSS/JS) + backend serverless + database terkelola.**
- Front-end tetap seperti sekarang (cepat, murah, bisa di-CDN).
- Backend minimal: beberapa endpoint untuk RSVP, buku tamu, dan render data undangan.
- Alternatif yang perlu diputuskan bersama (lihat §7): Supabase/Postgres, Firebase, atau
  Vercel Functions + DB. Belum dipilih.

## 4. Model data (USULAN — belum dikunci)
Entitas inti:

- **invitation** — satu undangan milik klien.
  `id, slug, theme_id, couple_a, couple_b, events[], gift_accounts[], gallery[], music_url,
   quote, status, created_at`
- **guest** — tamu & link personal.
  `id, invitation_id, name, salutation, group, token (untuk ?kepada=/link unik), max_pax, invited_at`
- **rsvp** — konfirmasi kehadiran.
  `id, invitation_id, guest_id, attending (enum), pax, created_at`
- **wish** — ucapan/buku tamu.
  `id, invitation_id, guest_id, name, message, created_at, approved (bool)`
- **theme** — metadata tema desain (katalog).
  `id, name, slug, origin, palette_variants[], badges[]`
- *(opsional, fase pricing)* **order / plan** — paket yang dibeli klien.

Catatan relasi: invitation 1-N guest, guest 1-N rsvp/wish, invitation N-1 theme.

## 5. Skema link personal
- Link tamu: `/<slug>/?kepada=<token-atau-nama>`
- Token tamu dipakai untuk pra-isi nama + mengaitkan RSVP/ucapan ke `guest_id`.
- Tanpa token → mode umum ("Bapak/Ibu/Saudara/i"), RSVP tetap bisa (tanpa guest_id).

## 6. Endpoint (USULAN)
- `GET  /api/inv/:slug` → data undangan (publik, read-only)
- `POST /api/inv/:slug/rsvp` → { token?, name, attending, pax }
- `GET  /api/inv/:slug/wishes` → daftar ucapan (approved)
- `POST /api/inv/:slug/wishes` → { token?, name, message }
- (admin) CRUD invitation/guest → di balik auth klien.

## 7. Keputusan yang WAJIB disepakati berdua (aqua-tny + Dani)
1. **Pilihan stack backend & DB** (Supabase vs Firebase vs Vercel+Postgres, dll).
2. **Schema-lock** — finalisasi tabel/koleksi di §4 (penamaan, tipe, index, relasi).
3. **Moderasi buku tamu** — ucapan perlu approval sebelum tampil atau tidak.
4. **Privasi data tamu** — penyimpanan nama/no. rekening, retensi, siapa yang bisa akses.
5. **Pricing/paket** (jika masuk fase komersial).
6. **Hosting & domain** (ivite.id), environment, backup.

## 8. Privasi & keamanan (prinsip)
- Nomor rekening & data tamu = data pribadi → jangan di URL/query, akses terbatas.
- Endpoint publik hanya read untuk data undangan; tulis (RSVP/wish) rate-limited + validasi.
- Buku tamu sebaiknya ada moderasi (anti-spam).

## 9. Rencana bertahap (usulan)
- **Fase A (jalan sekarang):** matangkan front-end Sekar Prada (interaktif penuh) + varian palet.
- **Fase B (butuh ACC berdua):** pilih stack + kunci schema → implement RSVP & buku tamu nyata.
- **Fase C:** panel admin klien (kelola tamu, lihat RSVP), lalu replikasi ke tema lain.
- **Fase D (opsional):** pricing, pembayaran, domain produksi.

---
*Begitu §7 disetujui kamu + Dani, baru aku bangun Fase B dan buat PR untuk di-review.*
