import { NextResponse, type NextRequest } from "next/server";
import { COOKIE_SESI } from "@/lib/auth/session";

/** Membersihkan session yang tidak lagi valid (mis. akun sudah tidak ada). Logout biasa memakai server action `keluar`. */
export function GET(request: NextRequest) {
  const res = NextResponse.redirect(new URL("/masuk", request.url));
  res.cookies.delete(COOKIE_SESI);
  return res;
}
