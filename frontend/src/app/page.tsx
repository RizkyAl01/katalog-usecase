import Hero from "@/components/Hero";
import KatalogShowcase from "@/components/KatalogShowcase";
import PartnerCarousel from "@/components/PartnerCarousel";
import RoleSolutions from "@/components/RoleSolutions";
import SearchSection from "@/components/SearchSection";
import { getMitra } from "@/lib/katalog";

export default function Beranda() {
  return (
    <div className="mx-auto max-w-[1440px] space-y-14 px-4 pt-6 sm:px-6 lg:space-y-16 lg:pt-8">
      <Hero />
      <SearchSection />
      <KatalogShowcase />
      <RoleSolutions />

      <section aria-labelledby="judul-mitra" className="pt-6 text-center">
        <h2 id="judul-mitra" className="text-xl font-bold text-navy sm:text-2xl">
          Didukung oleh Berbagai Mitra
        </h2>
        <p className="mt-2 text-sm text-muted">
          Kolaborasi dengan pemerintah, industri, akademisi, dan masyarakat untuk ekosistem AI yang lebih kuat.
        </p>
        <div className="mt-8">
          <PartnerCarousel mitra={getMitra()} />
        </div>
      </section>
    </div>
  );
}
