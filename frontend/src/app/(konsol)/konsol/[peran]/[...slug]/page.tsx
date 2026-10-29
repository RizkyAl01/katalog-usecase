import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Construction } from "lucide-react";
import { wajibPeran } from "@/lib/auth/dal";
import { isPeranAkun, konsolPath, type PeranAkun } from "@/lib/auth/peran";
import { ID_DETAIL } from "@/lib/konsol/data";
import { judulHalaman } from "@/lib/konsol/menu";

/** Rute aksi per baris tabel: `<aksi>/<id>`; hanya berlaku untuk peran tertentu. */
const AKSI_BARIS: Record<string, { judul: string; peran: PeranAkun[] }> = {
  detail: { judul: "Detail", peran: ["penyedia", "pengguna", "inovator"] },
  tinjau: { judul: "Tinjau Pengajuan", peran: ["reviewer"] },
  "persetujuan-akun": { judul: "Persetujuan Akun K/L", peran: ["regulator"] },
};

function resolveJudul(peran: PeranAkun, slug: string[]): string | undefined {
  if (slug.length === 1) return judulHalaman(peran, slug[0]);
  if (slug.length === 2) {
    const aksi = AKSI_BARIS[slug[0]];
    if (aksi?.peran.includes(peran) && ID_DETAIL[peran].has(slug[1])) return `${aksi.judul} ${slug[1].toUpperCase()}`;
  }
  return undefined;
}

type Params = Promise<{ peran: string; slug: string[] }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { peran, slug } = await params;
  return { title: isPeranAkun(peran) ? resolveJudul(peran, slug) : undefined };
}

/** Halaman sementara untuk menu konsol yang belum dikembangkan (tahap ini: dashboard awal). */
export default async function HalamanKonsol({ params }: { params: Params }) {
  const { peran, slug } = await params;
  if (!isPeranAkun(peran)) notFound();
  await wajibPeran(peran);
  const judul = resolveJudul(peran, slug);
  if (!judul) notFound();

  return (
    <div className="p-4 sm:p-6 lg:p-7">
      <div className="rounded-2xl bg-white p-8 text-center shadow-sm ring-1 ring-line sm:p-12">
        <span className="mx-auto inline-flex size-14 items-center justify-center rounded-2xl bg-soft text-primary">
          <Construction className="size-7" aria-hidden />
        </span>
        <h1 className="mt-5 text-2xl font-bold text-navy">{judul}</h1>
        <p className="mt-4 inline-block rounded-md bg-chip-status px-3 py-1 text-xs font-semibold text-chip-status-fg">
          Halaman sedang dikembangkan
        </p>
        <div className="mt-8">
          <Link href={konsolPath(peran)} className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline">
            <ArrowLeft className="size-4" aria-hidden />
            Kembali ke Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
