import type { Peran } from "@/lib/types";

/** Sumber: USER.md (benefit & akses) dan fungsibefe.md (fitur per kelompok). */
export const PERAN: Peran[] = [
  {
    id: "penyedia",
    nama: "Penyedia Use Case",
    benefit: "Showcase solusi AI terverifikasi di marketplace nasional, plus insentif diskon dari penyedia Cloud GPU.",
    fitur: [
      "Katalog Use Case",
      "AI Engineering Sandbox",
      "AI Assessment Toolkit",
      "Regulatory Sandbox",
      "Laporan Insiden Operasional",
    ],
    perluRegistrasi: true,
    cta: { label: "Daftar sebagai Penyedia", href: "/daftar?peran=penyedia" },
  },
  {
    id: "pengguna",
    nama: "Pengguna Use Case",
    benefit: "Bertemu calon Penyedia Use Case dengan cepat, mudah, dan terbaik sesuai kebutuhan organisasi Anda.",
    fitur: ["Katalog Kebutuhan Use Case", "AI Assessment Toolkit", "Laporan Insiden Operasional"],
    perluRegistrasi: true,
    cta: { label: "Daftar sebagai Pengguna", href: "/daftar?peran=pengguna" },
  },
  {
    id: "inovator",
    nama: "Inovator Use Case",
    keterangan: "Akademisi / Peneliti / Startup",
    benefit: "Bertemu calon investor dan penyedia use case, serta terfasilitasi penyediaan Cloud dan Data.",
    fitur: [
      "Katalog Riset Use Case",
      "AI Engineering Sandbox",
      "AI Assessment Toolkit",
      "Laporan Insiden Operasional",
    ],
    perluRegistrasi: true,
    cta: { label: "Daftar sebagai Inovator", href: "/daftar?peran=inovator" },
  },
  {
    id: "investor",
    nama: "Investor",
    benefit: "Akses direktori use case terkurasi beserta informasi performa, riset, dan profil risiko inovator AI.",
    fitur: ["Katalog Use Case (Inovator) terpilih", "Laporan Insiden Operasional"],
    perluRegistrasi: true,
    cta: { label: "Daftar sebagai Investor", href: "/daftar?peran=investor" },
  },
  {
    id: "regulator",
    nama: "Regulator",
    keterangan: "Komdigi & K/L",
    benefit: "Menetapkan prioritas dan mengevaluasi dampak pemanfaatan AI berdasarkan data adopsi yang terpusat.",
    fitur: [
      "National AI Dashboard",
      "Sebaran & prioritas use case per dampak, lokasi, sektor/KL, dan risiko",
      "Monitoring status evaluasi",
    ],
    perluRegistrasi: true,
    cta: { label: "Daftar Akun K/L", href: "/daftar?jenis=kl&peran=regulator" },
  },
  {
    id: "reviewer",
    nama: "Reviewer",
    keterangan: "K/L",
    benefit: "Evaluasi pengajuan secara online dengan penilaian yang seragam dan konsisten.",
    fitur: [
      "K/L: Verifikasi pengajuan Penyedia Use Case",
      "Komdigi: Verifikasi Pengguna, Inovator, dan Investor",
    ],
    perluRegistrasi: true,
    cta: { label: "Daftar Akun K/L", href: "/daftar?jenis=kl&peran=reviewer" },
  },
  {
    id: "masyarakat",
    nama: "Masyarakat",
    benefit: "Akses informasi penerapan, manfaat, dan risiko AI, serta memilah use case AI yang terbaik.",
    fitur: ["Daftar Katalog Use Case", "Daftar Katalog Kebutuhan Use Case", "Daftar Riset Use Case"],
    perluRegistrasi: false,
    cta: { label: "Jelajahi Katalog", href: "/katalog" },
  },
];
