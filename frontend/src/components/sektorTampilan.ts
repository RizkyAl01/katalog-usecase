import { Banknote, Building2, BusFront, HeartPulse, Wheat, Zap, type LucideIcon } from "lucide-react";
import type { SektorId } from "@/lib/types";

/** Ikon & warna per sektor, mengikuti panel "Sektor Populer" pada mockup. */
export const SEKTOR_TAMPILAN: Record<SektorId, { ikon: LucideIcon; warna: string; latar: string }> = {
  kesehatan: { ikon: HeartPulse, warna: "text-red-600 bg-red-50", latar: "from-red-100 to-rose-200" },
  transportasi: { ikon: BusFront, warna: "text-emerald-600 bg-emerald-50", latar: "from-emerald-100 to-teal-200" },
  "ekonomi-keuangan": { ikon: Banknote, warna: "text-orange-600 bg-orange-50", latar: "from-orange-100 to-amber-200" },
  pendidikan: { ikon: Building2, warna: "text-blue-700 bg-blue-50", latar: "from-blue-100 to-indigo-200" },
  energi: { ikon: Zap, warna: "text-yellow-600 bg-yellow-50", latar: "from-yellow-100 to-amber-200" },
  "ketahanan-pangan": { ikon: Wheat, warna: "text-lime-700 bg-lime-50", latar: "from-lime-100 to-green-200" },
};
