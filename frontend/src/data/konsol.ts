/**
 * DATA CONTOH (mock) untuk dashboard konsol tiap akun demo.
 * Nama organisasi fiktif. Diakses hanya lewat `@/lib/konsol/data`.
 */

export type StatusEvaluasi = "Draft" | "Dalam Proses Kurasi" | "Perlu Revisi" | "Disetujui";
export type StatusSandbox = "Not Required" | "Under Review" | "Active Sandbox Testing" | "Completed";
export type TahapTRL = "PoC" | "Prototype" | "MVP" | "Implemented";
export type StatusKebutuhan = "Draft" | "Dalam Pencarian Vendor" | "Pilot Test" | "Operasional";
export type StatusReview = "Baru" | "Dalam Kurasi" | "Perlu Revisi" | "Selesai Dikurasi";
export type Prioritas = "Rendah" | "Sedang" | "Tinggi";

export interface UseCasePenyedia {
  id: string;
  nama: string;
  deskripsi: string;
  tahap: TahapTRL;
  tanggal: string;
  evaluasi: StatusEvaluasi;
  sandbox: StatusSandbox;
}

export interface KebutuhanPengguna {
  id: string;
  nama: string;
  sektor: string;
  kategoriAI: string;
  tanggal: string;
  status: StatusKebutuhan;
  /** Tahap uji coba bila status = Pilot Test. */
  tahapPilot?: "PoC" | "MVP";
  /** Efisiensi yang tercapai (%) bila sudah Operasional. */
  efisiensi?: number;
}

export interface RisetInovator {
  id: string;
  nama: string;
  kategoriAI: string;
  tanggal: string;
  kurasi: StatusEvaluasi;
  /** Insentif/fasilitas R&D yang diperoleh. */
  insentif?: string;
}

export interface PengajuanReview {
  id: string;
  nama: string;
  pengaju: string;
  tanggal: string;
  status: StatusReview;
  prioritas: Prioritas;
}

export interface AkunKLMenunggu {
  id: string;
  nama: string;
  instansi: string;
  unitKerja: string;
  nomorSuratTugas: string;
  tanggal: string;
}

export const USE_CASE_PENYEDIA: UseCasePenyedia[] = [
  { id: "p-01", nama: "AI Triage Assistant", deskripsi: "Asisten virtual untuk identifikasi awal gejala penyakit.", tahap: "PoC", tanggal: "2024-01-12", evaluasi: "Disetujui", sandbox: "Completed" },
  { id: "p-02", nama: "Analisis Citra Medis", deskripsi: "Deteksi dini penyakit dari hasil rontgen.", tahap: "Prototype", tanggal: "2026-03-05", evaluasi: "Dalam Proses Kurasi", sandbox: "Under Review" },
  { id: "p-03", nama: "Personalisasi Edukasi Pasien", deskripsi: "Rekomendasi konten edukasi kesehatan.", tahap: "MVP", tanggal: "2026-04-20", evaluasi: "Dalam Proses Kurasi", sandbox: "Active Sandbox Testing" },
  { id: "p-04", nama: "Optimasi Penjadwalan Dokter", deskripsi: "Prediksi jadwal dokter berdasarkan permintaan pasien.", tahap: "Implemented", tanggal: "2025-06-10", evaluasi: "Disetujui", sandbox: "Completed" },
  { id: "p-05", nama: "Analisis Sentimen Pengguna", deskripsi: "Analisis umpan balik pasien dari layanan telemedicine.", tahap: "PoC", tanggal: "2026-06-24", evaluasi: "Perlu Revisi", sandbox: "Not Required" },
  { id: "p-06", nama: "Ringkasan Rekam Medis Otomatis", deskripsi: "Meringkas rekam medis untuk serah terima antar-shift.", tahap: "PoC", tanggal: "2026-10-20", evaluasi: "Draft", sandbox: "Not Required" },
  { id: "p-07", nama: "Prediksi Kepadatan IGD", deskripsi: "Perkiraan jumlah kunjungan IGD per jam.", tahap: "Prototype", tanggal: "2026-10-26", evaluasi: "Draft", sandbox: "Not Required" },
];

export const KEBUTUHAN_PENGGUNA: KebutuhanPengguna[] = [
  { id: "k-01", nama: "Sistem Analisis Data Publik", sektor: "Layanan Publik", kategoriAI: "Machine Learning", tanggal: "2025-06-10", status: "Operasional", efisiensi: 30 },
  { id: "k-02", nama: "Deteksi Anomali Transaksi", sektor: "Ekonomi & Keuangan", kategoriAI: "Machine Learning", tanggal: "2026-06-03", status: "Pilot Test", tahapPilot: "MVP" },
  { id: "k-03", nama: "Chatbot Layanan Publik", sektor: "Layanan Publik", kategoriAI: "Natural Language Processing", tanggal: "2026-05-20", status: "Operasional", efisiensi: 25 },
  { id: "k-04", nama: "Analisis Sentimen Masyarakat", sektor: "Layanan Publik", kategoriAI: "Natural Language Processing", tanggal: "2025-07-10", status: "Pilot Test", tahapPilot: "PoC" },
  { id: "k-05", nama: "Monitoring Kualitas Layanan Digital", sektor: "Layanan Publik", kategoriAI: "Computer Vision", tanggal: "2026-10-24", status: "Dalam Pencarian Vendor" },
  { id: "k-06", nama: "Prediksi Kebutuhan Obat Puskesmas", sektor: "Kesehatan", kategoriAI: "Machine Learning", tanggal: "2026-10-27", status: "Draft" },
];

export const RISET_INOVATOR: RisetInovator[] = [
  { id: "r-01", nama: "Deteksi Hoaks pada Media Sosial Menggunakan NLP", kategoriAI: "Natural Language Processing", tanggal: "2025-06-12", kurasi: "Disetujui", insentif: "Akses Compute GPU Cloud" },
  { id: "r-02", nama: "Sistem Rekomendasi Beasiswa Berbasis AI", kategoriAI: "Machine Learning", tanggal: "2026-05-05", kurasi: "Dalam Proses Kurasi" },
  { id: "r-03", nama: "Analisis Citra Satelit untuk Pemantauan Lahan", kategoriAI: "Computer Vision", tanggal: "2026-03-20", kurasi: "Disetujui", insentif: "Hibah riset" },
  { id: "r-04", nama: "Chatbot Layanan Akademik", kategoriAI: "Natural Language Processing", tanggal: "2025-02-28", kurasi: "Disetujui", insentif: "Program inkubasi" },
  { id: "r-05", nama: "Prediksi Permintaan Energi Menggunakan Time Series", kategoriAI: "Machine Learning", tanggal: "2026-10-24", kurasi: "Perlu Revisi" },
  { id: "r-06", nama: "Segmentasi Citra Retina untuk Retinopati Diabetik", kategoriAI: "Deep Learning", tanggal: "2026-10-28", kurasi: "Draft" },
];

/** Reviewer K/L memverifikasi pengajuan Penyedia Use Case (fungsibefe.md). */
export const PENGAJUAN_REVIEW: PengajuanReview[] = [
  { id: "v-01", nama: "Deteksi Dini Penyakit Berbasis AI di Puskesmas", pengaju: "PT Gizi Analitika Indonesia", tanggal: "2026-07-23", status: "Dalam Kurasi", prioritas: "Rendah" },
  { id: "v-02", nama: "Sistem Rekomendasi Rujukan Pasien", pengaju: "PT Rujukan Sehat Digital", tanggal: "2026-05-21", status: "Dalam Kurasi", prioritas: "Sedang" },
  { id: "v-03", nama: "Analisis Risiko Stunting Kabupaten", pengaju: "PT Gizi Analitika Indonesia", tanggal: "2026-10-12", status: "Baru", prioritas: "Rendah" },
  { id: "v-04", nama: "Chatbot Informasi Layanan Kesehatan", pengaju: "PT Medika Cerdas Nusantara", tanggal: "2025-12-28", status: "Selesai Dikurasi", prioritas: "Tinggi" },
  { id: "v-05", nama: "Prediksi Ketersediaan Obat", pengaju: "PT Farmasi Data Nusantara", tanggal: "2026-04-02", status: "Perlu Revisi", prioritas: "Sedang" },
  { id: "v-06", nama: "Analisis Citra Medis", pengaju: "PT Medika Cerdas Nusantara", tanggal: "2026-03-05", status: "Dalam Kurasi", prioritas: "Tinggi" },
  { id: "v-07", nama: "Pembaca Citra Rontgen Paru", pengaju: "PT Radiologi Digital Nusantara", tanggal: "2026-10-25", status: "Baru", prioritas: "Tinggi" },
  { id: "v-08", nama: "Prediksi Kepadatan Rawat Inap", pengaju: "PT Rujukan Sehat Digital", tanggal: "2026-08-14", status: "Selesai Dikurasi", prioritas: "Sedang" },
];

/** Akun K/L berstatus "Pending Approval Admin Nasional" (slide 25). */
export const AKUN_KL_MENUNGGU: AkunKLMenunggu[] = [
  { id: "kl-01", nama: "Rina Kartika", instansi: "Kementerian Perhubungan", unitKerja: "Pusat Data dan Informasi", nomorSuratTugas: "ST-112/PUSDATIN/X/2026", tanggal: "2026-10-27" },
  { id: "kl-02", nama: "Dimas Prakoso", instansi: "Pemerintah Provinsi Nusa Raya", unitKerja: "Dinas Komunikasi dan Informatika", nomorSuratTugas: "800/431/DISKOMINFO/2026", tanggal: "2026-10-26" },
  { id: "kl-03", nama: "Lestari Ayuningtyas", instansi: "Kementerian Pertanian", unitKerja: "Biro Perencanaan", nomorSuratTugas: "ST-58/RC/X/2026", tanggal: "2026-10-22" },
];
