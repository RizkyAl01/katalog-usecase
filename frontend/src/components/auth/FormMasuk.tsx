"use client";

import Link from "next/link";
import { useActionState } from "react";
import { AlertCircle, KeyRound, Loader2, UserRound } from "lucide-react";
import { masuk, type StateMasuk } from "@/lib/auth/actions";
import type { PeranAkun } from "@/lib/auth/peran";

interface Props {
  peran: PeranAkun | null;
  next: string;
}

interface PropsDemo {
  akunDemo: { email: string; label: string }[];
  passwordDemo: string;
}

const kelasInput =
  "h-12 w-full rounded-lg border border-line bg-white pl-12 pr-4 text-sm text-navy placeholder:text-navy/70 focus:border-cta focus:outline-none focus:ring-2 focus:ring-cta/30";

export default function FormMasuk({ peran, next }: Props) {
  const [state, formAction, pending] = useActionState<StateMasuk, FormData>(masuk, {});

  return (
    <>
      <form action={formAction} className="mt-8 space-y-5" noValidate>
        {peran && <input type="hidden" name="peran" value={peran} />}
        <input type="hidden" name="next" value={next} />

        {state.error && (
          <p role="alert" className="flex items-start gap-2 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
            <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden />
            {state.error}
          </p>
        )}

        <div>
          <label htmlFor="email" className="text-sm font-medium text-navy">
            Email
          </label>
          <div className="relative mt-1.5">
            <UserRound className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-navy" aria-hidden />
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              defaultValue={state.email}
              placeholder="Masukkan email anda"
              className={kelasInput}
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="text-sm font-medium text-navy">
            Password
          </label>
          <div className="relative mt-1.5">
            <KeyRound className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-navy" aria-hidden />
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              placeholder="Masukkan password"
              className={kelasInput}
            />
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-navy">
            <input type="checkbox" name="ingat" className="size-4 rounded border-line accent-primary" />
            Ingat saya
          </label>
          <Link href="/lupa-password" className="text-accent hover:underline">
            Lupa password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={pending}
          className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-cta text-sm font-semibold text-white transition-colors hover:bg-cta-hover disabled:opacity-70"
        >
          {pending && <Loader2 className="size-4 animate-spin" aria-hidden />}
          {pending ? "Memproses…" : "Masuk"}
        </button>
      </form>

    </>
  );
}

/** Daftar akun demo + tombol isi otomatis (mengisi field #email & #password di FormMasuk). */
export function PanelAkunDemo({ akunDemo, passwordDemo }: PropsDemo) {
  if (akunDemo.length === 0) return null;

  const isiDemo = (email: string) => {
    const emailEl = document.getElementById("email") as HTMLInputElement | null;
    const passwordEl = document.getElementById("password") as HTMLInputElement | null;
    if (emailEl) emailEl.value = email;
    if (passwordEl) {
      passwordEl.value = passwordDemo;
      passwordEl.focus();
    }
  };

  return (
    <details className="mt-6 rounded-lg border border-dashed border-chip-status-fg/40 bg-chip-status/50 px-4 py-3 text-sm">
      <summary className="cursor-pointer font-semibold text-chip-status-fg">Akun demo (mode tanpa database)</summary>
      <p className="mt-2 text-xs text-muted">
        Password semua akun: <code className="rounded bg-white px-1.5 py-0.5 font-semibold text-navy">{passwordDemo}</code>
      </p>
      <ul className="mt-2 divide-y divide-line/70">
        {akunDemo.map((a) => (
          <li key={a.email} className="flex items-center justify-between gap-3 py-2">
            <span className="min-w-0">
              <span className="block truncate font-medium text-navy">{a.email}</span>
              <span className="block text-xs text-muted">{a.label}</span>
            </span>
            <button
              type="button"
              onClick={() => isiDemo(a.email)}
              className="shrink-0 rounded-md bg-white px-3 py-1 text-xs font-semibold text-primary ring-1 ring-line hover:ring-primary"
            >
              Isi otomatis
            </button>
          </li>
        ))}
      </ul>
    </details>
  );
}
