import "server-only";
import { cache } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cariAkunById, type AkunDemo } from "@/lib/auth/akun-demo";
import { konsolPath, type PeranAkun } from "@/lib/auth/peran";
import { bacaToken, COOKIE_SESI, type Sesi } from "@/lib/auth/session";

/** Session aktif (null bila belum login). Di-cache per request. */
export const getSesi = cache(async (): Promise<Sesi | null> => {
  const store = await cookies();
  return bacaToken(store.get(COOKIE_SESI)?.value);
});

/**
 * Wajib login dengan peran tertentu. Pemeriksaan ini dilakukan di setiap halaman konsol
 * (selain middleware) agar akses tetap aman walau middleware dilewati.
 */
export async function wajibPeran(peran: PeranAkun): Promise<{ sesi: Sesi; akun: AkunDemo }> {
  const sesi = await getSesi();
  if (!sesi) redirect(`/masuk?next=${encodeURIComponent(konsolPath(peran))}`);
  if (sesi.peran !== peran) redirect(konsolPath(sesi.peran));
  const akun = cariAkunById(sesi.id);
  if (!akun) redirect("/keluar");
  return { sesi, akun };
}
