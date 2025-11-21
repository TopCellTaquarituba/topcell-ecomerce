"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ClipboardList, Layers, Package, Settings, ShoppingCart, Tags, Truck, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const iconMap = {
  layers: Layers,
  products: Package,
  orders: ClipboardList,
  logistics: Truck,
  categories: Tags,
  priceLists: ShoppingCart,
  integrations: Zap,
  settings: Settings,
} satisfies Record<string, LucideIcon>;

export type NavItem = {
  label: string;
  href: string;
  icon: keyof typeof iconMap;
};

type Props = {
  items: NavItem[];
  collapsed?: boolean;
};

export function AdminNav({ items, collapsed = false }: Props) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1">
      {items.map((item) => {
        const active = pathname === item.href;
        const Icon = iconMap[item.icon] as LucideIcon | undefined;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 rounded-2xl px-3 py-2 text-sm font-medium transition ${
              active ? "bg-zinc-900 text-white" : "text-muted-foreground hover:text-zinc-900"
            } ${collapsed ? "justify-center px-0" : ""}`}
          >
            {Icon ? <Icon className="h-4 w-4" /> : null}
            {!collapsed && item.label}
          </Link>
        );
      })}
    </nav>
  );
}
