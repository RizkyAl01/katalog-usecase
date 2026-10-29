import { CheckCircle2, CircleCheckBig, Clock3, FilePenLine, FileText, FlaskConical, ChartColumnIncreasing, BadgeCheck } from "lucide-react";
import type { AkunDemo } from "@/lib/auth/akun-demo";
import { getDashboardInovator, getDashboardPengguna, getDashboardPenyedia, getDashboardReviewer } from "@/lib/konsol/data";
import type { Prioritas, StatusEvaluasi, StatusKebutuhan, StatusReview, StatusSandbox } from "@/data/konsol";
import { Badge, BarisMetrik, formatTanggal, HeaderKonsol, TabelKonsol, type NadaBadge } from "@/components/konsol/Dasbor";

interface Props {
  akun: AkunDemo;
  q: string;
  basePath: string;
}

const NADA_SANDBOX: Record<StatusSandbox, NadaBadge> = {
  Completed: "hijau",
  "Under Review": "oranye",
  "Active Sandbox Testing": "biru",
  "Not Required": "abu",
};
const NADA_EVALUASI: Record<StatusEvaluasi, NadaBadge> = {
  Draft: "abu",
  "Dalam Proses Kurasi": "oranye",
  "Perlu Revisi": "merah",
  Disetujui: "hijau",
};
const NADA_KEBUTUHAN: Record<StatusKebutuhan, NadaBadge> = {
  Draft: "abu",
  "Dalam Pencarian Vendor": "oranye",
  "Pilot Test": "biru",
  Operasional: "hijau",
};
const NADA_REVIEW: Record<StatusReview, NadaBadge> = {
  Baru: "biru",
  "Dalam Kurasi": "oranye",
  "Perlu Revisi": "merah",
  "Selesai Dikurasi": "hijau",
};
const NADA_PRIORITAS: Record<Prioritas, NadaBadge> = { Rendah: "biru", Sedang: "oranye", Tinggi: "merah" };

export function DashboardPenyedia({ akun, q, basePath }: Props) {
  const { metrik, distribusiTahap, daftar } = getDashboardPenyedia(q);
  return (
    <>
      <HeaderKonsol
        nama={akun.nama}
        deskripsi="Kelola use case AI organisasi Anda, lakukan self-assessment, dan pantau status pengajuan secara real-time."
        cta={{ label: "Ajukan Use-Case baru", href: `${basePath}/ajukan` }}
      />
      <div className="space-y-5 p-4 sm:p-6 lg:p-7">
        <BarisMetrik
          metrik={[
            { label: "Total Use Case", nilai: metrik.total, ikon: FileText, nada: "biru", href: `${basePath}/use-case` },
            { label: "Draft Use Case", nilai: metrik.draft, ikon: FileText, nada: "biru", href: `${basePath}/use-case` },
            { label: "Dalam Proses Kurasi", nilai: metrik.kurasi, ikon: Clock3, nada: "oranye", href: `${basePath}/use-case` },
            { label: "Perlu Perbaikan", nilai: metrik.revisi, ikon: FilePenLine, nada: "merah", href: `${basePath}/riwayat-kurator` },
            { label: "Disetujui", nilai: metrik.disetujui, ikon: BadgeCheck, nada: "hijau", href: `${basePath}/use-case` },
          ]}
        />
        <p className="flex flex-wrap items-center gap-2 text-xs text-navy-soft">
          <span className="font-semibold text-navy">Distribusi tahap kesiapan (TRL):</span>
          {distribusiTahap.map((d) => (
            <span key={d.tahap} className="rounded-md bg-white px-2.5 py-1 ring-1 ring-line">
              {d.tahap} <strong className="text-navy">{d.jumlah}</strong>
            </span>
          ))}
        </p>
        <TabelKonsol
          judul="Daftar Use Case Saya"
          deskripsi="Berikut adalah daftar use case AI yang diajukan oleh organisasi Anda."
          q={q}
          action={basePath}
          baris={daftar}
          kolom={[
            {
              judul: "Nama Use Case",
              isi: (u) => (
                <>
                  <p className="font-semibold">{u.nama}</p>
                  <p className="text-xs text-navy-soft">{u.deskripsi}</p>
                </>
              ),
            },
            { judul: "Status Pengembangan", isi: (u) => u.tahap },
            { judul: "Tanggal Pengajuan", isi: (u) => formatTanggal(u.tanggal), kelas: "whitespace-nowrap" },
            { judul: "Status Evaluasi", isi: (u) => <Badge nada={NADA_EVALUASI[u.evaluasi]}>{u.evaluasi}</Badge> },
            { judul: "Status Regulatory Sandbox", isi: (u) => <Badge nada={NADA_SANDBOX[u.sandbox]}>{u.sandbox}</Badge> },
          ]}
          aksi={(u) => ({ label: "Lihat Detail", href: `${basePath}/detail/${u.id}` })}
        />
      </div>
    </>
  );
}

export function DashboardPengguna({ akun, q, basePath }: Props) {
  const { metrik, daftar } = getDashboardPengguna(q);
  return (
    <>
      <HeaderKonsol
        nama={akun.nama}
        deskripsi="Kelola kebutuhan use case AI di instansi Anda, lakukan self-assessment, dan pantau status pengajuan secara real-time."
        cta={{ label: "Daftarkan Kebutuhan / Use Case Baru", href: `${basePath}/ajukan` }}
      />
      <div className="space-y-5 p-4 sm:p-6 lg:p-7">
        <BarisMetrik
          judul="Ringkasan Metrik & Performance"
          deskripsi="Gambaran umum jumlah kebutuhan, implementasi, pengujian, serta estimasi dampak dari inisiatif AI di instansi Anda."
          metrik={[
            { label: "Total Kebutuhan / Use Case Diajukan", nilai: metrik.total, ikon: FileText, nada: "biru", href: `${basePath}/kebutuhan` },
            { label: "Solusi Terimplementasi (Operasional)", nilai: metrik.terimplementasi, ikon: CircleCheckBig, nada: "hijau", href: `${basePath}/kebutuhan` },
            { label: "Dalam Pengujian / Pilot Project (PoC/MVP)", nilai: metrik.pengujian, ikon: FlaskConical, nada: "oranye", href: `${basePath}/kebutuhan` },
            {
              label: "Proyeksi Dampak & Efisiensi",
              nilai: metrik.proyeksiDampak === null ? "–" : `${metrik.proyeksiDampak}%`,
              keterangan: "Rata-rata efisiensi solusi operasional",
              ikon: ChartColumnIncreasing,
              nada: "ungu",
              href: `${basePath}/kebutuhan`,
            },
          ]}
        />
        <TabelKonsol
          judul="Permintaan Use Case Saya"
          deskripsi="Daftar permintaan use case yang telah diajukan oleh instansi Anda."
          q={q}
          action={basePath}
          baris={daftar}
          kolom={[
            { judul: "Nama Use Case", isi: (k) => <span className="font-semibold">{k.nama}</span> },
            { judul: "Sektor", isi: (k) => k.sektor },
            { judul: "Kategori AI", isi: (k) => k.kategoriAI },
            { judul: "Tanggal Pengajuan", isi: (k) => formatTanggal(k.tanggal), kelas: "whitespace-nowrap" },
            {
              judul: "Status",
              isi: (k) => <Badge nada={NADA_KEBUTUHAN[k.status]}>{k.tahapPilot ? `${k.status} (${k.tahapPilot})` : k.status}</Badge>,
            },
          ]}
          aksi={(k) => ({ label: "Lihat Detail", href: `${basePath}/detail/${k.id}` })}
        />
      </div>
    </>
  );
}

export function DashboardInovator({ akun, q, basePath }: Props) {
  const { metrik, daftar } = getDashboardInovator(q);
  return (
    <>
      <HeaderKonsol
        nama={akun.nama}
        deskripsi="Kelola proyek riset, prototype, atau use case AI Anda, lakukan self-assessment, dan pantau status pengajuan secara real-time."
        cta={{ label: "Ajukan Riset / Prototype / Use Case Baru", href: `${basePath}/ajukan` }}
      />
      <div className="space-y-5 p-4 sm:p-6 lg:p-7">
        <BarisMetrik
          metrik={[
            {
              label: "Total Proyek Riset / Inovasi Diajukan",
              nilai: metrik.total,
              keterangan: "Jumlah seluruh proyek riset, prototype, atau use case yang didaftarkan oleh institusi/startup.",
              ikon: FileText,
              nada: "biru",
            },
            {
              label: "Insentif & Fasilitas R&D",
              nilai: metrik.insentif,
              keterangan: "Proyek yang mendapat akses fasilitas pendukung seperti Compute GPU Cloud, hibah riset, atau program inkubasi.",
              ikon: FlaskConical,
              nada: "oranye",
            },
          ]}
        />
        <TabelKonsol
          judul="Daftar Riset / Prototype Saya"
          deskripsi="Daftar proyek yang pernah Anda daftarkan beserta status evaluasinya."
          q={q}
          action={basePath}
          baris={daftar}
          kolom={[
            { judul: "Nama Use Case", isi: (r) => <span className="font-semibold">{r.nama}</span>, kelas: "max-w-xs" },
            { judul: "Kategori AI", isi: (r) => r.kategoriAI },
            { judul: "Tanggal Pengajuan", isi: (r) => formatTanggal(r.tanggal), kelas: "whitespace-nowrap" },
            { judul: "Status Kurasi", isi: (r) => <Badge nada={NADA_EVALUASI[r.kurasi]}>{r.kurasi}</Badge> },
            { judul: "Insentif", isi: (r) => r.insentif ?? <span className="text-muted">–</span> },
          ]}
          aksi={(r) => ({ label: "Lihat Detail", href: `${basePath}/detail/${r.id}` })}
        />
      </div>
    </>
  );
}

export function DashboardReviewer({ akun, q, basePath }: Props) {
  const { metrik, daftar } = getDashboardReviewer(q);
  return (
    <>
      <HeaderKonsol
        nama={akun.nama}
        subjudul={`${akun.jabatan} — ${akun.entitas}`}
        deskripsi="Kelola pengajuan use case yang memerlukan verifikasi dan keputusan."
      />
      <div className="space-y-5 p-4 sm:p-6 lg:p-7">
        <BarisMetrik
          metrik={[
            { label: "Pengajuan Baru", nilai: metrik.baru, keterangan: "Menunggu pemeriksaan awal", ikon: FileText, nada: "biru" },
            { label: "Dalam Proses Kurasi", nilai: metrik.kurasi, ikon: Clock3, nada: "oranye" },
            { label: "Perlu Revisi", nilai: metrik.revisi, keterangan: "Dikembalikan ke pengusul", ikon: FilePenLine, nada: "merah" },
            { label: "Selesai Dikurasi", nilai: metrik.selesai, keterangan: "Diteruskan ke Katalog Nasional", ikon: CheckCircle2, nada: "hijau" },
          ]}
        />
        <TabelKonsol
          judul="Daftar Pengajuan Use Case"
          deskripsi="Daftar pengajuan yang memerlukan verifikasi dan keputusan."
          q={q}
          action={basePath}
          baris={daftar}
          kolom={[
            { judul: "Nama Use Case", isi: (p) => <span className="font-semibold">{p.nama}</span>, kelas: "max-w-xs" },
            { judul: "Pengaju", isi: (p) => p.pengaju },
            { judul: "Tanggal Pengajuan", isi: (p) => formatTanggal(p.tanggal), kelas: "whitespace-nowrap" },
            { judul: "Status Review", isi: (p) => <Badge nada={NADA_REVIEW[p.status]}>{p.status}</Badge> },
            { judul: "Prioritas", isi: (p) => <Badge nada={NADA_PRIORITAS[p.prioritas]}>{p.prioritas}</Badge> },
          ]}
          aksi={(p) => ({ label: "Tinjau", href: `${basePath}/tinjau/${p.id}` })}
        />
      </div>
    </>
  );
}
