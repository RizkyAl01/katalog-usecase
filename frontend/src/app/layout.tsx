import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SITE } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `${SITE.nama} — Katalog Use Case AI Nasional`,
    template: `%s | ${SITE.nama}`,
  },
  description:
    "Platform registrasi, integrasi, dan sistem monitoring AI nasional: katalog use case, kebutuhan, dan riset AI terverifikasi di Indonesia.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${inter.variable} font-sans antialiased`}>{children}</body>
    </html>
  );
}
