# Undangan pernikahan Korea

Website statis: unggah `index.html`, folder `assets`, `Image`, dan `Songs` ke hosting. CSS hasil build sudah disertakan; Node.js tidak diperlukan di hosting.

## Pengembangan

```sh
npm ci
npm run build
python3 -m http.server 8765 --bind 127.0.0.1
```

Buka `http://localhost:8765`. Jalankan `npm run build` setelah mengubah kelas HTML/JavaScript atau `assets/input.css`. Gunakan `npm run dev` untuk build CSS otomatis selama pengembangan.

- `assets/app.js`: interaksi, hitung mundur, dan konfigurasi URL backend RSVP.
- `assets/input.css`: CSS sumber; `assets/styles.css`: CSS produksi.
- `tailwind.config.cjs`: warna, tipografi, dan pemindaian kelas Tailwind.
- `scripts/build-icons.mjs`: mengambil nama ikon dari HTML/JavaScript dan membatasi font ke ikon yang digunakan; otomatis dijalankan oleh `npm run build`. Jalankan build kembali setelah menambah ikon baru.
- `Image/*.webp`: gambar yang dipakai halaman. PNG asli tetap tersedia untuk penyuntingan.
- `rsvp-backend.gs`: sumber backend Google Apps Script, dikelola dan diterapkan secara terpisah.

Hitung mundur mengacu pada resepsi 24 Oktober 2026 pukul 11.30 WIB. Parameter `?to=Nama%20Tamu` menampilkan nama tamu. RSVP hanya menampilkan sukses setelah menerima respons server; gangguan koneksi mempertahankan isian dan tidak membuat tiket lokal atau mengirim ulang otomatis.

Google Fonts, backend RSVP, serta penyedia gambar QR tetap membutuhkan internet. Konfirmasi kembali isi template, alamat, tautan Google Maps/Calendar, dan rekening sebelum publikasi.

Animasi masuk menggunakan `data-reveal="up|left|right|zoom"` dan opsional `data-reveal-delay="120"` (milidetik, maksimal 180). Setiap blok dianimasikan sekali saat memasuki layar setelah undangan dibuka. Pengaturan perangkat `prefers-reduced-motion` menonaktifkan efek tambahan; konten tetap terlihat tanpa JavaScript.

Dekorasi bunga memakai `srcset` sehingga layar kecil dapat mengambil versi 480 piksel. Burung dara menggunakan versi 448 piksel; aset asli tetap tersedia. Musik memakai `Songs/song.webm` (sekitar 2,86 MB) dengan MP3 sebagai cadangan (3,71 MB), dan baru dimuat setelah interaksi tamu.

Foto lokasi memakai lazy loading. Buku ucapan baru diminta saat bagian RSVP mendekati layar, menampilkan kondisi kosong/gagal secara eksplisit, dan mempertahankan ucapan yang baru terkirim jika respons pembacaan lama tiba belakangan. Pengiriman RSVP tetap satu permintaan tanpa percobaan ulang otomatis.

Pembatasan font menggunakan parameter `icon_names` dari [panduan resmi Material Symbols](https://developers.google.com/fonts/docs/material_symbols). Pada pengukuran Chrome lokal, font ikon turun dari sekitar 1,14 MB menjadi 4,8 KB. Angka ini adalah ukuran unduhan, bukan skor Lighthouse atau jaminan waktu muat di hosting.

Audit ulang pada viewport 390 × 844, DPR 1, dengan cache browser baru: total transfer awal sekitar 1,74 MB → 364 KB (turun 79%). Pengukuran dilakukan sebelum membuka undangan, sehingga musik dan backend RSVP tidak termasuk. Layar dengan DPR lebih tinggi dapat mengambil gambar bunga beresolusi lebih besar.
