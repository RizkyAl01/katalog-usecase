import type { PeranAkun } from "@/lib/auth/peran";

/** Cookie preferensi sidebar desktop: "1" = diciutkan (hanya ikon). Dibaca server agar tidak berkedip. */
export const COOKIE_SIDEBAR = "aisn_sidebar";

/** Kunci ikon (dipetakan ke komponen lucide di Sidebar). */
export type IkonMenu =
  | "dashboard"
  | "daftar"
  | "riwayat"
  | "sandbox"
  | "assessment"
  | "hasil"
  | "regulasi"
  | "ide"
  | "insiden"
  | "status"
  | "kolaborasi"
  | "cari"
  | "grafik"
  | "monitoring"
  | "proposal"
  | "izin"
  | "registry"
  | "usulan"
  | "penghargaan"
  | "katalog";

export interface ItemMenu {
  label: string;
  /** "" = halaman dashboard utama. */
  slug: string;
  ikon: IkonMenu;
}

export interface GrupMenu {
  judul?: string;
  item: ItemMenu[];
}

export interface KonfigKonsol {
  /** Label di bawah "AI Sandbox Nasional" pada sidebar. */
  label: string;
  grup: GrupMenu[];
  /** Halaman tambahan yang tidak tampil di sidebar (CTA, aksi tabel). */
  halamanLain: Record<string, string>;
}

const DASHBOARD: ItemMenu = { label: "Dashboard", slug: "", ikon: "dashboard" };

/** Sumber: Mockup Komdigi.pdf hal. 3–8, 26–35 (lihat webui.md). */
export const KONSOL: Record<PeranAkun, KonfigKonsol> = {
  penyedia: {
    label: "Portal Penyedia UC",
    grup: [
      { item: [DASHBOARD] },
      {
        judul: "1. Katalog & Manajemen Use Case",
        item: [
          { label: "Daftar Use Case Saya", slug: "use-case", ikon: "daftar" },
          { label: "Riwayat & Catatan Kurator", slug: "riwayat-kurator", ikon: "riwayat" },
        ],
      },
      { item: [{ label: "AI Engineering Sandbox", slug: "engineering-sandbox", ikon: "sandbox" }] },
      {
        judul: "2. AI Assessment Toolkit",
        item: [
          { label: "List Use-Case", slug: "assessment", ikon: "daftar" },
          { label: "Hasil Assessment", slug: "hasil-assessment", ikon: "assessment" },
        ],
      },
      {
        judul: "3. Regulatory Sandbox",
        item: [
          { label: "Pengajuan Regulatory Sandbox", slug: "regulatory-sandbox", ikon: "regulasi" },
          { label: "Hasil Regulatory Sandbox", slug: "hasil-regulatory-sandbox", ikon: "ide" },
        ],
      },
      {
        judul: "4. Laporan Insiden Operasional",
        item: [
          { label: "Pelaporan Insiden AI", slug: "insiden", ikon: "insiden" },
          { label: "Status Penanganan", slug: "status-insiden", ikon: "status" },
        ],
      },
    ],
    halamanLain: { ajukan: "Ajukan Use-Case Baru" },
  },
  pengguna: {
    label: "Konsol Pengguna UC",
    grup: [
      { item: [DASHBOARD] },
      {
        judul: "1. Manajemen Kebutuhan Use Case",
        item: [
          { label: "Daftar Kebutuhan Saya", slug: "kebutuhan", ikon: "daftar" },
          { label: "Partner Matching & Collaboration", slug: "partner-matching", ikon: "kolaborasi" },
        ],
      },
      {
        judul: "2. Katalog Solusi",
        item: [
          { label: "Cari Solusi AI", slug: "cari-solusi", ikon: "cari" },
          { label: "Benchmarking AI", slug: "benchmarking", ikon: "grafik" },
        ],
      },
      { judul: "3. AI Assessment Toolkit", item: [{ label: "Self-Assessment Kelayakan Adopsi", slug: "self-assessment", ikon: "assessment" }] },
      {
        judul: "4. Laporan Insiden Operasional",
        item: [
          { label: "Pelaporan Insiden AI", slug: "insiden", ikon: "insiden" },
          { label: "Status Penanganan", slug: "status-insiden", ikon: "status" },
        ],
      },
    ],
    halamanLain: { ajukan: "Daftarkan Kebutuhan / Use Case Baru" },
  },
  inovator: {
    label: "Konsol Inovator UC",
    grup: [
      { item: [DASHBOARD] },
      {
        judul: "1. Katalog Riset & Inovasi",
        item: [
          { label: "Daftar Riset/Prototipe Saya", slug: "riset", ikon: "daftar" },
          { label: "Riwayat & Umpan Balik Kurator", slug: "riwayat-kurator", ikon: "riwayat" },
        ],
      },
      { item: [{ label: "AI Engineering Sandbox", slug: "engineering-sandbox", ikon: "sandbox" }] },
      { judul: "2. AI Assessment Toolkit", item: [{ label: "Self-Assessment Kelayakan Adopsi", slug: "self-assessment", ikon: "assessment" }] },
      {
        judul: "3. Laporan Insiden Operasional",
        item: [
          { label: "Pelaporan Insiden AI", slug: "insiden", ikon: "insiden" },
          { label: "Status Penanganan", slug: "status-insiden", ikon: "status" },
        ],
      },
    ],
    halamanLain: { ajukan: "Ajukan Riset / Prototype / Use Case Baru" },
  },
  reviewer: {
    label: "Portal Reviewer (K/L)",
    grup: [
      {
        item: [
          DASHBOARD,
          { label: "Katalog & Manajemen Use Case", slug: "katalog", ikon: "daftar" },
          { label: "Regulatory Sandbox Management", slug: "regulatory-sandbox", ikon: "regulasi" },
          { label: "Pelaporan Insiden Operasional AI", slug: "insiden", ikon: "insiden" },
          { label: "National AI Dashboard", slug: "national-dashboard", ikon: "grafik" },
        ],
      },
    ],
    halamanLain: {},
  },
  regulator: {
    label: "Konsol Admin Komdigi",
    grup: [
      {
        judul: "1. Engineering Sandbox",
        item: [
          { label: "Ringkasan & monitoring", slug: "", ikon: "monitoring" },
          { label: "Review proposal", slug: "review-proposal", ikon: "proposal" },
          { label: "Perizinan penyedia layanan", slug: "perizinan", ikon: "izin" },
        ],
      },
      {
        judul: "2. Pemantauan Terpadu",
        item: [
          { label: "Insiden nasional", slug: "insiden-nasional", ikon: "insiden" },
          { label: "Registry use-case", slug: "registry", ikon: "registry" },
        ],
      },
      {
        judul: "Ekosistem",
        item: [
          { label: "Usulan use-case", slug: "usulan", ikon: "usulan" },
          { label: "Hasil assessment", slug: "hasil-assessment", ikon: "penghargaan" },
        ],
      },
    ],
    halamanLain: {},
  },
  investor: {
    label: "Konsol Investor",
    grup: [
      { item: [DASHBOARD, { label: "Katalog Use Case (Inovator) Terpilih", slug: "katalog-terpilih", ikon: "katalog" }] },
      {
        judul: "Laporan Insiden Operasional",
        item: [
          { label: "Pelaporan Insiden AI", slug: "insiden", ikon: "insiden" },
          { label: "Status Penanganan", slug: "status-insiden", ikon: "status" },
        ],
      },
    ],
    halamanLain: {},
  },
};

/** Judul halaman untuk slug (menu atau halaman lain); undefined bila tidak dikenal. */
export function judulHalaman(peran: PeranAkun, slug: string): string | undefined {
  const konfig = KONSOL[peran];
  for (const g of konfig.grup) {
    const item = g.item.find((i) => i.slug === slug);
    if (item) return item.label;
  }
  return konfig.halamanLain[slug];
}
