import type { Metadata } from "next";
import Link from "next/link";
import FormRegistrasiKL from "@/components/auth/FormRegistrasiKL";
import FormRegistrasiUmum from "@/components/auth/FormRegistrasiUmum";
import { isJenisEntitas } from "@/lib/registrasi/validasi";

export const metadata: Metadata = { title: "Daftar Akun" };

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const PANEL = {
  umum: {
    label: "REGISTRASI AKUN",
    judul: "Bergabung bersama Ekosistem AI Nasional",
    deskripsi: "Daftarkan akun Anda untuk mengakses layanan pengelolaan dan pemanfaatan use case AI dalam satu platform.",
    poin: [
      { judul: "Penyedia Use Case", teks: "Daftarkan dan kelola use case AI serta pantau perkembangannya." },
      { judul: "Pengguna Use Case", teks: "Temukan solusi AI yang sesuai dengan kebutuhan organisasi." },
      { judul: "Inovator Use Case", teks: "Kembangkan dan tawarkan inovasi AI dari akademisi, peneliti, maupun startup." },
      { judul: "Investor", teks: "Akses direktori inovasi AI terkurasi untuk keputusan pendanaan." },
    ],
    penutup: "Satu akun untuk mengakses layanan sesuai peran dan hak akses masing-masing.",
  },
  kl: {
    label: "REGISTRASI AKUN K/L",
    judul: "Bergabung dalam Tata Kelola AI Nasional",
    deskripsi:
      "Daftarkan akun Kementerian/Lembaga untuk mendukung pengelolaan, evaluasi, dan pemantauan use case AI sesuai kewenangan sektor masing-masing.",
    poin: [
      { judul: "Evaluasi Use Case AI", teks: "Melakukan pemeriksaan dan evaluasi use case AI sesuai sektor kewenangan." },
      { judul: "Verifikasi Sektoral", teks: "Meninjau kelengkapan informasi dan hasil self-assessment dari pemilik use case." },
      { judul: "Monitoring Use Case AI", teks: "Memantau perkembangan dan status evaluasi use case AI pada sektor terkait." },
    ],
    penutup: "Satu akun K/L untuk menjalankan fungsi evaluasi dan pemantauan sesuai hak akses serta kewenangan yang diberikan.",
  },
};

export default async function HalamanDaftar({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const ambil = (k: string) => (Array.isArray(params[k]) ? params[k][0] : params[k]);
  const isKL = ambil("jenis") === "kl";
  const peran = ambil("peran");
  const panel = isKL ? PANEL.kl : PANEL.umum;

  return (
    <div className="grid lg:grid-cols-[minmax(0,540px)_1fr]">
      <aside className="bg-sidebar px-6 py-10 text-white sm:px-10 lg:min-h-[calc(100vh-72px)] lg:py-16">
        <div className="lg:sticky lg:top-28">
          <p className="text-lg font-medium tracking-[0.2em] text-sun">{panel.label}</p>
          <h1 className="mt-5 text-3xl font-semibold leading-tight sm:text-4xl lg:text-[44px]">{panel.judul}</h1>
          <p className="mt-4 text-base leading-relaxed text-white/85 sm:text-lg">{panel.deskripsi}</p>
          <ul className="mt-8 space-y-5 sm:pl-6 lg:pl-16">
            {panel.poin.map((p) => (
              <li key={p.judul}>
                <p className="text-lg font-semibold">{p.judul}</p>
                <p className="text-sm text-white/80">{p.teks}</p>
              </li>
            ))}
          </ul>
          <p className="mt-10 text-sm font-medium text-white/85">{panel.penutup}</p>
          <p className="mt-6 text-sm text-white/75">
            {isKL ? (
              <>
                Bukan instansi pemerintah?{" "}
                <Link href="/daftar" className="font-semibold text-sun hover:underline">
                  Registrasi akun umum
                </Link>
              </>
            ) : (
              <>
                Mendaftar sebagai Kementerian/Lembaga?{" "}
                <Link href="/daftar?jenis=kl" className="font-semibold text-sun hover:underline">
                  Registrasi akun K/L
                </Link>
              </>
            )}
          </p>
        </div>
      </aside>

      <div className="px-4 py-8 sm:px-6 lg:px-10 lg:py-10">
        <div className="mx-auto max-w-4xl">
          {isKL ? <FormRegistrasiKL /> : <FormRegistrasiUmum jenisAwal={isJenisEntitas(peran) ? peran : "penyedia"} />}
          <p className="mt-6 text-center text-sm text-navy">
            Sudah punya akun?{" "}
            <Link href="/masuk" className="font-medium text-accent hover:underline">
              Masuk di sini
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
