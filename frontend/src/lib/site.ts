/** Konfigurasi situs: navigasi, footer, dan kontak. */

export const SITE = {
  nama: "AI Sandbox Nasional",
  tagline: "Ekosistem AI Terpercaya",
  pemilik: "Kementerian Komunikasi dan Digital RI",
  tahun: 2026,
  alamat: [
    "Kementerian Komunikasi dan Digital",
    "Jl. Medan Merdeka Barat No. 9",
    "Jakarta Pusat, 10110",
    "Indonesia",
  ],
  // TODO: isi dengan kontak resmi (Email Bantuan/Helpdesk & Pusat Layanan) sebelum rilis.
  // Baris kontak hanya ditampilkan di footer bila nilainya terisi.
  email: "",
  telepon: "",
};

export const LAYANAN = [
  { label: "AI Assessment Toolkit", href: "/layanan/ai-assessment-toolkit" },
  { label: "Monitoring Terpadu Etika KA", href: "/layanan/monitoring-terpadu-etika-ka" },
  { label: "Website AIKITA", href: "/layanan/website-aikita" },
];

export const NAV_UTAMA = [
  { label: "Beranda", href: "/" },
  { label: "Katalog Use-Case", href: "/katalog" },
  { label: "Ajukan Use-Case", href: "/ajukan" },
];

export const FOOTER = {
  navigasi: [
    { label: "Beranda", href: "/" },
    { label: "Katalog Use-Case", href: "/katalog" },
    { label: "Ajukan Use-Case", href: "/ajukan" },
    ...LAYANAN,
  ],
  tentang: [
    { label: "Tentang Kami", href: "/tentang" },
    { label: "Regulatory Sandbox", href: "/layanan/regulatory-sandbox" },
    { label: "Pedoman Etika AI", href: "/layanan/pedoman-etika-ai" },
    { label: "Kebijakan Privasi", href: "/kebijakan-privasi" },
    { label: "Syarat dan Ketentuan", href: "/syarat-ketentuan" },
    { label: "Peta Situs", href: "/peta-situs" },
    { label: "Kontak", href: "/kontak" },
  ],
};
