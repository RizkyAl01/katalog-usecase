"use client";

import { useActionState, useState } from "react";
import { Loader2 } from "lucide-react";
import { daftarKL, type StateDaftar } from "@/lib/registrasi/actions";
import { KATEGORI_INSTANSI, validasiKL, type Galat } from "@/lib/registrasi/validasi";
import { bacaFormKlien, Field, fokusGalat, Kartu, Persetujuan, Pilihan, SuksesRegistrasi, UnggahDokumen } from "@/components/auth/FormBagian";

const PERSETUJUAN = [
  {
    name: "setujuDokumen",
    teks: "Saya menyatakan bahwa data dan dokumen surat tugas yang diunggah adalah sah, benar, dan dapat dipertanggungjawabkan secara hukum.",
  },
  {
    name: "setujuIntegritas",
    teks: "Saya bersedia menjaga kerahasiaan data, bertindak objektif dalam proses kurasi/verifikasi use case, dan mematuhi etika tata kelola AI nasional.",
  },
];

const LANGKAH = [
  "Pendaftaran diterima & tautan verifikasi dikirim ke email kedinasan PIC.",
  "PIC mengklik tautan untuk aktivasi awal email.",
  "Status akun: Pending Approval Admin Nasional — Superadmin Pokja memvalidasi surat tugas dan domain email instansi.",
  "Setelah disetujui, PIC menerima notifikasi bahwa akun Verifikator K/L aktif dan dapat masuk ke Dashboard Verifikator.",
];

export default function FormRegistrasiKL() {
  const [state, formAction, pending] = useActionState<StateDaftar, FormData>(daftarKL, { status: "awal" });
  const [galatKlien, setGalatKlien] = useState<Galat | null>(null);

  if (state.status === "sukses") return <SuksesRegistrasi email={state.email} entitas={state.entitas} langkah={LANGKAH} />;

  const nilai = state.status === "galat" ? state.nilai : undefined;
  const galat = galatKlien ?? (state.status === "galat" ? state.galat : {});

  return (
    <form
      action={formAction}
      noValidate
      className="space-y-6"
      onSubmit={(e) => {
        const { nilai: n, berkas } = bacaFormKlien(e.currentTarget);
        const hasil = validasiKL(n, berkas);
        if (Object.keys(hasil).length > 0) {
          e.preventDefault();
          setGalatKlien(hasil);
          fokusGalat(e.currentTarget, hasil);
        } else {
          setGalatKlien(null);
        }
      }}
    >
      <Kartu judul="Identitas entitas">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field name="namaEntitas" label="Nama entitas K/L" placeholder="contoh: Kementerian Kesehatan RI" defaultValue={nilai?.namaEntitas} galat={galat.namaEntitas} />
          <Pilihan
            name="kategoriInstansi"
            label="Kategori instansi"
            placeholder="Pilih kategori instansi"
            defaultValue={nilai?.kategoriInstansi ?? ""}
            pilihan={KATEGORI_INSTANSI.map((k) => ({ value: k, label: k }))}
            galat={galat.kategoriInstansi}
          />
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-[3fr_2fr]">
          <Field name="alamat" label="Alamat kantor resmi" defaultValue={nilai?.alamat} galat={galat.alamat} />
          <Field name="unitKerja" label="Unit kerja / Direktorat" placeholder="contoh: Dit. KAETB" defaultValue={nilai?.unitKerja} galat={galat.unitKerja} />
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Field name="emailKantor" label="Email kantor / Resmi instansi" type="email" placeholder="kontak@instansi.go.id" defaultValue={nilai?.emailKantor} galat={galat.emailKantor} />
          <Field name="teleponKantor" label="Nomor telepon kantor" type="tel" defaultValue={nilai?.teleponKantor} galat={galat.teleponKantor} />
        </div>
      </Kartu>

      <Kartu judul="Identitas penanggung jawab">
        <Field name="namaPic" label="Nama lengkap" autoComplete="name" className="sm:max-w-[66%]" defaultValue={nilai?.namaPic} galat={galat.namaPic} />
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Field name="jabatan" label="Jabatan" placeholder="contoh: Pranata Komputer Ahli Muda" defaultValue={nilai?.jabatan} galat={galat.jabatan} />
          <Field name="nip" label="Nomor Induk Pegawai (NIP)" inputMode="numeric" maxLength={21} defaultValue={nilai?.nip} galat={galat.nip} />
          <Field name="emailPic" label="Email kedinasan" type="email" placeholder="nama.pic@instansi.go.id" autoComplete="email" defaultValue={nilai?.emailPic} galat={galat.emailPic} />
          <Field name="teleponPic" label="Nomor telepon / WhatsApp" type="tel" autoComplete="tel" defaultValue={nilai?.teleponPic} galat={galat.teleponPic} />
          <Field name="kataSandi" label="Kata sandi" type="password" autoComplete="new-password" galat={galat.kataSandi} />
          <Field name="konfirmasi" label="Konfirmasi kata sandi" type="password" autoComplete="new-password" galat={galat.konfirmasi} />
        </div>
        <p className="mt-2 text-xs text-muted">Minimal 8 karakter, kombinasi huruf, angka, dan simbol.</p>

        <div className="mt-8">
          <h3 className="text-base font-semibold text-navy">Dokumen Pendukung &amp; Legitimasi Entitas</h3>
          <div className="mt-4 grid gap-6 lg:grid-cols-2">
            <div className="space-y-4">
              <Field name="nomorSuratTugas" label="Nomor surat tugas" defaultValue={nilai?.nomorSuratTugas} galat={galat.nomorSuratTugas} />
              <Field name="pemberiTugas" label="Pemberi penugasan" placeholder="Jabatan pimpinan penanda tangan" defaultValue={nilai?.pemberiTugas} galat={galat.pemberiTugas} />
            </div>
            <UnggahDokumen
              keterangan="Unggah scan Surat Tugas/Surat Penunjukan resmi berstempel dinas/TTE (Format: .pdf, maks. 5 MB)."
              accept=".pdf,application/pdf"
              galat={galat.dokumen}
            />
          </div>
        </div>

        <div className="mt-8">
          <Persetujuan daftar={PERSETUJUAN} galat={galat} nilai={nilai} />
        </div>

        <div className="mt-8 flex justify-end">
          <button
            type="submit"
            disabled={pending}
            className="inline-flex min-w-56 items-center justify-center gap-2 rounded-lg bg-primary px-8 py-3 text-sm font-semibold text-white hover:bg-primary-hover disabled:opacity-70"
          >
            {pending && <Loader2 className="size-4 animate-spin" aria-hidden />}
            {pending ? "Mengirim…" : "Daftar Akun K/L"}
          </button>
        </div>
      </Kartu>
    </form>
  );
}
