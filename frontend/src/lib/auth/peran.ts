/** Peran akun yang dapat login (Masyarakat tidak perlu login). Aman dipakai di client & server. */
export const PERAN_AKUN = ["penyedia", "pengguna", "inovator", "investor", "reviewer", "regulator"] as const;

export type PeranAkun = (typeof PERAN_AKUN)[number];

export const LABEL_PERAN: Record<PeranAkun, string> = {
  penyedia: "Penyedia Use Case",
  pengguna: "Pengguna Use Case",
  inovator: "Inovator Use Case",
  investor: "Investor",
  reviewer: "Reviewer (K/L)",
  regulator: "Regulator (Komdigi)",
};

/** Label singkat untuk tombol "Masuk sebagai …" (sesuai mockup hal. 20–23). */
export const LABEL_MASUK: Record<PeranAkun, string> = {
  penyedia: "Penyedia Use Case",
  pengguna: "Pengguna Use Case",
  inovator: "Inovator",
  investor: "Investor",
  reviewer: "Reviewer",
  regulator: "Regulator / Admin Komdigi",
};

export function isPeranAkun(nilai: unknown): nilai is PeranAkun {
  return typeof nilai === "string" && (PERAN_AKUN as readonly string[]).includes(nilai);
}

export function konsolPath(peran: PeranAkun): string {
  return `/konsol/${peran}`;
}
