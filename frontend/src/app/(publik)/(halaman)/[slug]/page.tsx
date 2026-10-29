import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ComingSoon from "@/components/ComingSoon";

const HALAMAN: Record<string, { judul: string; deskripsi: string }> = {
  ajukan: {
    judul: "Ajukan Use-Case",
    deskripsi:
      "Pengajuan use case AI beserta penentuan kategori risiko, verifikasi, dan (bila diperlukan) regulatory sandbox sebelum dipublikasikan.",
  },
  masuk: {
    judul: "Masuk",
    deskripsi: "Masuk ke akun Anda sebagai Penyedia, Pengguna, Inovator, Investor, Reviewer, atau Regulator.",
  },
  daftar: {
    judul: "Daftar Akun",
    deskripsi:
      "Registrasi akun untuk Penyedia, Pengguna, Inovator Use Case, dan Investor, serta registrasi akun K/L untuk Regulator dan Reviewer.",
  },
  tentang: { judul: "Tentang Kami", deskripsi: "Informasi mengenai AI Sandbox Nasional dan Direktorat Jenderal Ekosistem Digital." },
  "kebijakan-privasi": { judul: "Kebijakan Privasi", deskripsi: "Kebijakan pengelolaan dan perlindungan data pribadi pengguna platform." },
  "syarat-ketentuan": { judul: "Syarat dan Ketentuan", deskripsi: "Syarat dan ketentuan penggunaan platform." },
  "peta-situs": { judul: "Peta Situs", deskripsi: "Daftar seluruh halaman pada platform." },
  kontak: { judul: "Kontak", deskripsi: "Alamat kantor, email bantuan/helpdesk, dan pusat layanan." },
};

export function generateStaticParams() {
  return Object.keys(HALAMAN).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return { title: HALAMAN[slug]?.judul };
}

export default async function HalamanSementara({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const halaman = HALAMAN[slug];
  if (!halaman) notFound();
  return <ComingSoon judul={halaman.judul} deskripsi={halaman.deskripsi} />;
}
