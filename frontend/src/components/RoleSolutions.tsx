import Link from "next/link";
import {
  ArrowRight,
  Check,
  ClipboardCheck,
  Gauge,
  Handshake,
  Lightbulb,
  PackageOpen,
  Search,
  Users,
  type LucideIcon,
} from "lucide-react";
import { getPeran } from "@/lib/katalog";
import type { PeranId } from "@/lib/types";

const IKON_PERAN: Record<PeranId, LucideIcon> = {
  penyedia: PackageOpen,
  pengguna: Search,
  inovator: Lightbulb,
  investor: Handshake,
  regulator: Gauge,
  reviewer: ClipboardCheck,
  masyarakat: Users,
};

export default function RoleSolutions() {
  const peran = getPeran();

  return (
    <section aria-labelledby="judul-peran">
      <h2 id="judul-peran" className="text-2xl font-bold text-navy sm:text-[28px]">
        Solusi sesuai peran Anda
      </h2>
      <p className="mt-1 text-sm text-muted">
        Platform ini dirancang untuk mendukung kolaborasi seluruh pihak dalam pengelolaan dan pemanfaatan use case AI
        Indonesia.
      </p>

      <ul className="mt-6 flex flex-wrap justify-center gap-5">
        {peran.map((p) => {
          const Ikon = IKON_PERAN[p.id];
          return (
            <li
              key={p.id}
              className="flex w-full flex-col rounded-xl border border-line bg-white p-5 shadow-sm sm:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-3.75rem)/4)]"
            >
              <div className="flex items-start gap-3">
                <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg bg-soft text-primary">
                  <Ikon className="size-5" aria-hidden />
                </span>
                <div>
                  <h3 className="text-base font-semibold text-navy-soft">{p.nama}</h3>
                  {p.keterangan && <p className="text-xs text-muted">{p.keterangan}</p>}
                </div>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted">{p.benefit}</p>
              <ul className="mt-3 space-y-1.5">
                {p.fitur.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-xs font-medium text-navy-soft">
                    <Check className="mt-px size-3.5 shrink-0 text-ajukan" aria-hidden />
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-5">
                <span
                  className={`whitespace-nowrap rounded-md px-2 py-0.5 text-[11px] font-semibold ${
                    p.perluRegistrasi ? "bg-chip-sektor text-chip-sektor-fg" : "bg-chip-tek text-chip-tek-fg"
                  }`}
                >
                  {p.perluRegistrasi ? "Registrasi (Log in)" : "Tanpa Registrasi"}
                </span>
                <Link href={p.cta.href} className="inline-flex items-center gap-1 whitespace-nowrap text-sm font-semibold text-accent hover:underline">
                  {p.cta.label}
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
