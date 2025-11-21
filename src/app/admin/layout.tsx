import Link from "next/link";

import type { NavItem } from "@/components/admin/admin-nav";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { destroySessionCookie } from "@/lib/auth";

const navItems: NavItem[] = [
  { label: "Visão geral", href: "/admin", icon: "layers" },
  { label: "Produtos", href: "/admin/products", icon: "products" },
  { label: "Pedidos", href: "/admin/orders", icon: "orders" },
  { label: "Logística", href: "/admin/logistics", icon: "logistics" },
  { label: "Categorias", href: "/admin/categories", icon: "categories" },
  { label: "Listas de preço", href: "/admin/price-lists", icon: "priceLists" },
  { label: "Integrações", href: "/admin/integrations", icon: "integrations" },
  { label: "Configurações", href: "/admin/settings", icon: "settings" },
];

type Props = {
  children: React.ReactNode;
};

export const dynamic = "force-dynamic";

export default function AdminLayout({ children }: Props) {
  async function handleLogout() {
    "use server";
    await destroySessionCookie();
  }

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <div className="flex w-full gap-6 px-4 py-10 sm:px-6 lg:px-10">
        <AdminSidebar items={navItems} logoutAction={handleLogout} />
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

