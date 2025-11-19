import { Package, ShoppingCart, Tags } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDashboardSummary } from "@/lib/data";
import { prisma } from "@/lib/prisma";
import { formatCurrency } from "@/lib/formatters";

export default async function AdminDashboardPage() {
  const summary = await getDashboardSummary();
  let orders: Awaited<ReturnType<typeof prisma.order.findMany>> = [];

  try {
    orders = await prisma.order.findMany({
      include: { items: true },
      orderBy: { createdAt: "desc" },
      take: 5,
    });
  } catch (error) {
    console.warn("Não foi possível carregar pedidos, exibindo lista vazia.", error);
    orders = [];
  }

  const cards = [
    {
      title: "Produtos ativos",
      value: summary.productCount,
      icon: Package,
    },
    {
      title: "Categorias",
      value: summary.categoryCount,
      icon: Tags,
    },
    {
      title: "Pedidos (lifetime)",
      value: summary.orderCount,
      icon: ShoppingCart,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-wide text-muted-foreground">Painel</p>
        <h1 className="text-3xl font-semibold text-zinc-900">Visão geral</h1>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {cards.map((card) => (
          <Card key={card.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
              <card.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pedidos recentes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {!orders.length && (
            <p className="text-sm text-muted-foreground">Nenhum pedido registrado ainda.</p>
          )}
          {orders.map((order) => {
            const totalValue = Number(order.total?.toString() ?? 0);
            return (
              <div
                key={order.id}
                className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border px-4 py-3"
              >
                <div>
                  <p className="text-sm font-semibold">{order.customerName}</p>
                  <p className="text-xs text-muted-foreground">
                    {order.items.length} item(s) • {formatCurrency(totalValue)}
                  </p>
                </div>
                <span className="text-xs uppercase tracking-wide text-muted-foreground">
                  {order.status}
                </span>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
