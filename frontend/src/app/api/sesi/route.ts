import { NextResponse } from "next/server";
import { getSesi } from "@/lib/auth/dal";
import { konsolPath, LABEL_PERAN } from "@/lib/auth/peran";

export const dynamic = "force-dynamic";

/** Dipakai Navbar publik (halaman statis) untuk mengetahui status login. */
export async function GET() {
  const sesi = await getSesi();
  const body = sesi ? { nama: sesi.nama, peran: LABEL_PERAN[sesi.peran], konsol: konsolPath(sesi.peran) } : null;
  return NextResponse.json(body, { headers: { "Cache-Control": "no-store" } });
}
