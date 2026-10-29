/**
 * Aturan validasi registrasi (PPTX slide 22–25). Fungsi murni: dipakai di client (umpan balik cepat)
 * dan di server action (sumber kebenaran).
 */

export const JENIS_ENTITAS = [
  { id: "penyedia", label: "Penyedia Use Case", contoh: "Vendor AI, Software House, Integrator" },
  { id: "pengguna", label: "Pengguna Use Case", contoh: "BUMN, Swasta, UMKM, Industri" },
  { id: "inovator", label: "Akademisi / Peneliti / Startup", contoh: "Perguruan Tinggi, Lembaga Riset, Early-Stage Startup" },
  { id: "investor", label: "Investor", contoh: "Modal Ventura, Angel Investor, Lembaga Pendanaan" },
] as const;

export type JenisEntitas = (typeof JENIS_ENTITAS)[number]["id"];

export const KATEGORI_INSTANSI = [
  "Kementerian / Lembaga Pusat",
  "Pemerintah Daerah (Provinsi / Kabupaten / Kota)",
  "Lembaga Non-Struktural / Badan Publik",
] as const;

export const UKURAN_MAKS_DOKUMEN = 5 * 1024 * 1024;

export type Galat = Record<string, string>;

export function isJenisEntitas(nilai: unknown): nilai is JenisEntitas {
  return typeof nilai === "string" && JENIS_ENTITAS.some((j) => j.id === nilai);
}

/** Label & aturan nomor induk berbeda per jenis entitas (slide 22). */
export function infoNomorInduk(jenis: JenisEntitas) {
  return jenis === "inovator"
    ? { label: "Kode PT (PDDikti) / Nomor Izin Lembaga Riset (Opsional)", wajib13Digit: false }
    : { label: "Nomor Induk Berusaha (NIB) (Opsional)", wajib13Digit: true };
}

export function infoDokumen(jenis: JenisEntitas) {
  return jenis === "inovator"
    ? "Unggah Kartu Pegawai / SK Penunjukan (Format: .pdf/.jpg, maks. 5 MB)."
    : "Unggah NIB / NPWP Perusahaan / Surat Keterangan Domisili (Format: .pdf/.jpg, maks. 5 MB).";
}

const RE_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const RE_EMAIL_PEMERINTAH = /^[^\s@]+@([a-z0-9-]+\.)*go\.id$/i;

const normalTelepon = (v: string) => v.replace(/[\s\-().]/g, "");
const isTelepon = (v: string) => /^(\+62|62|0)\d{7,13}$/.test(normalTelepon(v));

function isUrl(v: string) {
  try {
    const url = new URL(/^https?:\/\//i.test(v) ? v : `https://${v}`);
    return url.hostname.includes(".");
  } catch {
    return false;
  }
}

/** Minimal 8 karakter dengan kombinasi huruf, angka, dan simbol. */
export function cekKataSandi(v: string): string | null {
  if (v.length < 8) return "Kata sandi minimal 8 karakter.";
  if (!/[A-Za-z]/.test(v) || !/\d/.test(v) || !/[^A-Za-z0-9]/.test(v)) {
    return "Kata sandi harus kombinasi huruf, angka, dan simbol.";
  }
  return null;
}

export interface InfoBerkas {
  name: string;
  size: number;
  type: string;
}

function cekBerkas(berkas: InfoBerkas | null, hanyaPdf: boolean): string | null {
  if (!berkas || berkas.size === 0) return "Dokumen wajib diunggah.";
  const ext = berkas.name.toLowerCase().split(".").pop() ?? "";
  const extValid = hanyaPdf ? ["pdf"] : ["pdf", "jpg", "jpeg"];
  const mimeValid = hanyaPdf ? ["application/pdf"] : ["application/pdf", "image/jpeg"];
  // Sebagian browser mengirim MIME kosong; ekstensi tetap wajib cocok.
  if (!extValid.includes(ext) || (berkas.type && !mimeValid.includes(berkas.type))) {
    return hanyaPdf ? "Format dokumen harus .pdf." : "Format dokumen harus .pdf atau .jpg.";
  }
  if (berkas.size > UKURAN_MAKS_DOKUMEN) return "Ukuran dokumen maksimal 5 MB.";
  return null;
}

type Nilai = Record<string, string>;

function wajib(nilai: Nilai, galat: Galat, kolom: Record<string, string>) {
  for (const [nama, label] of Object.entries(kolom)) {
    if (!nilai[nama]?.trim()) galat[nama] = `${label} wajib diisi.`;
  }
}

function cekPic(nilai: Nilai, galat: Galat) {
  if (nilai.emailPic && !RE_EMAIL.test(nilai.emailPic.trim())) galat.emailPic = "Format email tidak valid.";
  if (nilai.teleponPic && !isTelepon(nilai.teleponPic)) galat.teleponPic = "Nomor telepon tidak valid (contoh: 0812xxxxxxxx).";
  if (nilai.kataSandi) {
    const pesan = cekKataSandi(nilai.kataSandi);
    if (pesan) galat.kataSandi = pesan;
  }
  if (nilai.konfirmasi && nilai.konfirmasi !== nilai.kataSandi) galat.konfirmasi = "Konfirmasi kata sandi tidak sama.";
}

export function validasiUmum(nilai: Nilai, berkas: InfoBerkas | null): Galat {
  const galat: Galat = {};
  wajib(nilai, galat, {
    namaEntitas: "Nama entitas",
    jenisEntitas: "Jenis entitas",
    alamat: "Alamat entitas",
    emailKantor: "Email kantor",
    teleponKantor: "Nomor telepon kantor",
    namaPic: "Nama lengkap",
    jabatan: "Jabatan",
    emailPic: "Email",
    teleponPic: "Nomor telepon",
    kataSandi: "Kata sandi",
    konfirmasi: "Konfirmasi kata sandi",
  });

  if (nilai.jenisEntitas && !isJenisEntitas(nilai.jenisEntitas)) galat.jenisEntitas = "Jenis entitas tidak valid.";
  if (isJenisEntitas(nilai.jenisEntitas) && nilai.nomorInduk?.trim()) {
    const ni = nilai.nomorInduk.trim();
    if (infoNomorInduk(nilai.jenisEntitas).wajib13Digit && !/^\d{13}$/.test(ni)) galat.nomorInduk = "NIB terdiri dari 13 digit angka.";
  }
  if (nilai.emailKantor && !RE_EMAIL.test(nilai.emailKantor.trim())) galat.emailKantor = "Format email tidak valid.";
  if (nilai.teleponKantor && !isTelepon(nilai.teleponKantor)) galat.teleponKantor = "Nomor telepon tidak valid.";
  if (nilai.situsWeb?.trim() && !isUrl(nilai.situsWeb.trim())) galat.situsWeb = "Alamat situs web tidak valid.";
  cekPic(nilai, galat);

  const pesanBerkas = cekBerkas(berkas, false);
  if (pesanBerkas) galat.dokumen = pesanBerkas;

  for (const s of ["setujuData", "setujuKetentuan", "setujuEtika"]) {
    if (nilai[s] !== "on") galat[s] = "Persetujuan ini wajib dicentang.";
  }
  return galat;
}

export function validasiKL(nilai: Nilai, berkas: InfoBerkas | null): Galat {
  const galat: Galat = {};
  wajib(nilai, galat, {
    namaEntitas: "Nama entitas K/L",
    kategoriInstansi: "Kategori instansi",
    alamat: "Alamat kantor resmi",
    unitKerja: "Unit kerja / Direktorat",
    emailKantor: "Email kantor resmi",
    teleponKantor: "Nomor telepon kantor",
    namaPic: "Nama lengkap",
    jabatan: "Jabatan",
    nip: "NIP",
    emailPic: "Email kedinasan",
    teleponPic: "Nomor telepon",
    kataSandi: "Kata sandi",
    konfirmasi: "Konfirmasi kata sandi",
    nomorSuratTugas: "Nomor surat tugas",
    pemberiTugas: "Pemberi penugasan",
  });

  if (nilai.kategoriInstansi && !(KATEGORI_INSTANSI as readonly string[]).includes(nilai.kategoriInstansi)) {
    galat.kategoriInstansi = "Kategori instansi tidak valid.";
  }
  if (nilai.emailKantor && !RE_EMAIL_PEMERINTAH.test(nilai.emailKantor.trim())) {
    galat.emailKantor = "Gunakan email resmi instansi berdomain .go.id.";
  }
  if (nilai.teleponKantor && !isTelepon(nilai.teleponKantor)) galat.teleponKantor = "Nomor telepon tidak valid.";
  if (nilai.nip && !/^\d{18}$/.test(nilai.nip.replace(/\s/g, ""))) galat.nip = "NIP terdiri dari 18 digit angka.";
  cekPic(nilai, galat);
  if (nilai.emailPic && !galat.emailPic && !RE_EMAIL_PEMERINTAH.test(nilai.emailPic.trim())) {
    galat.emailPic = "Gunakan email kedinasan berdomain .go.id.";
  }

  const pesanBerkas = cekBerkas(berkas, true);
  if (pesanBerkas) galat.dokumen = pesanBerkas;

  for (const s of ["setujuDokumen", "setujuIntegritas"]) {
    if (nilai[s] !== "on") galat[s] = "Persetujuan ini wajib dicentang.";
  }
  return galat;
}
