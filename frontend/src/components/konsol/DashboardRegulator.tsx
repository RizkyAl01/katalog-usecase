import Link from "next/link";
import { Ban, CircleCheckBig, Clock3, FileText, FlaskConical, Inbox, UserRoundCheck } from "lucide-react";
import type { AkunDemo } from "@/lib/auth/akun-demo";
import { getDashboardRegulator } from "@/lib/konsol/data";
import { BarisMetrik, formatTanggal, HeaderKonsol } from "@/components/konsol/Dasbor";

const IKON_STATUS = { Diajukan: Inbox, Verifikasi: Clock3, Sandbox: FlaskConical, Publikasi: CircleCheckBig, Ditolak: Ban };
const NADA_STATUS = { Diajukan: "biru", Verifikasi: "oranye", Sandbox: "ungu", Publikasi: "hijau", Ditolak: "merah" } as const;

/**
 * Konsol Admin Komdigi — "Ringkasan & monitoring". Mockup hanya memuat sidebar (hal. 6),
 * isi diturunkan dari fungsi Regulator (National AI Dashboard) dan alur approval akun K/L (slide 25).
 */
export function DashboardRegulator({ akun, basePath }: { akun: AkunDemo; basePath: string }) {
  const data = getDashboardRegulator();

  return (
    <>
      <HeaderKonsol
        nama={akun.nama}
        subjudul={akun.jabatan}
        deskripsi="Pantau sebaran dan status evaluasi use case AI nasional, serta kelola persetujuan akun Kementerian/Lembaga."
      />
      <div className="space-y-5 p-4 sm:p-6 lg:p-7">
        <BarisMetrik
          judul="Status alur use case nasional"
          deskripsi={`Seluruh ${data.total} pengajuan (use case, kebutuhan, dan riset) berdasarkan tahap pada alur sistem.`}
          metrik={data.perStatus.map((s) => ({
            label: s.label,
            nilai: s.jumlah,
            ikon: IKON_STATUS[s.label],
            nada: NADA_STATUS[s.label],
          }))}
        />

        {/* minmax(0,…): item grid tidak boleh melebar mengikuti min-width tabel di dalamnya */}
        <div className="grid grid-cols-[minmax(0,1fr)] gap-5 xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-line sm:p-6">
            <h2 className="text-lg font-bold text-navy">Sebaran per sektor</h2>
            <p className="text-sm text-navy-soft">Jumlah pengajuan per sektor dan jenis katalog, serta yang berisiko tinggi.</p>
            <div className="relative mt-4 overflow-x-auto">
              <table className="w-full min-w-[520px] text-left text-sm">
                <thead>
                  <tr className="bg-page text-navy">
                    <th scope="col" className="rounded-l-lg px-4 py-2.5 font-semibold">Sektor</th>
                    <th scope="col" className="px-4 py-2.5 text-right font-semibold">Use Case</th>
                    <th scope="col" className="px-4 py-2.5 text-right font-semibold">Kebutuhan</th>
                    <th scope="col" className="px-4 py-2.5 text-right font-semibold">Riset</th>
                    <th scope="col" className="rounded-r-lg px-4 py-2.5 text-right font-semibold">Risiko Tinggi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line text-navy">
                  {data.perSektor.map((s) => (
                    <tr key={s.sektor}>
                      <td className="px-4 py-2.5 font-medium">{s.sektor}</td>
                      <td className="px-4 py-2.5 text-right tabular-nums">{s.useCase}</td>
                      <td className="px-4 py-2.5 text-right tabular-nums">{s.kebutuhan}</td>
                      <td className="px-4 py-2.5 text-right tabular-nums">{s.riset}</td>
                      <td className="px-4 py-2.5 text-right tabular-nums">{s.risikoTinggi}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-line sm:p-6">
            <h2 className="text-lg font-bold text-navy">Kategori risiko</h2>
            <p className="text-sm text-navy-soft">Penentuan risiko oleh pengusul pada tahap pengajuan.</p>
            <ul className="mt-4 divide-y divide-line">
              {data.perRisiko.map((r) => (
                <li key={r.label} className="flex items-center justify-between py-3 text-sm">
                  <span className="font-medium text-navy">{r.label}</span>
                  <span className="text-lg font-bold tabular-nums text-navy">{r.jumlah}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-line sm:p-6">
          <div className="flex items-center gap-3">
            <span className="inline-flex size-10 items-center justify-center rounded-xl bg-chip-status text-chip-status-fg">
              <UserRoundCheck className="size-5" aria-hidden />
            </span>
            <div>
              <h2 className="text-lg font-bold text-navy">Akun K/L menunggu persetujuan</h2>
              <p className="text-sm text-navy-soft">Status &quot;Pending Approval Admin Nasional&quot;: validasi surat tugas dan domain email instansi.</p>
            </div>
          </div>
          <div className="relative mt-4 overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead>
                <tr className="bg-page text-navy">
                  <th scope="col" className="rounded-l-lg px-4 py-2.5 font-semibold">Nama PIC</th>
                  <th scope="col" className="px-4 py-2.5 font-semibold">Instansi / Unit Kerja</th>
                  <th scope="col" className="px-4 py-2.5 font-semibold">No. Surat Tugas</th>
                  <th scope="col" className="px-4 py-2.5 font-semibold">Tanggal Daftar</th>
                  <th scope="col" className="rounded-r-lg px-4 py-2.5">
                    <span className="sr-only">Aksi</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line text-navy">
                {data.akunKLMenunggu.map((a) => (
                  <tr key={a.id}>
                    <td className="px-4 py-3 font-semibold">{a.nama}</td>
                    <td className="px-4 py-3">
                      {a.instansi}
                      <span className="block text-xs text-navy-soft">{a.unitKerja}</span>
                    </td>
                    <td className="px-4 py-3 font-mono text-xs">{a.nomorSuratTugas}</td>
                    <td className="whitespace-nowrap px-4 py-3">{formatTanggal(a.tanggal)}</td>
                    <td className="px-4 py-3 text-right">
                      <Link
                        href={`${basePath}/persetujuan-akun/${a.id}`}
                        className="inline-block rounded-md border border-primary px-4 py-1.5 text-xs font-semibold text-primary hover:bg-primary hover:text-white"
                      >
                        Tinjau
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </>
  );
}

export function DashboardInvestor({ akun, basePath }: { akun: AkunDemo; basePath: string }) {
  return (
    <>
      <HeaderKonsol
        nama={akun.nama}
        subjudul={`${akun.jabatan} — ${akun.entitas}`}
        deskripsi="Akses direktori use case inovator terpilih beserta informasi performa, riset, dan profil risikonya."
      />
      <div className="p-4 sm:p-6 lg:p-7">
        <section className="rounded-2xl bg-white p-8 text-center shadow-sm ring-1 ring-line">
          <span className="mx-auto inline-flex size-12 items-center justify-center rounded-xl bg-soft text-primary">
            <FileText className="size-6" aria-hidden />
          </span>
          <h2 className="mt-4 text-lg font-bold text-navy">Dashboard Investor sedang disiapkan</h2>
          <p className="mx-auto mt-2 max-w-lg text-sm text-muted">
            Mockup dashboard Investor belum tersedia. Fitur yang direncanakan: Katalog Use Case (Inovator) terpilih dan Laporan Insiden
            Operasional.
          </p>
          <Link href={`${basePath}/katalog-terpilih`} className="mt-5 inline-block text-sm font-semibold text-accent hover:underline">
            Lihat menu Katalog Use Case (Inovator) Terpilih →
          </Link>
        </section>
      </div>
    </>
  );
}
