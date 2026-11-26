[![make.fun](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/c/best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/bagusin03/best-national-statistics-site/rank.svg)](https://make.fun/c/best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/bagusin03/best-national-statistics-site/reward.svg)](https://make.fun/c/best-national-statistics-site-20261126-0539)

# Statistik Nusantara

Situs statistik nasional Indonesia yang statis dan sepenuhnya offline: indikator utama penduduk, ekonomi, kesehatan, pendidikan, ketenagakerjaan, dan daerah — tiap angka disertai sumber dan tahunnya.

## Isi

- **Beranda** — kartu indikator utama (penduduk 281,6 jt, PDB Rp22.139 T, pertumbuhan 5,03%, inflasi 1,57%, pengangguran 4,76%, kemiskinan 8,57%, IPM 75,02, stunting 19,8%) plus chart pertumbuhan dan kemiskinan.
- **Penduduk** — proyeksi penduduk dan provinsi terbesar.
- **Ekonomi** — pertumbuhan PDB 2020–2024 (chart garis/batang yang bisa diganti), inflasi, ekspor, PDB per kapita; data bisa diunduh sebagai CSV.
- **Kesehatan** — stunting 2021–2024 dan cakupan JKN.
- **Pendidikan** — IPM, harapan lama sekolah, rata-rata lama sekolah.
- **Ketenagakerjaan** — pengangguran terbuka 2020–2024.
- **Daerah** — tabel 10 provinsi berpenduduk terbanyak, bisa dicari dan diurutkan, plus chart batang.

## Sumber data

Badan Pusat Statistik (BPS) 2024/2025, Survei Status Gizi Indonesia (SSGI Kemenkes) 2024, dan BPJS Kesehatan 2024. Tahun tercantum pada tiap angka di situs.

## Menjalankan

```sh
node serve.ts
```

Lalu buka http://localhost:8080 — situs statis tanpa build step, tanpa network request, tanpa font atau library eksternal. Chart digambar sendiri dengan SVG.

## Penyerahan

`main.ts` (Node 22, stdlib only) menyalin `app/` dan `screenshots/` ke `/output` dan menulis `dossier.json` dengan `buildDossier` dari `vendor/makefun-frontend.ts`:

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

## Lisensi

MIT — lihat [LICENSE](LICENSE).
