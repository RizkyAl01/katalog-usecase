import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { FOOTER, SITE } from "@/lib/site";

function KolomLink({ judul, links }: { judul: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h2 className="text-xs font-semibold text-navy">{judul}</h2>
      <ul className="mt-3 space-y-1.5">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-xs text-muted hover:text-primary">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-line bg-white">
      <div className="mx-auto grid max-w-[1536px] gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1fr_auto_auto_auto] md:gap-12 lg:gap-20">
        <Link href="/" className="self-start" aria-label="Beranda">
          <Image src="/images/logo-komdigi.png" alt="Logo Komdigi" width={360} height={252} className="h-24 w-auto" />
        </Link>

        <KolomLink judul="Navigasi" links={FOOTER.navigasi} />
        <KolomLink judul="Tentang" links={FOOTER.tentang} />

        <div className="md:border-l md:border-line md:pl-10">
          <h2 className="text-xs font-semibold text-navy">Alamat</h2>
          <address className="mt-3 flex gap-2 text-xs not-italic leading-relaxed text-muted">
            <MapPin className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
            <span>
              {SITE.alamat.map((baris) => (
                <span key={baris} className="block">
                  {baris}
                </span>
              ))}
            </span>
          </address>
          {SITE.email && (
            <a href={`mailto:${SITE.email}`} className="mt-3 flex items-center gap-2 text-xs text-muted hover:text-primary">
              <Mail className="size-4 shrink-0 text-primary" aria-hidden />
              {SITE.email}
            </a>
          )}
          {SITE.telepon && (
            <a href={`tel:${SITE.telepon.replace(/\s/g, "")}`} className="mt-2 flex items-center gap-2 text-xs text-muted hover:text-primary">
              <Phone className="size-4 shrink-0 text-primary" aria-hidden />
              {SITE.telepon}
            </a>
          )}
        </div>
      </div>

      <div className="border-t border-line bg-footer-bar px-4 py-4 text-center text-[11px] text-muted">
        © {SITE.tahun} PLATFORM. {SITE.pemilik}. All Rights Reserved
      </div>
    </footer>
  );
}
