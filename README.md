# ivite Invitation Workspace

Workspace ini hanya berisi Studio, desain undangan, aset, dan tooling yang
langsung mendukung pengembangan undangan digital.

## Mulai

```bash
npm run studio
```

Studio tersedia di `http://127.0.0.1:8081/`. Di Windows, jalankan
`studio/Start Studio.cmd`.

Untuk meninjau katalog tema statis secara terpisah:

```bash
npm run catalog
```

Katalog tersedia di `http://127.0.0.1:8080/`.

## Struktur

- `studio/` — editor undangan, renderer aktif, aset, dan server lokal.
- `catalog/` — katalog tema, desain legacy, aset, dan komponen bersama.
- `docs/` — keputusan arsitektur dan panduan pemeliharaan.
- `scripts/` — pemeriksaan struktur workspace.

Proyek lama, output PDF, dan file sementara dipertahankan di direktori saudara
`../invitation_catalog_external/`; tidak diperlukan untuk menjalankan Studio.

Lihat [docs/architecture.md](docs/architecture.md) sebelum menambah renderer
atau memindahkan aset.
