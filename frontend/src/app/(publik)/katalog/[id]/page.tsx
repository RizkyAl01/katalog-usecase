import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ComingSoon from "@/components/ComingSoon";
import { getItemPublik, getSektor, getSemuaItemPublik } from "@/lib/katalog";

export function generateStaticParams() {
  return getSemuaItemPublik().map((item) => ({ id: item.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  return { title: getItemPublik(id)?.judul };
}

export default async function DetailKatalog({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = getItemPublik(id);
  if (!item) notFound();

  const info = [
    ["Pengusul", `${item.pengusul.nama} (${item.pengusul.kelompok})`],
    ["Sektor", getSektor(item.sektor).nama],
    ["Teknologi", item.teknologi],
    ["Tahap", item.tahap],
    ["Kategori Risiko", item.risiko],
    ["Diverifikasi oleh", item.verifikator],
    ["Dampak", item.dampak],
  ].filter((baris): baris is [string, string] => Boolean(baris[1]));

  return (
    <ComingSoon judul={item.judul} deskripsi={item.ringkasan}>
      <dl className="mx-auto mt-8 max-w-md divide-y divide-line rounded-xl border border-line text-left text-sm">
        {info.map(([label, nilai]) => (
          <div key={label} className="grid grid-cols-[140px_1fr] gap-3 px-4 py-2.5">
            <dt className="text-muted">{label}</dt>
            <dd className="font-medium text-navy">{nilai}</dd>
          </div>
        ))}
      </dl>
    </ComingSoon>
  );
}
