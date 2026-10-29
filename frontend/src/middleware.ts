import { NextResponse, type NextRequest } from "next/server";
import { konsolPath } from "@/lib/auth/peran";
import { bacaToken, COOKIE_SESI } from "@/lib/auth/session";

/**
 * Pemeriksaan awal untuk /konsol/*: belum login -> /masuk, salah peran -> konsol miliknya.
 * Halaman konsol tetap memeriksa ulang lewat `wajibPeran` (lib/auth/dal.ts).
 */
export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const sesi = await bacaToken(request.cookies.get(COOKIE_SESI)?.value);

  if (!sesi) {
    const url = new URL("/masuk", request.url);
    url.searchParams.set("next", pathname + search);
    const res = NextResponse.redirect(url);
    if (request.cookies.has(COOKIE_SESI)) res.cookies.delete(COOKIE_SESI);
    return res;
  }

  const milik = konsolPath(sesi.peran);
  if (pathname !== milik && !pathname.startsWith(`${milik}/`)) {
    return NextResponse.redirect(new URL(milik, request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/konsol", "/konsol/:path*"],
};
