"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import {
  Award,
  BarChart3,
  Boxes,
  ChevronDown,
  ClipboardList,
  FileCheck2,
  FileText,
  Globe,
  History,
  House,
  Inbox,
  LayoutDashboard,
  Library,
  Lightbulb,
  ListChecks,
  LogOut,
  Menu,
  PanelLeftClose,
  Search,
  ShieldCheck,
  TriangleAlert,
  UsersRound,
  X,
  type LucideIcon,
} from "lucide-react";
import { keluar } from "@/lib/auth/actions";
import { COOKIE_SIDEBAR, type GrupMenu, type IkonMenu } from "@/lib/konsol/menu";

const IKON: Record<IkonMenu, LucideIcon> = {
  dashboard: LayoutDashboard,
  daftar: ListChecks,
  riwayat: History,
  sandbox: Boxes,
  assessment: ShieldCheck,
  hasil: FileCheck2,
  regulasi: Globe,
  ide: Lightbulb,
  insiden: TriangleAlert,
  status: FileText,
  kolaborasi: UsersRound,
  cari: Search,
  grafik: BarChart3,
  monitoring: BarChart3,
  proposal: Inbox,
  izin: ShieldCheck,
  registry: ClipboardList,
  usulan: Lightbulb,
  penghargaan: Award,
  katalog: Library,
};

interface Props {
  basePath: string;
  label: string;
  grup: GrupMenu[];
  nama: string;
  keterangan: string;
  /** Status awal sidebar desktop dari cookie (server). */
  awalCiut: boolean;
}

const kunciGrup = (g: GrupMenu, i: number) => g.judul ?? `grup-${i}`;

export default function Sidebar({ basePath, label, grup, nama, keterangan, awalCiut }: Props) {
  const pathname = usePathname();
  const [drawer, setDrawer] = useState(false);
  const [ciut, setCiut] = useState(awalCiut);
  const [terlipat, setTerlipat] = useState<Set<string>>(new Set());

  const hrefItem = (slug: string) => (slug ? `${basePath}/${slug}` : basePath);
  const isAktif = (slug: string) => {
    const href = hrefItem(slug);
    return slug ? pathname === href || pathname.startsWith(`${href}/`) : pathname === basePath;
  };
  const grupAktif = grup.findIndex((g) => g.item.some((i) => isAktif(i.slug)));

  useEffect(() => setDrawer(false), [pathname]);

  /**
   * Sidebar tidak boleh ber-scroll: bila menu melebihi tinggi layar, grup bernomor
   * yang tidak memuat halaman aktif dilipat otomatis (tetap bisa dibuka manual).
   */
  const sesuaikanTinggi = useCallback(() => {
    // Ada dua nav (drawer mobile & sidebar desktop); ukur yang sedang terlihat saja.
    const meluap = [...document.querySelectorAll<HTMLElement>("[data-nav-konsol]")].some(
      (nav) => nav.offsetParent !== null && nav.scrollHeight > nav.clientHeight + 1,
    );
    if (!meluap) return;
    setTerlipat(new Set(grup.flatMap((g, i) => (g.judul && i !== grupAktif ? [kunciGrup(g, i)] : []))));
  }, [grup, grupAktif]);

  useEffect(() => {
    sesuaikanTinggi();
    window.addEventListener("resize", sesuaikanTinggi);
    return () => window.removeEventListener("resize", sesuaikanTinggi);
    // `ciut` sengaja tidak jadi dependensi: saat lebar sedang beranimasi teks membungkus dan menu tampak meluap.
    // Pengukuran setelah ciut/buka dilakukan lewat onTransitionEnd pada <aside>.
  }, [sesuaikanTinggi, drawer]);

  const gantiCiut = () => {
    const nilai = !ciut;
    setCiut(nilai);
    document.cookie = `${COOKIE_SIDEBAR}=${nilai ? "1" : "0"}; path=/; max-age=31536000; samesite=lax`;
  };

  const gantiLipat = (kunci: string) =>
    setTerlipat((lama) => {
      const baru = new Set(lama);
      if (baru.has(kunci)) baru.delete(kunci);
      else baru.add(kunci);
      return baru;
    });

  /** Isi sidebar. `rail` = mode ciut (ikon saja). */
  const isi = (rail: boolean, onTutup?: () => void) => (
    <div className="flex h-full flex-col">
      <div className={`flex items-center gap-2 pb-4 pt-4 ${rail ? "flex-col px-2" : "px-4"}`}>
        {onTutup ? (
          <button type="button" onClick={onTutup} aria-label="Tutup menu" className="order-last ml-auto rounded-md p-1.5 text-white/80 hover:bg-white/10 hover:text-white">
            <X className="size-5" />
          </button>
        ) : (
          <button
            type="button"
            onClick={gantiCiut}
            aria-label={rail ? "Tampilkan sidebar" : "Sembunyikan sidebar"}
            aria-expanded={!rail}
            title={rail ? "Tampilkan sidebar" : "Sembunyikan sidebar"}
            className={`rounded-md p-1.5 text-white/80 hover:bg-white/10 hover:text-white ${rail ? "" : "order-last ml-auto"}`}
          >
            {rail ? <Menu className="size-5" /> : <PanelLeftClose className="size-5" />}
          </button>
        )}
        <Link href={basePath} className="flex min-w-0 items-center gap-2" title={rail ? "Dashboard" : undefined}>
          <Image src="/images/logo-komdigi.png" alt="Logo Komdigi" width={360} height={252} className="h-8 w-auto shrink-0 rounded bg-white/95 p-0.5" />
          {!rail && (
            <span className="min-w-0 leading-tight">
              <span className="block truncate text-[13px] font-semibold text-white">AI Sandbox Nasional</span>
              <span className="block truncate text-[10px] font-semibold uppercase tracking-wide text-white/75">{label}</span>
            </span>
          )}
        </Link>
      </div>

      <nav data-nav-konsol={rail ? undefined : ""} aria-label="Menu konsol" className={`no-scrollbar min-h-0 flex-1 overflow-y-auto ${rail ? "px-2" : "px-3"}`}>
        {grup.map((g, i) => {
          const kunci = kunciGrup(g, i);
          const lipat = !rail && Boolean(g.judul) && terlipat.has(kunci);
          const idDaftar = `menu-${onTutup ? "m" : "d"}-${i}`;
          return (
            <div key={kunci} className={i > 0 ? (rail ? "mt-2 border-t border-white/15 pt-2" : "mt-2.5") : undefined}>
              {g.judul && !rail && (
                <button
                  type="button"
                  onClick={() => gantiLipat(kunci)}
                  aria-expanded={!lipat}
                  aria-controls={idDaftar}
                  className="mb-0.5 flex w-full items-center justify-between rounded px-2 py-1 text-left text-[10px] font-bold uppercase tracking-wide text-sidebar-label hover:bg-white/5"
                >
                  {g.judul}
                  <ChevronDown className={`size-3.5 shrink-0 transition-transform ${lipat ? "-rotate-90" : ""}`} aria-hidden />
                </button>
              )}
              {!lipat && (
                <ul id={idDaftar} className="space-y-0.5">
                  {g.item.map((item) => {
                    const href = hrefItem(item.slug);
                    const aktif = isAktif(item.slug);
                    const Ikon = IKON[item.ikon];
                    return (
                      <li key={href}>
                        <Link
                          href={href}
                          aria-current={aktif ? "page" : undefined}
                          title={rail ? item.label : undefined}
                          className={`flex items-center rounded-md text-[13px] transition-colors ${
                            rail ? "justify-center p-2" : "gap-2.5 px-2.5 py-1.5"
                          } ${aktif ? "bg-white font-semibold text-navy shadow-sm" : "text-white/90 hover:bg-white/10 hover:text-white"}`}
                        >
                          <Ikon className="size-4 shrink-0" aria-hidden />
                          {rail ? <span className="sr-only">{item.label}</span> : <span className="leading-snug">{item.label}</span>}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        })}
      </nav>

      {rail ? (
        <div className="flex flex-col items-center gap-1 border-t border-white/15 px-2 py-3">
          <Link href="/" title="Beranda" className="rounded-md p-2 text-white/90 hover:bg-white/10 hover:text-white">
            <House className="size-4" aria-hidden />
            <span className="sr-only">Beranda</span>
          </Link>
          <form action={keluar}>
            <button type="submit" title={`Keluar (${nama})`} className="rounded-md p-2 text-white/90 hover:bg-white/10 hover:text-white">
              <LogOut className="size-4" aria-hidden />
              <span className="sr-only">Keluar</span>
            </button>
          </form>
        </div>
      ) : (
        <div className="m-3 rounded-lg bg-sidebar-card px-3 py-2.5">
          <p className="truncate text-[13px] font-semibold text-white">{nama}</p>
          <p className="line-clamp-2 text-[11px] leading-snug text-white/70">{keterangan}</p>
          <div className="mt-2 flex gap-1.5">
            <Link href="/" className="flex flex-1 items-center justify-center gap-1 rounded-md bg-white/10 py-1.5 text-[11px] font-semibold text-white hover:bg-white/20">
              <House className="size-3.5" aria-hidden />
              Beranda
            </Link>
            <form action={keluar} className="flex-1">
              <button type="submit" className="flex w-full items-center justify-center gap-1 rounded-md bg-white/10 py-1.5 text-[11px] font-semibold text-white hover:bg-white/20">
                <LogOut className="size-3.5" aria-hidden />
                Keluar
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Mobile: bar atas + drawer */}
      <div className="sticky top-0 z-40 flex items-center justify-between bg-sidebar px-4 py-2.5 lg:hidden">
        <span className="leading-tight">
          <span className="block text-sm font-semibold text-white">AI Sandbox Nasional</span>
          <span className="block text-[10px] font-semibold uppercase tracking-wide text-white/75">{label}</span>
        </span>
        <button type="button" onClick={() => setDrawer(true)} aria-label="Buka menu" aria-expanded={drawer} className="rounded-md p-2 text-white">
          <Menu className="size-6" />
        </button>
      </div>
      {drawer && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Menu konsol">
          <button type="button" aria-label="Tutup menu" className="absolute inset-0 bg-navy/60" onClick={() => setDrawer(false)} />
          <div className="absolute inset-y-0 left-0 w-[260px] max-w-[85vw] bg-sidebar">{isi(false, () => setDrawer(false))}</div>
        </div>
      )}

      {/* Desktop: aside memanjang setinggi konten; isinya sticky setinggi layar */}
      <aside
        onTransitionEnd={(e) => {
          if (e.target === e.currentTarget && e.propertyName === "width" && !ciut) sesuaikanTinggi();
        }}
        className={`hidden shrink-0 bg-sidebar transition-[width] duration-200 lg:block ${ciut ? "w-16" : "w-[248px]"}`}
      >
        <div className="sticky top-0 h-screen">{isi(ciut)}</div>
      </aside>
    </>
  );
}
