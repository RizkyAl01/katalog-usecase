"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import type { JenisKatalog, KatalogItem, Sektor } from "@/lib/types";
import KatalogCard from "@/components/KatalogCard";

export interface TabKatalog {
  id: JenisKatalog;
  label: string;
  labelLengkap: string;
  item: { item: KatalogItem; sektor: Sektor }[];
}

export default function KatalogTabs({ tabs }: { tabs: TabKatalog[] }) {
  const [aktifId, setAktifId] = useState<JenisKatalog>(tabs[0].id);
  const aktif = tabs.find((t) => t.id === aktifId) ?? tabs[0];

  return (
    <section aria-labelledby="judul-katalog">
      <h2 id="judul-katalog" className="text-2xl font-bold text-navy sm:text-[28px]">
        Katalog Use-Case AI
      </h2>
      <div className="mt-1 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <p className="text-sm text-muted">
          Lihat berbagai inovasi AI yang sedang diajukan dan dikembangkan di Indonesia dari berbagai sektor.
        </p>
        <Link
          href={`/katalog?jenis=${aktif.id}`}
          className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-accent hover:underline"
        >
          Lihat Semua {aktif.labelLengkap}
          <ArrowRight className="size-4" aria-hidden />
        </Link>
      </div>

      <div role="tablist" aria-label="Jenis katalog" className="mt-5 inline-flex rounded-lg bg-white p-1 shadow-sm ring-1 ring-line">
        {tabs.map((tab) => {
          const dipilih = tab.id === aktif.id;
          return (
            <button
              key={tab.id}
              id={`tab-${tab.id}`}
              type="button"
              role="tab"
              aria-selected={dipilih}
              aria-controls={`panel-${tab.id}`}
              onClick={() => setAktifId(tab.id)}
              className={`rounded-md px-4 py-1.5 text-sm font-semibold transition-colors ${
                dipilih ? "bg-primary text-white" : "text-navy hover:text-primary"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div id={`panel-${aktif.id}`} role="tabpanel" aria-labelledby={`tab-${aktif.id}`} className="mt-5">
        {aktif.item.length > 0 ? (
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {aktif.item.map(({ item, sektor }) => (
              <li key={item.id}>
                <KatalogCard item={item} sektor={sektor} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="rounded-xl bg-white p-8 text-center text-sm text-muted">
            Belum ada {aktif.labelLengkap.toLowerCase()} yang terpublikasi.
          </p>
        )}
      </div>
    </section>
  );
}
