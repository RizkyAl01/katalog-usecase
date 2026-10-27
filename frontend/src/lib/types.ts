/**
 * Model data katalog, mengikuti ALUR-sistem.jpg:
 * Pengajuan -> Kategori Risiko -> Verifikasi -> (Sandbox) -> Publikasi
 * dan fungsibefe.md (3 daftar publik untuk Masyarakat).
 */

/** Tiga daftar katalog yang dapat diakses publik tanpa registrasi. */
export type JenisKatalog = "use-case" | "kebutuhan" | "riset";

export type SektorId =
  | "kesehatan"
  | "transportasi"
  | "ekonomi-keuangan"
  | "pendidikan"
  | "energi"
  | "ketahanan-pangan";

export type TahapPengembangan = "Konsep" | "POC" | "Prototype" | "MVP" | "Komersil";

/** "Tidak Dapat Diterima" tidak pernah sampai tahap Publikasi. */
export type KategoriRisiko = "Rendah" | "Tinggi" | "Tidak Dapat Diterima";

export type StatusAlur = "Diajukan" | "Verifikasi" | "Sandbox" | "Publikasi" | "Ditolak";

export type KelompokPengusul = "Penyedia Use Case" | "Pengguna Use Case" | "Inovator Use Case";

export interface Sektor {
  id: SektorId;
  nama: string;
  gambar?: string;
}

export interface KatalogItem {
  id: string;
  jenis: JenisKatalog;
  judul: string;
  /** Ringkasan manfaat (ditampilkan di kartu). */
  ringkasan: string;
  /** Ringkasan dampak terukur. */
  dampak: string;
  sektor: SektorId;
  teknologi: string;
  /** Tidak berlaku untuk jenis "kebutuhan". */
  tahap?: TahapPengembangan;
  risiko: KategoriRisiko;
  status: StatusAlur;
  pengusul: { nama: string; kelompok: KelompokPengusul };
  /** Instansi yang memverifikasi (KL sektor untuk Penyedia, Komdigi untuk lainnya). */
  verifikator: string;
  /** ISO date; hanya terisi bila status = Publikasi. */
  tanggalPublikasi?: string;
  gambar?: string;
}

export type PeranId =
  | "regulator"
  | "reviewer"
  | "penyedia"
  | "pengguna"
  | "inovator"
  | "investor"
  | "masyarakat";

export interface Peran {
  id: PeranId;
  nama: string;
  keterangan?: string;
  benefit: string;
  fitur: string[];
  perluRegistrasi: boolean;
  cta: { label: string; href: string };
}

export interface Mitra {
  nama: string;
  kategori: string;
  logo?: string;
}
