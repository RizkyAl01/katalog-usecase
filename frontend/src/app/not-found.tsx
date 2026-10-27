import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <p className="text-sm font-semibold text-primary">404</p>
      <h1 className="mt-2 text-2xl font-bold text-navy">Halaman tidak ditemukan</h1>
      <p className="mt-3 text-sm text-muted">Halaman yang Anda cari tidak tersedia atau telah dipindahkan.</p>
      <Link href="/" className="mt-6 inline-block rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-hover">
        Kembali ke Beranda
      </Link>
    </div>
  );
}
