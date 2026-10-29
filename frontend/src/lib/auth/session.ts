/**
 * Token session (JWT HS256) di cookie HttpOnly.
 * Dipakai oleh middleware (Edge runtime) dan server, jadi hanya bergantung pada `jose`.
 */
// Impor subpath (bukan "jose") agar kode JWE/kompresi tidak ikut ke bundle Edge middleware.
import { SignJWT } from "jose/jwt/sign";
import { jwtVerify } from "jose/jwt/verify";
import { isPeranAkun, type PeranAkun } from "@/lib/auth/peran";

export const COOKIE_SESI = "aisn_sesi";

/** Lama session bila "Ingat saya" tidak dicentang / dicentang. */
export const DURASI_SESI_DETIK = 8 * 60 * 60;
export const DURASI_INGAT_DETIK = 30 * 24 * 60 * 60;

export interface Sesi {
  id: string;
  peran: PeranAkun;
  nama: string;
}

const RAHASIA_DEV = "dev-only-secret-ganti-di-env-local-minimal-32-karakter";

function kunci(): Uint8Array {
  const rahasia = process.env.AUTH_SECRET;
  if (rahasia && rahasia.length >= 32) return new TextEncoder().encode(rahasia);
  if (process.env.NODE_ENV === "production") {
    throw new Error("AUTH_SECRET wajib diisi (minimal 32 karakter) untuk mode produksi. Lihat .env.example.");
  }
  return new TextEncoder().encode(RAHASIA_DEV);
}

export async function buatToken(sesi: Sesi, durasiDetik: number): Promise<string> {
  return new SignJWT({ peran: sesi.peran, nama: sesi.nama })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(sesi.id)
    .setIssuedAt()
    .setExpirationTime(`${durasiDetik}s`)
    .sign(kunci());
}

/** Mengembalikan null bila token kosong, kedaluwarsa, atau tidak valid. */
export async function bacaToken(token: string | undefined): Promise<Sesi | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, kunci(), { algorithms: ["HS256"] });
    if (typeof payload.sub !== "string" || !isPeranAkun(payload.peran) || typeof payload.nama !== "string") {
      return null;
    }
    return { id: payload.sub, peran: payload.peran, nama: payload.nama };
  } catch {
    return null;
  }
}
