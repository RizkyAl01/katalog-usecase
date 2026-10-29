"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifikasiKredensial } from "@/lib/auth/akun-demo";
import { isPeranAkun, konsolPath, LABEL_MASUK, type PeranAkun } from "@/lib/auth/peran";
import { buatToken, COOKIE_SESI, DURASI_INGAT_DETIK, DURASI_SESI_DETIK } from "@/lib/auth/session";

export interface StateMasuk {
  error?: string;
  email?: string;
}

/** Hanya izinkan redirect ke konsol milik peran itu sendiri (cegah open redirect). */
function tujuanAman(next: FormDataEntryValue | null, peran: PeranAkun): string {
  const dasar = konsolPath(peran);
  if (typeof next !== "string") return dasar;
  const valid = (next === dasar || next.startsWith(`${dasar}/`)) && !next.includes("//") && !next.includes("\\");
  return valid ? next : dasar;
}

export async function masuk(_state: StateMasuk, formData: FormData): Promise<StateMasuk> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const peranDipilih = formData.get("peran");
  const ingat = formData.get("ingat") === "on";

  if (!email || !password) {
    return { error: "Email dan password wajib diisi.", email };
  }

  const akun = verifikasiKredensial(email, password);
  if (!akun) {
    return { error: "Email atau password salah.", email };
  }
  if (isPeranAkun(peranDipilih) && peranDipilih !== akun.peran) {
    return {
      error: `Akun ini terdaftar sebagai ${LABEL_MASUK[akun.peran]}. Pilih "Masuk sebagai ${LABEL_MASUK[akun.peran]}" untuk melanjutkan.`,
      email,
    };
  }

  const durasi = ingat ? DURASI_INGAT_DETIK : DURASI_SESI_DETIK;
  const token = await buatToken({ id: akun.id, peran: akun.peran, nama: akun.nama }, durasi);
  const store = await cookies();
  store.set(COOKIE_SESI, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    // Tanpa "Ingat saya": cookie sesi browser (hilang saat browser ditutup), token tetap kedaluwarsa 8 jam.
    maxAge: ingat ? DURASI_INGAT_DETIK : undefined,
  });

  redirect(tujuanAman(formData.get("next"), akun.peran));
}

export async function keluar(): Promise<void> {
  const store = await cookies();
  store.delete(COOKIE_SESI);
  redirect("/masuk");
}
