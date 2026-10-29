"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { CheckCircle2, FileText, FolderUp, MailCheck } from "lucide-react";

export const kelasInput =
  "h-11 w-full rounded-lg border bg-white px-3.5 text-sm text-navy placeholder:text-muted/70 focus:outline-none focus:ring-2";

function kelasStatus(galat?: string) {
  return galat ? "border-red-400 focus:ring-red-200" : "border-line focus:border-cta focus:ring-cta/25";
}

export function Kartu({ judul, children }: { judul: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-line bg-white p-6 sm:p-8">
      <h2 className="text-base font-semibold text-navy">{judul}</h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

export function PesanGalat({ id, pesan }: { id: string; pesan?: string }) {
  if (!pesan) return null;
  return (
    <p id={id} className="mt-1 text-xs text-red-600">
      {pesan}
    </p>
  );
}

interface FieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  galat?: string;
}

export function Field({ name, label, galat, className = "", ...rest }: FieldProps) {
  return (
    <div className={className}>
      <label htmlFor={name} className="text-sm font-semibold text-navy">
        {label}
      </label>
      <input
        id={name}
        name={name}
        aria-invalid={Boolean(galat)}
        aria-describedby={galat ? `${name}-galat` : undefined}
        className={`mt-1.5 ${kelasInput} ${kelasStatus(galat)}`}
        {...rest}
      />
      <PesanGalat id={`${name}-galat`} pesan={galat} />
    </div>
  );
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  label: string;
  galat?: string;
  pilihan: { value: string; label: string }[];
  placeholder?: string;
}

export function Pilihan({ name, label, galat, pilihan, placeholder, className = "", ...rest }: SelectProps) {
  return (
    <div className={className}>
      <label htmlFor={name} className="text-sm font-semibold text-navy">
        {label}
      </label>
      <select
        id={name}
        name={name}
        aria-invalid={Boolean(galat)}
        aria-describedby={galat ? `${name}-galat` : undefined}
        className={`mt-1.5 ${kelasInput} ${kelasStatus(galat)}`}
        {...rest}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {pilihan.map((p) => (
          <option key={p.value} value={p.value}>
            {p.label}
          </option>
        ))}
      </select>
      <PesanGalat id={`${name}-galat`} pesan={galat} />
    </div>
  );
}

/** Dropzone dokumen (klik atau seret). Berkas dikirim bersama form. */
export function UnggahDokumen({ keterangan, accept, galat }: { keterangan: string; accept: string; galat?: string }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [berkas, setBerkas] = useState<{ nama: string; ukuran: number } | null>(null);
  const [seret, setSeret] = useState(false);

  const perbarui = () => {
    const f = inputRef.current?.files?.[0];
    setBerkas(f ? { nama: f.name, ukuran: f.size } : null);
  };

  return (
    <div>
      <p className="text-sm text-navy">{keterangan}</p>
      <div className="mt-3 flex flex-wrap items-end gap-4">
        <label
          htmlFor="dokumen"
          onDragOver={(e) => {
            e.preventDefault();
            setSeret(true);
          }}
          onDragLeave={() => setSeret(false)}
          onDrop={(e) => {
            e.preventDefault();
            setSeret(false);
            if (inputRef.current && e.dataTransfer.files.length > 0) {
              inputRef.current.files = e.dataTransfer.files;
              perbarui();
            }
          }}
          className={`flex h-24 w-full max-w-[270px] cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed px-3 text-center transition-colors ${
            galat ? "border-red-400" : seret ? "border-cta bg-soft" : "border-navy/40 hover:border-cta"
          }`}
        >
          {berkas ? (
            <>
              <FileText className="size-7 text-primary" aria-hidden />
              <span className="w-full truncate text-xs font-medium text-navy">{berkas.nama}</span>
              <span className="text-[11px] text-muted">{(berkas.ukuran / 1024 / 1024).toFixed(2)} MB</span>
            </>
          ) : (
            <>
              <FolderUp className="size-8 text-navy" aria-hidden />
              <span className="text-xs text-muted">Klik atau seret berkas ke sini</span>
            </>
          )}
        </label>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="rounded-md bg-chip-sektor px-5 py-1.5 text-sm font-semibold text-primary hover:bg-soft"
        >
          {berkas ? "Ganti berkas" : "Unggah"}
        </button>
      </div>
      <input
        ref={inputRef}
        id="dokumen"
        name="dokumen"
        type="file"
        accept={accept}
        onChange={perbarui}
        aria-describedby={galat ? "dokumen-galat" : undefined}
        className="sr-only"
      />
      <PesanGalat id="dokumen-galat" pesan={galat} />
    </div>
  );
}

export function Persetujuan({
  daftar,
  galat,
  nilai,
}: {
  daftar: { name: string; teks: string }[];
  galat: Record<string, string>;
  nilai?: Record<string, string>;
}) {
  return (
    <div>
      <h3 className="text-base font-semibold text-navy">Persetujuan &amp; Pakta Integritas</h3>
      <div className="mt-3 space-y-3 rounded-xl border border-line p-4">
        {daftar.map((p) => (
          <div key={p.name}>
            <label className="flex items-start gap-3 text-sm text-navy">
              <input
                type="checkbox"
                name={p.name}
                defaultChecked={nilai?.[p.name] === "on"}
                aria-invalid={Boolean(galat[p.name])}
                className="mt-0.5 size-4 shrink-0 rounded border-line accent-primary"
              />
              {p.teks}
            </label>
            <PesanGalat id={`${p.name}-galat`} pesan={galat[p.name]} />
          </div>
        ))}
      </div>
    </div>
  );
}

export function SuksesRegistrasi({ email, entitas, langkah }: { email: string; entitas: string; langkah: string[] }) {
  return (
    <section className="rounded-2xl border border-line bg-white p-6 sm:p-10" aria-live="polite">
      <span className="inline-flex size-12 items-center justify-center rounded-xl bg-chip-tek text-chip-tek-fg">
        <MailCheck className="size-6" aria-hidden />
      </span>
      <h2 className="mt-4 text-xl font-bold text-navy">Pendaftaran berhasil dikirim</h2>
      <p className="mt-2 text-sm text-muted">
        Data <strong className="text-navy">{entitas}</strong> lolos validasi. Tautan aktivasi akan dikirim ke{" "}
        <strong className="text-navy">{email}</strong>.
      </p>

      <ol className="mt-6 space-y-3">
        {langkah.map((l, i) => (
          <li key={l} className="flex items-start gap-3 text-sm text-navy">
            <span
              className={`inline-flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                i === 0 ? "bg-chip-tek text-chip-tek-fg" : "bg-soft text-primary"
              }`}
            >
              {i === 0 ? <CheckCircle2 className="size-4" aria-hidden /> : i + 1}
            </span>
            {l}
          </li>
        ))}
      </ol>

      <p className="mt-6 rounded-lg bg-chip-status px-4 py-3 text-xs text-chip-status-fg">
        <strong>Mode demo:</strong> data dan dokumen tidak disimpan dan email tidak benar-benar dikirim. Gunakan akun demo di
        halaman Masuk untuk mencoba dashboard.
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link href="/masuk" className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-hover">
          Ke halaman Masuk
        </Link>
        <Link href="/" className="rounded-lg px-5 py-2.5 text-sm font-semibold text-primary ring-1 ring-line hover:ring-primary">
          Kembali ke Beranda
        </Link>
      </div>
    </section>
  );
}

/** Ambil nilai string & info berkas dari form untuk validasi di client. */
export function bacaFormKlien(form: HTMLFormElement) {
  const data = new FormData(form);
  const nilai: Record<string, string> = {};
  for (const [k, v] of data.entries()) if (typeof v === "string") nilai[k] = v;
  const f = (form.elements.namedItem("dokumen") as HTMLInputElement | null)?.files?.[0];
  return { nilai, berkas: f ? { name: f.name, size: f.size, type: f.type } : null };
}

/** Fokus ke field pertama yang galat. */
export function fokusGalat(form: HTMLFormElement, galat: Record<string, string>) {
  const pertama = Object.keys(galat)[0];
  const el = pertama ? (form.elements.namedItem(pertama) as HTMLElement | null) : null;
  el?.focus();
}
