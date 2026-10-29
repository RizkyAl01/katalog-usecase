import { notFound } from "next/navigation";
import { DashboardInovator, DashboardPengguna, DashboardPenyedia, DashboardReviewer } from "@/components/konsol/DashboardPeran";
import { DashboardInvestor, DashboardRegulator } from "@/components/konsol/DashboardRegulator";
import { wajibPeran } from "@/lib/auth/dal";
import { isPeranAkun, konsolPath } from "@/lib/auth/peran";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function DashboardKonsol({
  params,
  searchParams,
}: {
  params: Promise<{ peran: string }>;
  searchParams: SearchParams;
}) {
  const { peran } = await params;
  if (!isPeranAkun(peran)) notFound();
  const { akun } = await wajibPeran(peran);

  const sp = await searchParams;
  const q = (Array.isArray(sp.q) ? sp.q[0] : sp.q)?.trim().slice(0, 100) ?? "";
  const basePath = konsolPath(peran);

  switch (peran) {
    case "penyedia":
      return <DashboardPenyedia akun={akun} q={q} basePath={basePath} />;
    case "pengguna":
      return <DashboardPengguna akun={akun} q={q} basePath={basePath} />;
    case "inovator":
      return <DashboardInovator akun={akun} q={q} basePath={basePath} />;
    case "reviewer":
      return <DashboardReviewer akun={akun} q={q} basePath={basePath} />;
    case "regulator":
      return <DashboardRegulator akun={akun} basePath={basePath} />;
    case "investor":
      return <DashboardInvestor akun={akun} basePath={basePath} />;
  }
}
