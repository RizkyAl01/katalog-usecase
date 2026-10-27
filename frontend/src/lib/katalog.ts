/**
 * Data layer katalog. Komponen hanya mengambil data lewat modul ini,
 * sehingga saat backend tersedia cukup isi fungsi-fungsi di sini yang diganti ke API.
 */
import { KATALOG } from "@/data/katalog";
import { MITRA } from "@/data/mitra";
import { PERAN } from "@/data/peran";
import { SEKTOR } from "@/data/sektor";
import type { JenisKatalog, KatalogItem, Sektor, SektorId } from "@/lib/types";

export const JENIS_KATALOG: { id: JenisKatalog; label: string; labelLengkap: string }[] = [
  { id: "use-case", label: "Use Case", labelLengkap: "Katalog Use Case" },
  { id: "kebutuhan", label: "Kebutuhan", labelLengkap: "Katalog Kebutuhan Use Case" },
  { id: "riset", label: "Riset", labelLengkap: "Katalog Riset Use Case" },
];

/** Hanya item yang sudah melalui verifikasi dan dipublikasikan yang tampil ke publik. */
function terpublikasi(): KatalogItem[] {
  return KATALOG.filter((item) => item.status === "Publikasi");
}

function terbaru(a: KatalogItem, b: KatalogItem): number {
  return (b.tanggalPublikasi ?? "").localeCompare(a.tanggalPublikasi ?? "");
}

export function getDaftarSektor(): Sektor[] {
  return SEKTOR;
}

export function getSektor(id: SektorId): Sektor {
  const sektor = SEKTOR.find((s) => s.id === id);
  if (!sektor) throw new Error(`Sektor tidak dikenal: ${id}`);
  return sektor;
}

/** Item publik terbaru untuk satu jenis katalog (Showcase Beranda). */
export function getSorotan(jenis: JenisKatalog, jumlah = 4): KatalogItem[] {
  return terpublikasi()
    .filter((item) => item.jenis === jenis)
    .sort(terbaru)
    .slice(0, jumlah);
}

export function getItemPublik(id: string): KatalogItem | undefined {
  return terpublikasi().find((item) => item.id === id);
}

export function getSemuaItemPublik(): KatalogItem[] {
  return terpublikasi().sort(terbaru);
}

/** Sektor dengan jumlah use case terpublikasi terbanyak. */
export function getSektorPopuler(jumlah = 5): { sektor: Sektor; total: number }[] {
  const useCase = terpublikasi().filter((item) => item.jenis === "use-case");
  return SEKTOR.map((sektor) => ({
    sektor,
    total: useCase.filter((item) => item.sektor === sektor.id).length,
  }))
    .filter((s) => s.total > 0)
    .sort((a, b) => b.total - a.total || a.sektor.nama.localeCompare(b.sektor.nama))
    .slice(0, jumlah);
}

export function getStatistik() {
  const publik = terpublikasi();
  const hitung = (jenis: JenisKatalog) => publik.filter((item) => item.jenis === jenis).length;
  return {
    useCase: hitung("use-case"),
    kebutuhan: hitung("kebutuhan"),
    riset: hitung("riset"),
    sektor: new Set(publik.map((item) => item.sektor)).size,
  };
}

export function getPeran() {
  return PERAN;
}

export function getMitra() {
  return MITRA;
}
