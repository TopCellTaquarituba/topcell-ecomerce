import Link from "next/link";

import { siteConfig } from "@/config/site";

export function SiteAnnouncement() {
  return (
    <div className="bg-black px-4 py-2 text-xs text-white sm:text-sm">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 text-center sm:flex-row">
        <p>
          TopCell • Rua Centro, 529 - Taquarituba/SP • Atendimento presencial e online
        </p>
        <Link
          href={`https://wa.me/${siteConfig.contact.whatsapp}`}
          className="font-semibold uppercase tracking-wide text-emerald-200"
        >
          Fale no WhatsApp
        </Link>
      </div>
    </div>
  );
}
