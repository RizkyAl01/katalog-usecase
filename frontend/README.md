# Katalog Use Case AI Nasional — Frontend

Frontend **AI Sandbox Nasional** (Komdigi). Tahap saat ini: **Beranda**.

Referensi desain & alur ada di folder induk:
`Mockup Komdigi.pdf` (hal. 14–16), `menu-beranda.jpg`, `ALUR-sistem.jpg`, `USER.md`, `fungsibefe.md`.

## Menjalankan di lokal

Prasyarat: Node.js 20+ (sudah diuji dengan Node 22).

```bash
cd frontend
npm install
npm run dev
```

Buka http://localhost:3000

Perintah lain:

| Perintah | Fungsi |
|---|---|
| `npm run build` | Build produksi |
| `npm start` | Menjalankan hasil build |
| `npm run lint` | ESLint |
| `npx tsc --noEmit` | Pemeriksaan tipe TypeScript |

## Stack

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · lucide-react · font Inter.

## Struktur

```
src/
  app/
    page.tsx              Beranda
    layout.tsx            Navbar + Footer untuk semua halaman
    globals.css           Token warna (palet dari mockup)
    katalog/              Katalog sementara (pencarian & filter sederhana) + detail
    layanan/[slug]/       Halaman sementara menu Layanan
    (halaman)/[slug]/     Halaman sementara: ajukan, masuk, daftar, tentang, dll.
  components/             Navbar, Hero, SearchSection, KatalogTabs/Card, RoleSolutions,
                          PartnerCarousel, Footer, ComingSoon
  data/                   DATA CONTOH (mock): katalog, sektor, peran, mitra
  lib/
    katalog.ts            Data layer — satu-satunya pintu akses data untuk komponen
    site.ts               Navigasi, footer, alamat & kontak
    types.ts              Model data
```

## Aturan data

- Beranda bersifat publik (Masyarakat, tanpa registrasi). Yang tampil hanya 3 daftar publik
  (Use Case, Kebutuhan, Riset) dengan status **Publikasi**, sesuai `ALUR-sistem.jpg`.
- Semua angka (statistik hero, Sektor Populer) dihitung dari data, bukan di-hardcode.
- Saat backend tersedia, cukup ganti isi fungsi di `src/lib/katalog.ts` agar memanggil API.

## Yang perlu dilengkapi sebelum rilis

- Kontak resmi (email helpdesk & telepon) di `src/lib/site.ts`. Baris kontak baru muncul di footer bila nilainya terisi.
- Logo mitra resmi di `src/data/mitra.ts` (field `logo`).
- URL resmi Website AIKITA.
- Data contoh di `src/data/` diganti data asli/API (nama pengusul saat ini fiktif).
- `npm audit` melaporkan celah pada `postcss` yang dibundel Next 15. Celah ini hanya berdampak bila memproses CSS
  tak tepercaya; perbaikan resmi memerlukan upgrade ke Next 16.
