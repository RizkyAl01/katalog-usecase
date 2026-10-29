import type { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { HakCipta } from "@/components/Footer";
import Sidebar from "@/components/konsol/Sidebar";
import { wajibPeran } from "@/lib/auth/dal";
import { isPeranAkun, konsolPath, LABEL_PERAN } from "@/lib/auth/peran";
import { COOKIE_SIDEBAR, KONSOL } from "@/lib/konsol/menu";

export async function generateMetadata({ params }: { params: Promise<{ peran: string }> }): Promise<Metadata> {
  const { peran } = await params;
  return { title: isPeranAkun(peran) ? KONSOL[peran].label : undefined, robots: { index: false } };
}

export default async function LayoutKonsol({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ peran: string }>;
}) {
  const { peran } = await params;
  if (!isPeranAkun(peran)) notFound();
  const { akun } = await wajibPeran(peran);
  const konfig = KONSOL[peran];
  const sidebarCiut = (await cookies()).get(COOKIE_SIDEBAR)?.value === "1";

  return (
    <div className="lg:flex">
      <Sidebar
        basePath={konsolPath(peran)}
        label={konfig.label}
        grup={konfig.grup}
        nama={akun.nama}
        keterangan={`${LABEL_PERAN[peran]} · ${akun.entitas}`}
        awalCiut={sidebarCiut}
      />
      {/* Konsol cukup baris hak cipta; navigasi sudah ada di sidebar (footer publik lengkap tidak relevan). */}
      <div className="flex min-h-screen min-w-0 flex-1 flex-col bg-page">
        <main className="flex-1">{children}</main>
        <HakCipta />
      </div>
    </div>
  );
}
