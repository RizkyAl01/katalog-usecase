# Katalog Use Case AI Nasional — Frontend

Frontend **AI Sandbox Nasional** (Komdigi).
Tahap saat ini: **Beranda**, **Masuk/Registrasi**, dan **dashboard awal per peran** (mode demo, tanpa database).

Dokumen acuan ada di folder induk:
- [PRD.md](../PRD.md): objective, peran, alur, fitur, dan status implementasi.
- [webui.md](../webui.md): ringkasan setiap halaman mockup, token desain, dan menu sidebar.
- `Mockup Komdigi.pdf`, `Progress Sandsi 26 Okto 2026.pptx` (slide 16–35), `USER.md`, `fungsibefe.md`, `ALUR-sistem.jpg`.

## Menjalankan di lokal

Prasyarat: Node.js 20+ (sudah diuji dengan Node 22).

```bash
cd frontend
npm install
npm run dev
```

Buka http://localhost:3000.

Untuk mode produksi (`npm run build && npm start`), isi dulu `AUTH_SECRET` di `.env.local`. Formatnya ada di `.env.example`.
Mode `npm run dev` tetap berjalan tanpa `.env.local` karena memakai secret khusus pengembangan.

| Perintah | Fungsi |
|---|---|
| `npm run build` | Build produksi |
| `npm start` | Menjalankan hasil build |
| `npm run lint` | ESLint |
| `npx tsc --noEmit` | Pemeriksaan tipe TypeScript |

## Akun demo

Semua akun memakai password **`Demo#2026`**. Daftar akun juga tampil di halaman Masuk, lengkap dengan tombol "Isi otomatis".

| Email | Peran | Dashboard |
|---|---|---|
| `penyedia@demo.test` | Penyedia Use Case | `/konsol/penyedia` |
| `pengguna@demo.test` | Pengguna Use Case | `/konsol/pengguna` |
| `inovator@demo.test` | Inovator Use Case | `/konsol/inovator` |
| `reviewer@demo.test` | Reviewer (K/L) | `/konsol/reviewer` |
| `regulator@demo.test` | Regulator / Admin Komdigi | `/konsol/regulator` |
| `investor@demo.test` | Investor (dashboard ditunda) | `/konsol/investor` |

## Autentikasi (mode demo)

- **Login** dijalankan lewat server action `masuk`. Kredensial dicocokkan dengan akun demo (`src/lib/auth/akun-demo.ts`) secara waktu konstan.
  Kalau berhasil, session disimpan sebagai JWT HS256 di cookie `aisn_sesi` (HttpOnly, SameSite=Lax, Secure di produksi).
  Tanpa "Ingat saya", cookie hilang saat browser ditutup dan token kedaluwarsa dalam 8 jam. Dengan "Ingat saya", cookie bertahan 30 hari.
- **Proteksi** berlapis dua:
  - `src/middleware.ts` menolak akses `/konsol/*` tanpa session dan mengarahkan pengguna ke konsol miliknya bila membuka konsol peran lain.
  - Setiap halaman konsol memeriksa ulang lewat `wajibPeran()` (`src/lib/auth/dal.ts`).
- **Redirect setelah login** (`?next=`) hanya diterima bila mengarah ke konsol milik peran itu sendiri, untuk mencegah open redirect.
- **Registrasi** (`/daftar`, `/daftar?jenis=kl`) divalidasi penuh di klien dan di server (`src/lib/registrasi/validasi.ts`).
  Aturannya mencakup sandi kuat, NIB 13 digit, NIP 18 digit, email `.go.id` untuk K/L, serta dokumen .pdf/.jpg maks. 5 MB (K/L hanya .pdf).
  **Data tidak disimpan.** Setelah lolos validasi, halaman menampilkan alur verifikasi sesuai spesifikasi.

## Struktur

```
src/
  middleware.ts               Proteksi /konsol/*
  app/
    layout.tsx                <html>/<body> + font
    (publik)/                 Navbar + Footer
      page.tsx                Beranda
      masuk/, daftar/         Login & registrasi
      katalog/, layanan/, (halaman)/[slug]/   Katalog sementara & halaman placeholder
    (konsol)/konsol/[peran]/  Sidebar + dashboard per peran; [...slug] = menu yang belum dikembangkan
    api/sesi/                 Status login untuk Navbar (halaman publik statis)
    keluar/                   Membersihkan session tidak valid
  components/
    auth/                     FormMasuk, FormRegistrasiUmum/KL, FormBagian
    konsol/                   Sidebar, Dasbor (header/metrik/tabel), DashboardPeran, DashboardRegulator
  data/                       DATA CONTOH (mock): katalog, sektor, peran, mitra, konsol
  lib/
    auth/                     peran, session (JWT), akun-demo, dal, actions
    registrasi/               validasi (dipakai klien & server), actions
    konsol/                   menu sidebar per peran, data dashboard
    katalog.ts, site.ts, types.ts
```

## Aturan data

- Beranda bersifat publik (Masyarakat, tanpa registrasi). Yang tampil hanya 3 daftar publik
  (Use Case, Kebutuhan, Riset) dengan status **Publikasi**, sesuai `ALUR-sistem.jpg`.
- Semua angka (statistik, metrik dashboard) dihitung dari data, bukan di-hardcode.
- Komponen mengakses data hanya lewat `src/lib/katalog.ts` dan `src/lib/konsol/data.ts`. Saat backend tersedia, cukup ganti isi fungsi di kedua file itu.

## Menuju backend nyata

1. Ganti `src/lib/auth/akun-demo.ts` dengan tabel pengguna. Password di-hash dengan argon2/bcrypt, plus status akun: menunggu verifikasi email, menunggu approval admin (K/L), atau aktif.
2. Simpan hasil registrasi di `src/lib/registrasi/actions.ts`, lalu kirim email aktivasi dan simpan dokumen ke storage.
3. Tambahkan rate limiting pada login dan registrasi.
4. Ganti data contoh di `src/data/` dengan query per akun.

## Yang perlu dilengkapi sebelum rilis

- Foto latar halaman Masuk (`public/images/login-*.webp`) diambil dari mockup. Foto ini pratinjau **Unsplash+** yang masih bertanda air, jadi wajib diganti foto berlisensi.
- Kontak resmi (email helpdesk & telepon) di `src/lib/site.ts`. Baris kontak baru muncul di footer bila nilainya terisi.
- Logo mitra resmi di `src/data/mitra.ts` (field `logo`), dan URL resmi Website AIKITA.
- Data contoh di `src/data/` diganti data asli/API (nama organisasi saat ini fiktif).
- `npm audit` melaporkan celah pada `postcss` yang dibundel Next 15. Celah ini hanya berdampak bila memproses CSS
  tak tepercaya; perbaikan resmi memerlukan upgrade ke Next 16.
