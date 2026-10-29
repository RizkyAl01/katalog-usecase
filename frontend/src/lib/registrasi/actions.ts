"use server";

import { validasiKL, validasiUmum, type Galat, type InfoBerkas } from "@/lib/registrasi/validasi";

export type StateDaftar =
  | { status: "awal" }
  | { status: "galat"; galat: Galat; nilai: Record<string, string> }
  | { status: "sukses"; email: string; entitas: string };

const RAHASIA = new Set(["kataSandi", "konfirmasi"]);

function bacaForm(formData: FormData): { nilai: Record<string, string>; berkas: InfoBerkas | null } {
  const nilai: Record<string, string> = {};
  let berkas: InfoBerkas | null = null;
  for (const [kunci, isi] of formData.entries()) {
    if (kunci.startsWith("$")) continue; // field internal React/Next
    if (typeof isi === "string") nilai[kunci] = isi;
    else if (kunci === "dokumen") berkas = { name: isi.name, size: isi.size, type: isi.type };
  }
  return { nilai, berkas };
}

/** Nilai dikembalikan ke form saat galat, tanpa kata sandi. */
function tanpaRahasia(nilai: Record<string, string>) {
  return Object.fromEntries(Object.entries(nilai).filter(([k]) => !RAHASIA.has(k)));
}

/**
 * MODE DEMO: data tervalidasi tetapi TIDAK disimpan (belum ada database / layanan email).
 * Saat backend tersedia: simpan akun berstatus "menunggu verifikasi email", simpan dokumen,
 * lalu kirim tautan aktivasi ke email PIC.
 */
export async function daftarUmum(_state: StateDaftar, formData: FormData): Promise<StateDaftar> {
  const { nilai, berkas } = bacaForm(formData);
  const galat = validasiUmum(nilai, berkas);
  if (Object.keys(galat).length > 0) return { status: "galat", galat, nilai: tanpaRahasia(nilai) };
  return { status: "sukses", email: nilai.emailPic.trim(), entitas: nilai.namaEntitas.trim() };
}

export async function daftarKL(_state: StateDaftar, formData: FormData): Promise<StateDaftar> {
  const { nilai, berkas } = bacaForm(formData);
  const galat = validasiKL(nilai, berkas);
  if (Object.keys(galat).length > 0) return { status: "galat", galat, nilai: tanpaRahasia(nilai) };
  return { status: "sukses", email: nilai.emailPic.trim(), entitas: nilai.namaEntitas.trim() };
}
