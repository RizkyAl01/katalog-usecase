"use client";

import { useActionState, useState } from "react";
import { Loader2 } from "lucide-react";
import { daftarUmum, type StateDaftar } from "@/lib/registrasi/actions";
import {
  infoDokumen,
  infoNomorInduk,
  isJenisEntitas,
  JENIS_ENTITAS,
  validasiUmum,
  type Galat,
  type JenisEntitas,
} from "@/lib/registrasi/validasi";
import { bacaFormKlien, Field, fokusGalat, Kartu, Persetujuan, Pilihan, SuksesRegistrasi, UnggahDokumen } from "@/components/auth/FormBagian";

const PERSETUJUAN = [
  { name: "setujuData", teks: "Saya menyatakan bahwa seluruh informasi dan dokumen yang didaftarkan adalah benar, sah, dan mewakili entitas resmi." },
  { name: "setujuKetentuan", teks: "Saya menyetujui Syarat, Ketentuan Layanan, serta Kebijakan Privasi Platform AI Sandbox Nasional." },
  {
    name: "setujuEtika",
    teks: "Saya bersedia mematuhi prinsip etika AI nasional, perlindungan data pribadi, dan tidak mengunggah konten/model AI yang berisiko merugikan masyarakat.",
  },
];

const LANGKAH = [
  "Pendaftaran diterima & tautan aktivasi dikirim ke email operasional PIC.",
  "PIC mengklik tautan aktivasi untuk memverifikasi email.",
  "Sistem memvalidasi kecocokan domain email dan dokumen legitimasi.",
  "Akun aktif — PIC dapat masuk ke dashboard sesuai peran.",
];

export default function FormRegistrasiUmum({ jenisAwal }: { jenisAwal: JenisEntitas }) {
  const [state, formAction, pending] = useActionState<StateDaftar, FormData>(daftarUmum, { status: "awal" });
  const [galatKlien, setGalatKlien] = useState<Galat | null>(null);
  const nilai = state.status === "galat" ? state.nilai : undefined;
  const [jenis, setJenis] = useState<JenisEntitas>(isJenisEntitas(nilai?.jenisEntitas) ? nilai.jenisEntitas : jenisAwal);

  if (state.status === "sukses") return <SuksesRegistrasi email={state.email} entitas={state.entitas} langkah={LANGKAH} />;

  const galat = galatKlien ?? (state.status === "galat" ? state.galat : {});
  const nomorInduk = infoNomorInduk(jenis);

  return (
    <form
      action={formAction}
      noValidate
      className="space-y-6"
      onSubmit={(e) => {
        const { nilai: n, berkas } = bacaFormKlien(e.currentTarget);
        const hasil = validasiUmum(n, berkas);
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
          <Field name="namaEntitas" label="Nama entitas" placeholder="contoh: PT AI Nusantara" defaultValue={nilai?.namaEntitas} galat={galat.namaEntitas} />
          <Pilihan
            name="jenisEntitas"
            label="Jenis entitas"
            value={jenis}
            onChange={(e) => isJenisEntitas(e.target.value) && setJenis(e.target.value)}
            pilihan={JENIS_ENTITAS.map((j) => ({ value: j.id, label: j.label }))}
            galat={galat.jenisEntitas}
          />
          <Field name="alamat" label="Alamat entitas" className="sm:col-span-2" defaultValue={nilai?.alamat} galat={galat.alamat} />
          <Field
            name="nomorInduk"
            label={nomorInduk.label}
            inputMode={nomorInduk.wajib13Digit ? "numeric" : undefined}
            defaultValue={nilai?.nomorInduk}
            galat={galat.nomorInduk}
          />
          <Field name="emailKantor" label="Email kantor" type="email" placeholder="corporate@perusahaan.com" defaultValue={nilai?.emailKantor} galat={galat.emailKantor} />
          <Field name="teleponKantor" label="Nomor telepon kantor" type="tel" defaultValue={nilai?.teleponKantor} galat={galat.teleponKantor} />
          <Field name="situsWeb" label="Situs Web Entitas (Opsional)" placeholder="www.perusahaan.com" defaultValue={nilai?.situsWeb} galat={galat.situsWeb} />
        </div>
      </Kartu>

      <Kartu judul="Identitas penanggung jawab">
        <div className="grid gap-4 sm:grid-cols-[2fr_1fr]">
          <Field name="namaPic" label="Nama lengkap" autoComplete="name" defaultValue={nilai?.namaPic} galat={galat.namaPic} />
          <Field name="jabatan" label="Jabatan" placeholder="contoh: CEO" defaultValue={nilai?.jabatan} galat={galat.jabatan} />
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Field name="emailPic" label="Email" type="email" autoComplete="email" defaultValue={nilai?.emailPic} galat={galat.emailPic} />
          <Field name="teleponPic" label="Nomor telepon / WhatsApp" type="tel" autoComplete="tel" defaultValue={nilai?.teleponPic} galat={galat.teleponPic} />
          <Field name="kataSandi" label="Kata sandi" type="password" autoComplete="new-password" galat={galat.kataSandi} />
          <Field name="konfirmasi" label="Konfirmasi kata sandi" type="password" autoComplete="new-password" galat={galat.konfirmasi} />
        </div>
        <p className="mt-2 text-xs text-muted">Minimal 8 karakter, kombinasi huruf, angka, dan simbol.</p>

        <div className="mt-8">
          <h3 className="text-base font-semibold text-navy">Dokumen Pendukung &amp; Legitimasi Entitas</h3>
          <div className="mt-2">
            <UnggahDokumen keterangan={infoDokumen(jenis)} accept=".pdf,.jpg,.jpeg,application/pdf,image/jpeg" galat={galat.dokumen} />
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
            {pending ? "Mengirim…" : "Daftarkan Akun"}
          </button>
        </div>
      </Kartu>
    </form>
  );
}
