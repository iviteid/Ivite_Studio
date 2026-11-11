# Arsitektur workspace

## Batas modul

### Studio

`studio/index.html` adalah entry point editor. File di `studio/src/core/`
mengatur editor, preview, animasi, audio, dan konfigurasi dasar. Konfigurasi
renderer khusus berada di `studio/src/designs/`, terpisah dari runtime editor.

Direktori berikut sengaja tetap menjadi public roots agar desain tersimpan dan
hasil ekspor lama tetap kompatibel:

- `studio/assets/` — aset bawaan Sage, Prada, dan foto contoh.
- `studio/designs/` — markup, CSS, runtime, dan aset setiap renderer aktif.
- `studio/template/` — renderer template bawaan.

Jangan memindahkan ketiga direktori tersebut tanpa migrasi URL tersimpan.

### Catalog

`catalog/index.html` menampilkan kumpulan tema statis. `catalog/themes/`
berisi tema katalog utama, `catalog/legacy/` menyimpan eksperimen/desain lama,
dan `catalog/shared/` menyediakan CSS, skrip, serta placeholder yang digunakan
tema-tema katalog. `catalog/assets/` dan `catalog/images/` adalah pustaka aset.

Server Studio mengindeks gambar dari `catalog/assets/` dan setiap
`catalog/themes/*/assets/`, lalu menyediakannya melalui `/api/artwork` dan
`/catalog-artwork/` tanpa menyalin file.

## Menambah desain Studio

1. Tambahkan renderer dan asetnya ke `studio/designs/<slug>/`.
2. Tambahkan konfigurasi ke `studio/src/designs/`.
3. Daftarkan desain dalam `studio/src/core/studio.js`.
4. Pastikan URL aset tetap berakar pada `/designs/<slug>/`.
5. Jalankan `npm run check`, lalu uji desain melalui Studio.

## Aturan dependensi

- Core boleh membaca konfigurasi desain; konfigurasi desain tidak boleh
  bergantung pada internals editor.
- Renderer boleh memakai engine bersama di `studio/src/core/`, tetapi aset
  renderer tetap berada di folder renderer masing-masing.
- Catalog tidak menjadi dependensi runtime Studio, kecuali melalui API artwork.
- Output build, cache, dan proyek aplikasi lain tidak disimpan di workspace ini.
