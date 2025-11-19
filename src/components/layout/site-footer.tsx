import Link from "next/link";

import { siteConfig } from "@/config/site";

export function SiteFooter() {
  return (
    <footer id="contato" className="border-t bg-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Loja
          </p>
          <p className="mt-2 text-lg font-semibold text-zinc-900">{siteConfig.name}</p>
          <p className="text-sm text-muted-foreground">{siteConfig.description}</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Endereço
          </p>
          <p className="mt-2 text-sm">
            {siteConfig.address.street}
            <br />
            {siteConfig.address.city} - {siteConfig.address.state}
            <br />
            CEP {siteConfig.address.postalCode}
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Contatos
          </p>
          <div className="mt-2 flex flex-col gap-1 text-sm">
            <Link href={`mailto:${siteConfig.contact.email}`} className="hover:underline">
              {siteConfig.contact.email}
            </Link>
            <Link href={`tel:${siteConfig.contact.phone}`} className="hover:underline">
              {siteConfig.contact.phone}
            </Link>
            <Link
              href={`https://wa.me/${siteConfig.contact.whatsapp}`}
              className="font-semibold text-emerald-600"
            >
              WhatsApp
            </Link>
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Redes
          </p>
          <div className="mt-2 flex flex-col gap-1 text-sm">
            {siteConfig.social.map((social) => (
              <Link key={social.title} href={social.href} target="_blank" className="hover:underline">
                {social.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} TopCell. Todos os direitos reservados.
      </div>
    </footer>
  );
}
