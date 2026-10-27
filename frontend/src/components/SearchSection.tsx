import Form from "next/form";
import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import { getSektorPopuler } from "@/lib/katalog";
import { SEKTOR_TAMPILAN } from "@/components/sektorTampilan";

const FILTER_CEPAT = [
  { label: "Sektor", href: "/katalog?filter=sektor", warna: "bg-chip-sektor text-chip-sektor-fg" },
  { label: "Teknologi", href: "/katalog?filter=teknologi", warna: "bg-chip-tek text-chip-tek-fg" },
  { label: "Status Verifikasi", href: "/katalog?filter=status", warna: "bg-chip-status text-chip-status-fg" },
];

export default function SearchSection() {
  const sektorPopuler = getSektorPopuler();

  return (
    <section aria-labelledby="judul-cari" className="relative isolate overflow-hidden rounded-[24px]">
      <Image
        src="/images/jakarta-city.webp"
        alt=""
        fill
        sizes="(max-width: 1440px) 100vw, 1440px"
        className="-z-10 object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy/85 via-navy/65 to-navy/30" aria-hidden />

      <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.6fr_1fr] lg:p-10">
        <div className="flex flex-col justify-center">
          <h2 id="judul-cari" className="text-2xl font-bold text-white sm:text-3xl">
            Cari dan Jelajahi Use Case AI
          </h2>
          <p className="mt-3 max-w-xl text-base font-medium text-sun">
            Temukan berbagai use case AI berdasarkan sektor, status, atau kata kunci untuk melihat inovasi yang sedang
            dikembangkan di Indonesia.
          </p>

          <Form action="/katalog" className="mt-6 flex flex-col gap-3 sm:flex-row" role="search">
            <label htmlFor="q" className="sr-only">
              Kata kunci pencarian
            </label>
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted" aria-hidden />
              <input
                id="q"
                name="q"
                type="search"
                placeholder="Cari use case, sektor, atau kata kunci..."
                className="h-12 w-full rounded-lg border border-white bg-white pl-12 pr-4 text-sm text-navy placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-cta"
              />
            </div>
            <button
              type="submit"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-cta px-7 text-sm font-semibold text-white transition-colors hover:bg-cta-hover"
            >
              <Search className="size-4" aria-hidden />
              Cari
            </button>
          </Form>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <span className="text-sm font-medium text-white/90">Filter Cepat :</span>
            {FILTER_CEPAT.map((f) => (
              <Link key={f.label} href={f.href} className={`rounded-md px-4 py-1.5 text-sm font-medium transition-opacity hover:opacity-85 ${f.warna}`}>
                {f.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-panel/90 p-5 backdrop-blur-sm">
          <h3 className="text-sm font-semibold text-navy">Sektor Populer</h3>
          <ul className="mt-3 space-y-2">
            {sektorPopuler.map(({ sektor, total }) => {
              const { ikon: Ikon, warna } = SEKTOR_TAMPILAN[sektor.id];
              return (
                <li key={sektor.id}>
                  <Link
                    href={`/katalog?sektor=${sektor.id}`}
                    className="flex items-center gap-3 rounded-lg bg-white/60 px-3 py-2.5 text-sm transition-colors hover:bg-white"
                  >
                    <span className={`inline-flex size-7 items-center justify-center rounded-md ${warna}`}>
                      <Ikon className="size-4" aria-hidden />
                    </span>
                    <span className="flex-1 font-medium text-navy">{sektor.nama}</span>
                    <span className="text-xs text-muted">{total} use case</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
