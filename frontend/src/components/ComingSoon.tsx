import Link from "next/link";
import { ArrowLeft, Construction } from "lucide-react";

interface Props {
  judul: string;
  deskripsi: string;
  children?: React.ReactNode;
}

/** Halaman sementara untuk fitur yang belum dikembangkan (tahap ini baru Beranda). */
export default function ComingSoon({ judul, deskripsi, children }: Props) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <div className="rounded-3xl border border-line bg-white p-8 text-center shadow-sm sm:p-12">
        <span className="mx-auto inline-flex size-14 items-center justify-center rounded-2xl bg-soft text-primary">
          <Construction className="size-7" aria-hidden />
        </span>
        <h1 className="mt-5 text-2xl font-bold text-navy sm:text-3xl">{judul}</h1>
        <p className="mt-3 text-sm leading-relaxed text-muted">{deskripsi}</p>
        <p className="mt-4 inline-block rounded-md bg-chip-status px-3 py-1 text-xs font-semibold text-chip-status-fg">
          Halaman sedang dikembangkan
        </p>
        {children}
        <div className="mt-8">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline">
            <ArrowLeft className="size-4" aria-hidden />
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
}
