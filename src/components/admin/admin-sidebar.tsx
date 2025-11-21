"use client";

import { useState } from "react";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";

import { AdminNav, NavItem } from "@/components/admin/admin-nav";
import { Button } from "@/components/ui/button";

type Props = {
  items: NavItem[];
  logoutAction: () => Promise<void>;
};

export function AdminSidebar({ items, logoutAction }: Props) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`hidden rounded-3xl border bg-white/90 p-4 shadow-sm transition-all duration-300 lg:flex lg:flex-col ${
        collapsed ? "w-20" : "w-72"
      }`}
    >
      <div className="flex items-start justify-between">
        {!collapsed ? (
          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground">TopCell</p>
            <p className="text-lg font-semibold text-zinc-900">Painel administrativo</p>
            <p className="text-xs text-muted-foreground">Gerencie catálogo, integrações e conteúdo.</p>
          </div>
        ) : (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-900 text-xs font-semibold text-white">
            TC
          </div>
        )}
        <Button
          type="button"
          onClick={() => setCollapsed((prev) => !prev)}
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          aria-label={collapsed ? "Expandir menu" : "Recolher menu"}
        >
          {collapsed ? <PanelLeftOpen className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
        </Button>
      </div>

      <div className="mt-6 flex-1 overflow-hidden">
        <AdminNav items={items} collapsed={collapsed} />
      </div>

      <form action={logoutAction} className="mt-4">
        <Button type="submit" variant="ghost" className={`w-full ${collapsed ? "justify-center" : "justify-start"}`}>
          Sair
        </Button>
      </form>
    </aside>
  );
}
