import Link from "next/link";
import { Menu, Phone } from "lucide-react";

import { siteConfig } from "@/config/site";
import { CartButton } from "@/components/cart/cart-button";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const links = [
  { label: "Início", href: "/" },
  { label: "Produtos", href: "/products" },
  { label: "Categorias", href: "/#categorias" },
  { label: "Serviços", href: "/#servicos" },
  { label: "Contato", href: "/#contato" },
  { label: "Painel", href: "/admin" },
];

export function SiteHeader() {
  return (
    <header className="border-b bg-white/90 backdrop-blur-sm supports-[backdrop-filter]:bg-white/70">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
        <div className="flex items-center gap-2 text-left">
          <div className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
            TopCell
          </div>
          <div>
            <p className="text-sm font-semibold text-zinc-900">{siteConfig.locationLabel}</p>
            <p className="text-xs text-muted-foreground">{siteConfig.address.street}</p>
          </div>
        </div>

        <nav className="hidden items-center gap-4 text-sm font-medium md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="text-muted-foreground hover:text-black">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href={`tel:${siteConfig.contact.phone.replace(/\D/g, "")}`}
            className="hidden items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium md:flex"
          >
            <Phone className="h-4 w-4" />
            {siteConfig.contact.phone}
          </Link>
          <CartButton />

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>TopCell</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-3 py-6">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm font-medium text-muted-foreground hover:text-primary"
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href={`https://wa.me/${siteConfig.contact.whatsapp}`}
                  className="rounded-full bg-primary px-4 py-2 text-center text-sm font-semibold text-primary-foreground"
                >
                  Atendimento rápido
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
