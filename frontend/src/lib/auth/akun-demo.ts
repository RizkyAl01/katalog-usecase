import "server-only";
import { createHash, timingSafeEqual } from "node:crypto";
import type { PeranAkun } from "@/lib/auth/peran";

/**
 * AKUN DEMO. Mode tanpa database (keputusan tahap 2, lihat PRD.md §6).
 * Semua akun memakai password yang sama dan ditampilkan di halaman Masuk.
 * Ganti modul ini dengan query ke backend saat database tersedia.
 */
export const PASSWORD_DEMO = "Demo#2026";

export interface AkunDemo {
  id: string;
  email: string;
  peran: PeranAkun;
  nama: string;
  jabatan: string;
  entitas: string;
}

export const AKUN_DEMO: AkunDemo[] = [
  {
    id: "akun-penyedia",
    email: "penyedia@demo.test",
    peran: "penyedia",
    nama: "Tim Medika Cerdas",
    jabatan: "Product Manager",
    entitas: "PT Medika Cerdas Nusantara",
  },
  {
    id: "akun-pengguna",
    email: "pengguna@demo.test",
    peran: "pengguna",
    nama: "Andi Pratama",
    jabatan: "Kepala Seksi Data & Informasi",
    entitas: "Dinas Kesehatan Kota Nusa Indah",
  },
  {
    id: "akun-inovator",
    email: "inovator@demo.test",
    peran: "inovator",
    nama: "Ahmad Setiawan",
    jabatan: "Ketua Tim Peneliti",
    entitas: "Institut Teknologi Cakrawala",
  },
  {
    id: "akun-investor",
    email: "investor@demo.test",
    peran: "investor",
    nama: "Sari Wulandari",
    jabatan: "Investment Manager",
    entitas: "PT Modal Ventura Nusantara",
  },
  {
    id: "akun-reviewer",
    email: "reviewer@demo.test",
    peran: "reviewer",
    nama: "Budi Santoso",
    jabatan: "Verifikator Sektor Kesehatan",
    entitas: "Kementerian Kesehatan",
  },
  {
    id: "akun-regulator",
    email: "regulator@demo.test",
    peran: "regulator",
    nama: "Admin Komdigi",
    jabatan: "Direktorat Ekosistem AI",
    entitas: "Kementerian Komunikasi dan Digital",
  },
];

const digest = (teks: string) => createHash("sha256").update(teks, "utf8").digest();
const DIGEST_PASSWORD_DEMO = digest(PASSWORD_DEMO);

export function cariAkunById(id: string): AkunDemo | undefined {
  return AKUN_DEMO.find((a) => a.id === id);
}

/** Selalu membandingkan password (waktu konstan) walau email tidak ditemukan. */
export function verifikasiKredensial(email: string, password: string): AkunDemo | null {
  const akun = AKUN_DEMO.find((a) => a.email === email.trim().toLowerCase());
  const cocok = timingSafeEqual(digest(password), DIGEST_PASSWORD_DEMO);
  return akun && cocok ? akun : null;
}
