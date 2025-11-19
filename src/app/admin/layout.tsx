import Link from "next/link";
import { Layers, Package, Settings, ShoppingCart, Tags, Zap } from "lucide-react";

import { AdminNav } from "@/components/admin/admin-nav";
import { Button } from "@/components/ui/button";
import { destroySessionCookie } from "@/lib/auth";

const navItems = [
  { label: "Visão geral", href: "/admin", icon: Layers },
  { label: "Produtos", href: "/admin/products", icon: Package },
  { label: "Categorias", href: "/admin/categories", icon: Tags },
  { label: "Listas de preço", href: "/admin/price-lists", icon: ShoppingCart },
  { label: "Integrações", href: "/admin/integrations", icon: Zap },
  { label: "Configurações", href: "/admin/settings", icon: Settings },
];

type Props = {
  children: React.ReactNode;
};

export const dynamic = "force-dynamic";

export default function AdminLayout({ children }: Props) {
  async function handleLogout() {
    "use server";
    destroySessionCookie();
  }

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <div className="mx-auto flex max-w-6xl gap-6 px-4 py-10">
        <aside className="hidden w-60 flex-col gap-4 lg:flex">
          <div className="rounded-2xl border bg-white p-4">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">TopCell</p>
            <p className="text-lg font-semibold">Painel administrativo</p>
            <p className="text-xs text-muted-foreground">Gerencie catálogo, integrações e conteúdo.</p>
          </div>
          <AdminNav items={navItems} />
          <form action={handleLogout}>
            <Button type="submit" variant="ghost" className="w-full justify-start">
              Sair
            </Button>
          </form>
        </aside>
        <main className="flex-1 space-y-6">
          <div className="flex flex-col gap-3 rounded-3xl border bg-white p-6 shadow-sm lg:hidden">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Menu rápido</p>
            <div className="flex flex-wrap gap-2 text-sm">
              {navItems.map((item) => (
                <Link key={`mobile-${item.href}`} href={item.href} className="rounded-full border px-3 py-1">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}
