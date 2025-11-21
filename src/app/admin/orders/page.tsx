import { format } from "date-fns";
import { OrderStatus, Prisma } from "@prisma/client";

import { updateOrderStatusAction } from "../orders/actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/formatters";
import { prisma } from "@/lib/prisma";

const statusCopy: Record<OrderStatus, { label: string; badge: string }> = {
  [OrderStatus.PENDING]: {
    label: "Aguardando pagamento",
    badge: "bg-amber-100 text-amber-900",
  },
  [OrderStatus.PROCESSING]: {
    label: "Pronto para embalar",
    badge: "bg-sky-100 text-sky-900",
  },
  [OrderStatus.COMPLETED]: {
    label: "Concluído",
    badge: "bg-emerald-100 text-emerald-900",
  },
  [OrderStatus.CANCELLED]: {
    label: "Cancelado",
    badge: "bg-rose-100 text-rose-900",
  },
};

const decimalToNumber = (value: Prisma.Decimal | number | string) => {
  if (value instanceof Prisma.Decimal) {
    return Number(value.toString());
  }
  return Number(value);
};

type ShippingAddress = {
  line1?: string;
  city?: string;
  state?: string;
  postalCode?: string;
};

export const dynamic = "force-dynamic";

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    include: { items: true },
    orderBy: { createdAt: "desc" },
  });

  const pending = orders.filter((order) => order.status === OrderStatus.PENDING);
  const processing = orders.filter((order) => order.status === OrderStatus.PROCESSING);

  const renderOrderCard = (order: (typeof orders)[number], nextStatus?: OrderStatus) => {
    const address = (order.shippingAddress as ShippingAddress | null) ?? undefined;
    const created = format(order.createdAt, "dd/MM/yyyy HH:mm");
    const total = formatCurrency(decimalToNumber(order.total));

    return (
      <Card key={order.id} className="border-dashed">
        <CardHeader className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground">#{order.id.slice(-6)}</p>
            <CardTitle className="text-lg">{order.customerName}</CardTitle>
            <p className="text-sm text-muted-foreground">{order.customerEmail}</p>
            <p className="text-sm text-muted-foreground">{order.customerPhone}</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge className={statusCopy[order.status].badge}>{statusCopy[order.status].label}</Badge>
            <span className="text-sm text-muted-foreground">{created}</span>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border bg-white p-4">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Itens</p>
              <ul className="mt-2 space-y-1 text-sm">
                {order.items.map((item) => (
                  <li key={item.id} className="flex justify-between">
                    <span>
                      {item.productName} <span className="text-muted-foreground">x{item.quantity}</span>
                    </span>
                    <span>{formatCurrency(decimalToNumber(item.unitPrice))}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-3 flex items-center justify-between border-t pt-2 text-sm font-semibold">
                <span>Total</span>
                <span>{total}</span>
              </div>
            </div>
            <div className="rounded-2xl border bg-white p-4">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Envio</p>
              <div className="mt-2 text-sm">
                <p>{address?.line1}</p>
                <p>
                  {address?.city} - {address?.state}
                </p>
                <p>CEP {address?.postalCode}</p>
                {order.notes && <p className="mt-2 text-muted-foreground">Obs: {order.notes}</p>}
              </div>
            </div>
          </div>

          {nextStatus ? (
            <div className="flex flex-wrap gap-2">
              <form action={updateOrderStatusAction}>
                <input type="hidden" name="orderId" value={order.id} />
                <input type="hidden" name="status" value={nextStatus} />
                <Button type="submit" className="w-full sm:w-auto">
                  {nextStatus === OrderStatus.PROCESSING ? "Aprovar pagamento" : "Concluir pedido"}
                </Button>
              </form>
              {order.status === OrderStatus.PENDING && (
                <form action={updateOrderStatusAction}>
                  <input type="hidden" name="orderId" value={order.id} />
                  <input type="hidden" name="status" value={OrderStatus.CANCELLED} />
                  <Button type="submit" variant="outline" className="w-full sm:w-auto">
                    Cancelar
                  </Button>
                </form>
              )}
            </div>
          ) : null}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs uppercase tracking-wide text-muted-foreground">operações</p>
        <h1 className="text-3xl font-semibold text-zinc-900">Pedidos</h1>
        <p className="text-sm text-muted-foreground">Acompanhe pagamentos e preparação de pedidos.</p>
      </div>

      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold text-zinc-900">Aguardando pagamento</h2>
          <p className="text-sm text-muted-foreground">
            Pedidos recebidos e aguardando confirmação via Mercado Pago.
          </p>
        </div>
        {pending.length === 0 ? (
          <Card>
            <CardContent className="py-6 text-center text-sm text-muted-foreground">
              Nenhum pedido pendente no momento.
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">{pending.map((order) => renderOrderCard(order, OrderStatus.PROCESSING))}</div>
        )}
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold text-zinc-900">Prontos para embalar</h2>
          <p className="text-sm text-muted-foreground">
            Pagamentos aprovados. Avance para a etapa de logística e impressão de etiquetas.
          </p>
        </div>
        {processing.length === 0 ? (
          <Card>
            <CardContent className="py-6 text-center text-sm text-muted-foreground">
              Nenhum pedido aguardando embalagem.
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">{processing.map((order) => renderOrderCard(order, OrderStatus.COMPLETED))}</div>
        )}
      </section>
    </div>
  );
}
