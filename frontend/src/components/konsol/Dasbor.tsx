import Link from "next/link";
import { ArrowRight, ListFilter, Plus, type LucideIcon } from "lucide-react";

export function HeaderKonsol({
  nama,
  subjudul,
  deskripsi,
  cta,
}: {
  nama: string;
  subjudul?: string;
  deskripsi: string;
  cta?: { label: string; href: string };
}) {
  return (
    <header className="bg-konsol-header px-4 py-7 sm:px-6 lg:px-7">
      <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-navy sm:text-[32px]">Selamat datang, {nama}</h1>
          {subjudul && <p className="mt-1 text-sm font-semibold text-navy-soft">{subjudul}</p>}
          <p className="mt-1 max-w-2xl text-sm text-navy-soft">{deskripsi}</p>
        </div>
        {cta && (
          <Link
            href={cta.href}
            className="inline-flex shrink-0 items-center gap-2 self-start rounded-lg border border-primary bg-white px-4 py-3 text-sm font-semibold text-primary shadow-sm transition-colors hover:bg-primary hover:text-white"
          >
            <Plus className="size-5" aria-hidden />
            {cta.label}
          </Link>
        )}
      </div>
    </header>
  );
}

export type NadaIkon = "biru" | "oranye" | "merah" | "hijau" | "ungu";

const NADA_IKON: Record<NadaIkon, string> = {
  biru: "bg-chip-sektor text-chip-sektor-fg",
  oranye: "bg-chip-status text-chip-status-fg",
  merah: "bg-red-50 text-red-600",
  hijau: "bg-chip-tek text-chip-tek-fg",
  ungu: "bg-violet-50 text-violet-600",
};

export interface Metrik {
  label: string;
  nilai: string | number;
  ikon: LucideIcon;
  nada: NadaIkon;
  keterangan?: string;
  href?: string;
}

export function BarisMetrik({ judul, deskripsi, metrik }: { judul?: string; deskripsi?: string; metrik: Metrik[] }) {
  return (
    <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-line">
      {judul && <h2 className="text-base font-bold text-navy">{judul}</h2>}
      {deskripsi && <p className="text-xs text-navy-soft">{deskripsi}</p>}
      <ul
        className={`grid gap-4 sm:grid-cols-2 ${metrik.length >= 5 ? "xl:grid-cols-5" : metrik.length === 4 ? "xl:grid-cols-4" : "xl:grid-cols-2"} ${judul ? "mt-4" : ""}`}
      >
        {metrik.map(({ label, nilai, ikon: Ikon, nada, keterangan, href }) => (
          <li key={label} className="flex items-start gap-3 rounded-xl p-2 xl:border-r xl:border-line xl:last:border-r-0">
            <span className={`inline-flex size-12 shrink-0 items-center justify-center rounded-xl ${NADA_IKON[nada]}`}>
              <Ikon className="size-6" aria-hidden />
            </span>
            <div className="min-w-0">
              <p className="text-2xl font-bold leading-tight text-navy">{nilai}</p>
              <p className="text-sm font-medium text-navy">{label}</p>
              {keterangan && <p className="mt-0.5 text-xs text-navy-soft">{keterangan}</p>}
              {href && (
                <Link href={href} className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-accent hover:underline">
                  Lihat Detail <ArrowRight className="size-3.5" aria-hidden />
                </Link>
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export type NadaBadge = "hijau" | "oranye" | "merah" | "biru" | "abu";

const NADA_BADGE: Record<NadaBadge, string> = {
  hijau: "bg-chip-tek text-chip-tek-fg",
  oranye: "bg-chip-status text-chip-status-fg",
  merah: "bg-red-50 text-red-600",
  biru: "bg-chip-sektor text-chip-sektor-fg",
  abu: "bg-slate-100 text-slate-600",
};

export function Badge({ nada, children }: { nada: NadaBadge; children: React.ReactNode }) {
  return <span className={`inline-block whitespace-nowrap rounded-md px-3 py-1 text-xs font-semibold ${NADA_BADGE[nada]}`}>{children}</span>;
}

export interface Kolom<T> {
  judul: string;
  isi: (baris: T, indeks: number) => React.ReactNode;
  kelas?: string;
}

/** Tabel daftar dengan pencarian (form GET ?q=, tanpa JavaScript). */
export function TabelKonsol<T extends { id: string }>({
  judul,
  deskripsi,
  q,
  action,
  kolom,
  baris,
  aksi,
}: {
  judul: string;
  deskripsi: string;
  q: string;
  action: string;
  kolom: Kolom<T>[];
  baris: T[];
  aksi: (baris: T) => { label: string; href: string };
}) {
  return (
    <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-line sm:p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <h2 className="text-xl font-bold text-navy sm:text-2xl">{judul}</h2>
          <p className="mt-1 text-sm font-medium text-navy-soft">{deskripsi}</p>
        </div>
        <form action={action} role="search" className="relative w-full md:w-80">
          <label htmlFor="cari-tabel" className="sr-only">
            Cari nama use-case
          </label>
          <ListFilter className="pointer-events-none absolute left-3.5 top-1/2 size-5 -translate-y-1/2 text-muted" aria-hidden />
          <input
            id="cari-tabel"
            name="q"
            type="search"
            defaultValue={q}
            placeholder="Cari nama use-case..."
            className="h-11 w-full rounded-lg border border-line bg-white pl-11 pr-3 text-sm text-navy placeholder:text-muted focus:border-cta focus:outline-none focus:ring-2 focus:ring-cta/25"
          />
        </form>
      </div>

      {/* relative: elemen sr-only (absolute) di dalam tabel harus ikut terpotong scroll container */}
      <div className="relative mt-5 overflow-x-auto">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead>
            <tr className="bg-page text-navy">
              <th scope="col" className="w-12 rounded-l-lg px-4 py-3 font-semibold">
                No.
              </th>
              {kolom.map((k) => (
                <th key={k.judul} scope="col" className={`px-4 py-3 font-semibold ${k.kelas ?? ""}`}>
                  {k.judul}
                </th>
              ))}
              <th scope="col" className="rounded-r-lg px-4 py-3">
                <span className="sr-only">Aksi</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {baris.map((b, i) => {
              const { label, href } = aksi(b);
              return (
                <tr key={b.id} className="align-middle text-navy">
                  <td className="px-4 py-4">{i + 1}</td>
                  {kolom.map((k) => (
                    <td key={k.judul} className={`px-4 py-4 ${k.kelas ?? ""}`}>
                      {k.isi(b, i)}
                    </td>
                  ))}
                  <td className="px-4 py-4 text-right">
                    <Link
                      href={href}
                      className="inline-block whitespace-nowrap rounded-md border border-primary px-4 py-1.5 text-xs font-semibold text-primary hover:bg-primary hover:text-white"
                    >
                      {label}
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {baris.length === 0 && (
          <p className="py-10 text-center text-sm text-muted">
            {q ? `Tidak ada data yang cocok dengan "${q}".` : "Belum ada data."}
          </p>
        )}
      </div>
    </section>
  );
}

const BULAN = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];

/** "2026-03-05" -> "5 Mar 2026" (tanpa bergantung zona waktu). */
export function formatTanggal(iso: string) {
  const [t, b, h] = iso.split("-").map(Number);
  return `${h} ${BULAN[b - 1]} ${t}`;
}
