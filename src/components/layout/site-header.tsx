import Link from "next/link";
import { Menu, Phone } from "lucide-react";

import { siteConfig } from "@/config/site";
import { CartButton } from "@/components/cart/cart-button";
import { Button } from "@/components/ui/button";
import { getCategories } from "@/lib/data";
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
  { label: "Sobre", href: "/#sobre" },
  { label: "Contato", href: "/#contato" },
];

export async function SiteHeader() {
  const categories = await getCategories();

  return (
    <header className="border-b bg-white/90 backdrop-blur-sm supports-[backdrop-filter]:bg-white/70">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4">
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
          <div className="group relative">
            <button className="text-muted-foreground transition hover:text-black">Departamentos</button>
            <div className="invisible absolute left-1/2 z-20 mt-3 w-80 -translate-x-1/2 rounded-3xl border bg-white p-4 text-left text-sm shadow-2xl opacity-0 transition group-hover:visible group-hover:opacity-100">
              <p className="mb-2 text-xs uppercase tracking-wide text-muted-foreground">Categorias</p>
              <div className="grid gap-2 sm:grid-cols-2">
                {categories.slice(0, 8).map((category) => (
                  <Link
                    key={category.slug}
                    href={`/products?categoria=${category.slug}`}
                    className="rounded-2xl border px-3 py-2 text-sm text-muted-foreground hover:border-black hover:text-black"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
              <Link href="/products" className="mt-3 inline-flex text-xs font-semibold text-primary">
                Ver catálogo completo
              </Link>
            </div>
          </div>
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
                <div>
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">Departamentos</p>
                  <div className="mt-2 grid gap-2">
                    {categories.slice(0, 8).map((category) => (
                      <Link
                        key={`mobile-${category.slug}`}
                        href={`/products?categoria=${category.slug}`}
                        className="rounded-2xl border px-3 py-2 text-sm text-muted-foreground"
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="h-px bg-muted" />
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
