/**
 * Data layer konsol. Saat ini membaca data contoh (satu set data per peran demo);
 * nanti diganti query ke backend berdasarkan id akun.
 */
import {
  AKUN_KL_MENUNGGU,
  KEBUTUHAN_PENGGUNA,
  PENGAJUAN_REVIEW,
  RISET_INOVATOR,
  USE_CASE_PENYEDIA,
} from "@/data/konsol";
import { KATALOG } from "@/data/katalog";
import { SEKTOR } from "@/data/sektor";
import type { KategoriRisiko, StatusAlur } from "@/lib/types";

const cocok = (nama: string, q: string) => !q || nama.toLowerCase().includes(q.toLowerCase());
const hitung = <T,>(daftar: T[], syarat: (x: T) => boolean) => daftar.filter(syarat).length;

export function getDashboardPenyedia(q: string) {
  const semua = USE_CASE_PENYEDIA;
  return {
    metrik: {
      total: semua.length,
      draft: hitung(semua, (u) => u.evaluasi === "Draft"),
      kurasi: hitung(semua, (u) => u.evaluasi === "Dalam Proses Kurasi"),
      revisi: hitung(semua, (u) => u.evaluasi === "Perlu Revisi"),
      disetujui: hitung(semua, (u) => u.evaluasi === "Disetujui"),
    },
    distribusiTahap: (["PoC", "Prototype", "MVP", "Implemented"] as const).map((tahap) => ({
      tahap,
      jumlah: hitung(semua, (u) => u.tahap === tahap),
    })),
    daftar: semua.filter((u) => cocok(u.nama, q)).sort((a, b) => b.tanggal.localeCompare(a.tanggal)),
  };
}

export function getDashboardPengguna(q: string) {
  const semua = KEBUTUHAN_PENGGUNA;
  const efisiensi = semua.flatMap((k) => (k.status === "Operasional" && k.efisiensi !== undefined ? [k.efisiensi] : []));
  return {
    metrik: {
      total: semua.length,
      terimplementasi: hitung(semua, (k) => k.status === "Operasional"),
      pengujian: hitung(semua, (k) => k.status === "Pilot Test"),
      /** Rata-rata efisiensi solusi yang sudah operasional (evidence-based). */
      proyeksiDampak: efisiensi.length ? Math.round(efisiensi.reduce((a, b) => a + b, 0) / efisiensi.length) : null,
    },
    daftar: semua.filter((k) => cocok(k.nama, q)).sort((a, b) => b.tanggal.localeCompare(a.tanggal)),
  };
}

export function getDashboardInovator(q: string) {
  const semua = RISET_INOVATOR;
  return {
    metrik: {
      total: semua.length,
      insentif: hitung(semua, (r) => Boolean(r.insentif)),
    },
    daftar: semua.filter((r) => cocok(r.nama, q)).sort((a, b) => b.tanggal.localeCompare(a.tanggal)),
  };
}

export function getDashboardReviewer(q: string) {
  const semua = PENGAJUAN_REVIEW;
  return {
    metrik: {
      baru: hitung(semua, (p) => p.status === "Baru"),
      kurasi: hitung(semua, (p) => p.status === "Dalam Kurasi"),
      revisi: hitung(semua, (p) => p.status === "Perlu Revisi"),
      selesai: hitung(semua, (p) => p.status === "Selesai Dikurasi"),
    },
    daftar: semua
      .filter((p) => cocok(p.nama, q) || cocok(p.pengaju, q))
      .sort((a, b) => b.tanggal.localeCompare(a.tanggal)),
  };
}

/** Ringkasan nasional untuk Konsol Admin Komdigi (seluruh item katalog, termasuk yang belum publik). */
export function getDashboardRegulator() {
  const status: StatusAlur[] = ["Diajukan", "Verifikasi", "Sandbox", "Publikasi", "Ditolak"];
  const risiko: KategoriRisiko[] = ["Rendah", "Tinggi", "Tidak Dapat Diterima"];
  return {
    total: KATALOG.length,
    perStatus: status.map((s) => ({ label: s, jumlah: hitung(KATALOG, (i) => i.status === s) })),
    perRisiko: risiko.map((r) => ({ label: r, jumlah: hitung(KATALOG, (i) => i.risiko === r) })),
    perSektor: SEKTOR.map((s) => ({
      sektor: s.nama,
      useCase: hitung(KATALOG, (i) => i.sektor === s.id && i.jenis === "use-case"),
      kebutuhan: hitung(KATALOG, (i) => i.sektor === s.id && i.jenis === "kebutuhan"),
      riset: hitung(KATALOG, (i) => i.sektor === s.id && i.jenis === "riset"),
      risikoTinggi: hitung(KATALOG, (i) => i.sektor === s.id && i.risiko === "Tinggi"),
    })),
    akunKLMenunggu: [...AKUN_KL_MENUNGGU].sort((a, b) => b.tanggal.localeCompare(a.tanggal)),
  };
}

/** Untuk validasi rute detail: id baris milik dashboard peran tersebut. */
export const ID_DETAIL: Record<string, Set<string>> = {
  penyedia: new Set(USE_CASE_PENYEDIA.map((u) => u.id)),
  pengguna: new Set(KEBUTUHAN_PENGGUNA.map((k) => k.id)),
  inovator: new Set(RISET_INOVATOR.map((r) => r.id)),
  reviewer: new Set(PENGAJUAN_REVIEW.map((p) => p.id)),
  regulator: new Set(AKUN_KL_MENUNGGU.map((a) => a.id)),
  investor: new Set(),
};
