import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import FormMasuk, { PanelAkunDemo } from "@/components/auth/FormMasuk";
import { AKUN_DEMO, PASSWORD_DEMO } from "@/lib/auth/akun-demo";
import { getSesi } from "@/lib/auth/dal";
import { isPeranAkun, konsolPath, LABEL_MASUK, type PeranAkun } from "@/lib/auth/peran";

export const metadata: Metadata = { title: "Masuk" };

/** Peran dengan varian halaman login di mockup (hal. 20–23). */
const PERAN_UTAMA: PeranAkun[] = ["inovator", "reviewer", "penyedia", "pengguna"];
const PERAN_LAIN: PeranAkun[] = ["investor", "regulator"];

const FOTO: Record<PeranAkun, string> = {
  inovator: "/images/login-inovator.webp",
  reviewer: "/images/login-reviewer.webp",
  penyedia: "/images/login-penyedia.webp",
  pengguna: "/images/login-pengguna.webp",
  investor: "/images/login-inovator.webp",
  regulator: "/images/login-reviewer.webp",
};

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function HalamanMasuk({ searchParams }: { searchParams: SearchParams }) {
  const sesi = await getSesi();
  if (sesi) redirect(konsolPath(sesi.peran));

  const params = await searchParams;
  const peranParam = Array.isArray(params.peran) ? params.peran[0] : params.peran;
  const nextParam = Array.isArray(params.next) ? params.next[0] : params.next;
  const peran = isPeranAkun(peranParam) ? peranParam : null;

  const akunDemo = AKUN_DEMO.filter((a) => !peran || a.peran === peran).map((a) => ({
    email: a.email,
    label: LABEL_MASUK[a.peran],
  }));

  return (
    <div className="grid min-h-[calc(100vh-72px)] lg:grid-cols-[1fr_1fr]">
      <div className="relative hidden lg:block">
        <Image src={FOTO[peran ?? "penyedia"]} alt="" fill priority sizes="50vw" className="object-cover" />
      </div>

      <div className="flex items-center justify-center px-4 py-12 sm:px-6">
        <div className="w-full max-w-[540px] rounded-2xl bg-white p-6 shadow-sm ring-1 ring-line sm:p-10">
          <h1 className="text-2xl font-bold text-navy sm:text-[28px]">Selamat Datang</h1>
          <p className="mt-2 text-sm text-muted">
            {peran
              ? `Masuk sebagai ${LABEL_MASUK[peran]} untuk mengakses fitur sistem.`
              : "Masuk ke akun Anda untuk mengakses fitur sistem."}
          </p>

          <FormMasuk peran={peran} next={nextParam ?? ""} />

          <div className="mt-4 space-y-3">
            {PERAN_UTAMA.filter((p) => p !== peran).map((p) => (
              <Link
                key={p}
                href={`/masuk?peran=${p}`}
                className="block rounded-lg border border-line py-3 text-center text-sm font-medium text-navy transition-colors hover:border-primary hover:text-primary"
              >
                Masuk sebagai {LABEL_MASUK[p]}
              </Link>
            ))}
          </div>
          <p className="mt-4 text-center text-xs text-muted">
            Atau masuk sebagai{" "}
            {PERAN_LAIN.filter((p) => p !== peran).map((p, i, arr) => (
              <span key={p}>
                <Link href={`/masuk?peran=${p}`} className="font-semibold text-accent hover:underline">
                  {LABEL_MASUK[p]}
                </Link>
                {i < arr.length - 1 && " · "}
              </span>
            ))}
            {peran && PERAN_LAIN.includes(peran) && (
              <>
                {" · "}
                <Link href="/masuk" className="font-semibold text-accent hover:underline">
                  semua peran
                </Link>
              </>
            )}
          </p>

          <p className="mt-6 text-center text-sm text-navy">
            Belum punya akun?{" "}
            <Link href="/daftar" className="font-medium text-accent hover:underline">
              Daftar di sini
            </Link>
          </p>

          <PanelAkunDemo akunDemo={akunDemo} passwordDemo={PASSWORD_DEMO} />
        </div>
      </div>
    </div>
  );
}
