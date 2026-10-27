import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Building, TrendingUp } from "lucide-react";
import type { KatalogItem, Sektor } from "@/lib/types";
import { SEKTOR_TAMPILAN } from "@/components/sektorTampilan";

interface Props {
  item: KatalogItem;
  sektor: Sektor;
}

export default function KatalogCard({ item, sektor }: Props) {
  const gambar = item.gambar ?? sektor.gambar;
  const { ikon: Ikon, latar } = SEKTOR_TAMPILAN[sektor.id];

  return (
    <Link
      href={`/katalog/${item.id}`}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-white shadow-sm transition-shadow hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      <div className="relative h-40 overflow-hidden">
        {gambar ? (
          <Image
            src={gambar}
            alt=""
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className={`flex h-full items-center justify-center bg-gradient-to-br ${latar}`} aria-hidden>
            <Ikon className="size-14 text-navy/30" />
          </div>
        )}
        <span className="absolute left-3 top-3 rounded-md bg-white px-2.5 py-1 text-xs font-semibold text-navy shadow-sm">
          {sektor.nama}
        </span>
        {item.tahap && (
          <span className="absolute bottom-3 right-3 rounded-md bg-white px-2.5 py-1 text-xs font-semibold text-navy shadow-sm">
            {item.tahap}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-base font-semibold leading-snug text-navy">{item.judul}</h3>
        <p className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-navy-soft">
          <Building className="size-3.5 shrink-0 text-muted" aria-hidden />
          <span className="truncate">{item.pengusul.nama}</span>
        </p>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">{item.ringkasan}</p>
        <p className="mt-2 flex items-start gap-1.5 text-xs font-medium text-navy-soft">
          <TrendingUp className="mt-px size-3.5 shrink-0 text-ajukan" aria-hidden />
          {item.dampak}
        </p>
        <p className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-ajukan" title={`Diverifikasi oleh ${item.verifikator}`}>
          <BadgeCheck className="size-4" aria-hidden />
          Terverifikasi
        </p>

        <div className="mt-auto flex items-center justify-between gap-3 pt-4">
          <span className="truncate rounded-md bg-soft px-3 py-1 text-xs font-semibold text-navy">{item.teknologi}</span>
          <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-soft text-accent transition-colors group-hover:bg-accent group-hover:text-white">
            <ArrowRight className="size-4" aria-hidden />
            <span className="sr-only">Lihat detail {item.judul}</span>
          </span>
        </div>
      </div>
    </Link>
  );
}
