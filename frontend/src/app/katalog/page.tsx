import type { Metadata } from "next";
import Link from "next/link";
import KatalogCard from "@/components/KatalogCard";
import { getDaftarSektor, getSektor, getSemuaItemPublik, JENIS_KATALOG } from "@/lib/katalog";

export const metadata: Metadata = { title: "Katalog Use-Case" };

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

function ambil(nilai: string | string[] | undefined) {
  return (Array.isArray(nilai) ? nilai[0] : nilai)?.trim() ?? "";
}

/** Versi sementara: daftar + filter sederhana. Halaman katalog lengkap (mockup hal. 17–18) dikerjakan berikutnya. */
export default async function Katalog({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const q = ambil(params.q).toLowerCase();
  const jenis = JENIS_KATALOG.find((j) => j.id === ambil(params.jenis));
  const sektor = getDaftarSektor().find((s) => s.id === ambil(params.sektor));

  const hasil = getSemuaItemPublik()
    .filter((item) => !jenis || item.jenis === jenis.id)
    .filter((item) => !sektor || item.sektor === sektor.id)
    .filter((item) => {
      if (!q) return true;
      const teks = [item.judul, item.ringkasan, item.pengusul.nama, item.teknologi, getSektor(item.sektor).nama]
        .join(" ")
        .toLowerCase();
      return teks.includes(q);
    });

  const filterAktif = [jenis?.labelLengkap, sektor && `Sektor ${sektor.nama}`, q && `"${ambil(params.q)}"`].filter(Boolean);

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-10 sm:px-6">
      <h1 className="text-2xl font-bold text-navy sm:text-3xl">Katalog Use-Case AI Nasional</h1>
      <p className="mt-2 text-sm text-muted">
        Seluruh use case, kebutuhan, dan riset AI yang telah terverifikasi dan dipublikasikan.
      </p>
      <p className="mt-4 inline-block rounded-md bg-chip-status px-3 py-1 text-xs font-semibold text-chip-status-fg">
        Versi sementara — filter lengkap sedang dikembangkan
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-2 text-sm">
        <span className="text-muted">
          {hasil.length} hasil{filterAktif.length > 0 && ` untuk ${filterAktif.join(", ")}`}
        </span>
        {filterAktif.length > 0 && (
          <Link href="/katalog" className="font-semibold text-accent hover:underline">
            Reset filter
          </Link>
        )}
      </div>

      {hasil.length > 0 ? (
        <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {hasil.map((item) => (
            <li key={item.id}>
              <KatalogCard item={item} sektor={getSektor(item.sektor)} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-6 rounded-xl bg-white p-10 text-center text-sm text-muted">Tidak ada hasil yang cocok.</p>
      )}
    </div>
  );
}
