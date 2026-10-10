# Bana Digital Library

Bana adalah situs perpustakaan digital statis yang dibuat dengan Astro, TypeScript, dan Tailwind CSS. Katalog menggunakan data demonstrasi lokal. Status akses pada setiap buku ditampilkan secara eksplisit; tidak ada tautan unduhan atau klaim konten nyata.

## Menjalankan proyek

```bash
npm install
npm run dev
```

Buka `http://localhost:4321`. Untuk pemeriksaan tipe dan build produksi:

```bash
npm run check
npm run build
npm run preview
```

## Struktur

- `src/data/library.ts` — sumber data buku dan kategori.
- `src/components` — komponen antarmuka yang dapat digunakan kembali.
- `src/pages` — rute statis dan dinamis Astro.
- `src/styles/global.css` — token desain dan gaya global Tailwind.

Untuk menambahkan buku, masukkan entri baru pada `seed` di `src/data/library.ts`. Set `available: true` hanya ketika konten yang sah benar-benar tersedia dan hubungkan pembaca dengan sumber tersebut.
