"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { LAYANAN, NAV_UTAMA, SITE } from "@/lib/site";

function isAktif(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

/** Warna link sesuai mockup: aktif biru, "Ajukan Use-Case" hijau saat tidak aktif. */
function warnaLink(aktif: boolean, href: string) {
  if (aktif) return "text-primary";
  if (href === "/ajukan") return "text-ajukan hover:text-primary";
  return "text-navy hover:text-primary";
}

export default function Navbar() {
  const pathname = usePathname();
  const [layananBuka, setLayananBuka] = useState(false);
  const [mobileBuka, setMobileBuka] = useState(false);
  const layananRef = useRef<HTMLDivElement>(null);
  const layananAktif = pathname.startsWith("/layanan");

  useEffect(() => {
    setLayananBuka(false);
    setMobileBuka(false);
  }, [pathname]);

  useEffect(() => {
    if (!layananBuka) return;
    const tutupJikaDiLuar = (e: MouseEvent) => {
      if (!layananRef.current?.contains(e.target as Node)) setLayananBuka(false);
    };
    const tutupDenganEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLayananBuka(false);
    };
    document.addEventListener("mousedown", tutupJikaDiLuar);
    document.addEventListener("keydown", tutupDenganEsc);
    return () => {
      document.removeEventListener("mousedown", tutupJikaDiLuar);
      document.removeEventListener("keydown", tutupDenganEsc);
    };
  }, [layananBuka]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/95 backdrop-blur">
      <nav className="mx-auto flex h-[72px] max-w-[1536px] items-center gap-8 px-4 sm:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-2.5" aria-label={`${SITE.nama} — Beranda`}>
          <Image src="/images/logo-komdigi.png" alt="Logo Komdigi" width={360} height={252} priority className="h-11 w-auto" />
          <span className="leading-tight">
            <span className="block text-[15px] font-semibold text-brand">{SITE.nama}</span>
            <span className="block text-[11px] font-medium uppercase tracking-wide text-brand/80">{SITE.tagline}</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-8 text-[15px] font-medium lg:flex">
          {NAV_UTAMA.map((item) => {
            const aktif = isAktif(pathname, item.href);
            return (
              <li key={item.href}>
                <Link href={item.href} aria-current={aktif ? "page" : undefined} className={`transition-colors ${warnaLink(aktif, item.href)}`}>
                  {item.label}
                </Link>
              </li>
            );
          })}
          <li>
            <div ref={layananRef} className="relative">
              <button
                type="button"
                aria-expanded={layananBuka}
                aria-haspopup="true"
                onClick={() => setLayananBuka((v) => !v)}
                className={`flex items-center gap-1 transition-colors ${layananBuka || layananAktif ? "text-primary" : "text-navy hover:text-primary"}`}
              >
                Layanan
                <ChevronDown className={`size-4 transition-transform ${layananBuka ? "rotate-180" : ""}`} aria-hidden />
              </button>
              {layananBuka && (
                <ul className="absolute left-0 top-full mt-3 w-64 overflow-hidden rounded-xl border border-line bg-white py-1 shadow-lg">
                  {LAYANAN.map((item) => (
                    <li key={item.href} className="border-b border-line last:border-b-0">
                      <Link
                        href={item.href}
                        className={`block px-4 py-3 text-sm font-medium hover:bg-soft hover:text-primary ${pathname === item.href ? "text-primary" : "text-navy"}`}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </li>
        </ul>

        <div className="ml-auto hidden items-center gap-6 lg:flex">
          <Link href="/masuk" className="text-[15px] font-medium text-primary hover:underline">
            Masuk
          </Link>
          <Link href="/daftar" className="rounded-md bg-primary px-5 py-2.5 text-[15px] font-semibold text-white shadow-sm transition-colors hover:bg-primary-hover">
            Daftar
          </Link>
        </div>

        <button
          type="button"
          className="ml-auto rounded-md p-2 text-navy lg:hidden"
          aria-label={mobileBuka ? "Tutup menu" : "Buka menu"}
          aria-expanded={mobileBuka}
          onClick={() => setMobileBuka((v) => !v)}
        >
          {mobileBuka ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </nav>

      {mobileBuka && (
        <div className="border-t border-line bg-white px-4 pb-6 pt-2 lg:hidden">
          <ul className="flex flex-col text-[15px] font-medium">
            {NAV_UTAMA.map((item) => {
              const aktif = isAktif(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link href={item.href} aria-current={aktif ? "page" : undefined} className={`block py-3 ${warnaLink(aktif, item.href)}`}>
                    {item.label}
                  </Link>
                </li>
              );
            })}
            <li className="pt-3 text-xs font-semibold uppercase tracking-wide text-muted">Layanan</li>
            {LAYANAN.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={`block py-3 pl-3 ${pathname === item.href ? "text-primary" : "text-navy"}`}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex gap-3">
            <Link href="/masuk" className="flex-1 rounded-md border border-primary py-2.5 text-center font-semibold text-primary">
              Masuk
            </Link>
            <Link href="/daftar" className="flex-1 rounded-md bg-primary py-2.5 text-center font-semibold text-white">
              Daftar
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
