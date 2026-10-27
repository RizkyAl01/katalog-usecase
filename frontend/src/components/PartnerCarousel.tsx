"use client";

import Image from "next/image";
import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Mitra } from "@/lib/types";

export default function PartnerCarousel({ mitra }: { mitra: Mitra[] }) {
  const trackRef = useRef<HTMLUListElement>(null);

  const geser = (arah: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: arah * track.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={() => geser(-1)}
        aria-label="Mitra sebelumnya"
        className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-white text-navy shadow-sm ring-1 ring-line hover:text-primary"
      >
        <ArrowLeft className="size-5" aria-hidden />
      </button>

      <ul ref={trackRef} className="no-scrollbar flex flex-1 snap-x gap-2 overflow-x-auto scroll-smooth">
        {mitra.map((m) => (
          <li
            key={m.nama}
            title={`${m.nama} (${m.kategori})`}
            className="flex h-14 w-40 shrink-0 snap-start items-center justify-center bg-placeholder px-3 text-center"
          >
            {m.logo ? (
              <Image src={m.logo} alt={m.nama} width={140} height={48} className="max-h-10 w-auto object-contain" />
            ) : (
              <span className="text-xs font-semibold leading-tight text-navy">{m.nama}</span>
            )}
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={() => geser(1)}
        aria-label="Mitra berikutnya"
        className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-white text-navy shadow-sm ring-1 ring-line hover:text-primary"
      >
        <ArrowRight className="size-5" aria-hidden />
      </button>
    </div>
  );
}
