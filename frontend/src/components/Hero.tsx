import Image from "next/image";
import Link from "next/link";
import { BookOpen, ClipboardList, FlaskConical, LayoutGrid } from "lucide-react";
import { getStatistik } from "@/lib/katalog";

export default function Hero() {
  const stat = getStatistik();
  const ringkasan = [
    { label: "Use Case Terpublikasi", nilai: stat.useCase, ikon: BookOpen, warna: "bg-chip-sektor text-chip-sektor-fg" },
    { label: "Kebutuhan Use Case", nilai: stat.kebutuhan, ikon: ClipboardList, warna: "bg-chip-status text-chip-status-fg" },
    { label: "Riset & Inovasi", nilai: stat.riset, ikon: FlaskConical, warna: "bg-chip-tek text-chip-tek-fg" },
    { label: "Sektor Terjangkau", nilai: stat.sektor, ikon: LayoutGrid, warna: "bg-soft text-primary" },
  ];

  return (
    <section className="relative isolate overflow-hidden rounded-[28px] sm:rounded-[40px]">
      <Image
        src="/images/hero-monas.webp"
        alt="Lanskap kota Jakarta dengan Monumen Nasional"
        fill
        priority
        sizes="(max-width: 1440px) 100vw, 1440px"
        className="-z-10 object-cover object-[center_60%]"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy/85 via-navy/55 to-navy/10" aria-hidden />

      <div className="grid items-center gap-10 px-6 py-12 sm:px-12 sm:py-16 lg:grid-cols-[1.25fr_1fr] lg:px-16 lg:py-20">
        <div>
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl lg:leading-[1.15]">
            Platform Registrasi, Integrasi, dan Sistem Monitoring AI Nasional
          </h1>
          <p className="mt-5 max-w-2xl text-base font-semibold leading-relaxed text-sun sm:text-lg">
            Portal rujukan nasional untuk penemuan solusi, evaluasi etika, serta pendorong kolaborasi dan hilirisasi
            inovasi Kecerdasan Artifisial di Indonesia.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/daftar?peran=inovator"
              className="rounded-lg bg-sun px-5 py-3 text-sm font-semibold text-navy shadow-sm transition-colors hover:bg-sun-hover"
            >
              Daftar sebagai Inovator
            </Link>
            <Link
              href="/katalog"
              className="rounded-lg border border-white/60 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20"
            >
              Lihat Katalog
            </Link>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-xl sm:p-8">
          <p className="text-sm font-semibold text-navy">Ringkasan Ekosistem AI Nasional</p>
          <p className="mt-1 text-xs text-muted">Data terverifikasi &amp; terpublikasi di platform</p>
          <ul className="mt-6 grid grid-cols-2 gap-4">
            {ringkasan.map(({ label, nilai, ikon: Ikon, warna }) => (
              <li key={label} className="rounded-2xl border border-line p-4">
                <span className={`inline-flex size-9 items-center justify-center rounded-lg ${warna}`}>
                  <Ikon className="size-5" aria-hidden />
                </span>
                <p className="mt-3 text-3xl font-bold text-navy">{nilai}</p>
                <p className="mt-0.5 text-xs font-medium text-muted">{label}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
