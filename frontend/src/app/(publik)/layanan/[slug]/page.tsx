import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ComingSoon from "@/components/ComingSoon";

const LAYANAN: Record<string, { judul: string; deskripsi: string }> = {
  "ai-assessment-toolkit": {
    judul: "AI Assessment Toolkit",
    deskripsi: "Platform pengujian kelayakan model secara otomatis (self-assessment kelayakan adopsi), bersifat sukarela.",
  },
  "monitoring-terpadu-etika-ka": {
    judul: "Monitoring Terpadu Etika KA",
    deskripsi:
      "Sistem monitoring terpadu: K/L menyampaikan pelaporan monitoring risiko (penilaian mandiri & pelaporan insiden) secara real-time ke dashboard.",
  },
  "website-aikita": {
    judul: "Website AIKITA",
    deskripsi: "Tautan ke website AIKITA akan ditambahkan setelah alamat resminya dikonfirmasi.",
  },
  "regulatory-sandbox": {
    judul: "Regulatory Sandbox",
    deskripsi: "Pengajuan dan verifikasi pelaksanaan sandbox untuk use case yang memerlukan pengujian regulasi.",
  },
  "pedoman-etika-ai": {
    judul: "Pedoman Etika AI",
    deskripsi: "Pedoman etika pemanfaatan Kecerdasan Artifisial di Indonesia.",
  },
};

export function generateStaticParams() {
  return Object.keys(LAYANAN).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return { title: LAYANAN[slug]?.judul };
}

export default async function HalamanLayanan({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const layanan = LAYANAN[slug];
  if (!layanan) notFound();
  return <ComingSoon judul={layanan.judul} deskripsi={layanan.deskripsi} />;
}
