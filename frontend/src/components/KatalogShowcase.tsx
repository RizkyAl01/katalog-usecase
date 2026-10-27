import { getSektor, getSorotan, JENIS_KATALOG } from "@/lib/katalog";
import KatalogTabs, { type TabKatalog } from "@/components/KatalogTabs";

/** Section "Katalog Use-Case AI": sorotan item terpublikasi dari 3 daftar publik. */
export default function KatalogShowcase() {
  const tabs: TabKatalog[] = JENIS_KATALOG.map((jenis) => ({
    ...jenis,
    item: getSorotan(jenis.id).map((item) => ({ item, sektor: getSektor(item.sektor) })),
  }));

  return <KatalogTabs tabs={tabs} />;
}
