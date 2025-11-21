import { IntegrationType, OrderStatus, Prisma } from "@prisma/client";

import { updateOrderStatusAction } from "../orders/actions";
import { PrintLabelButton } from "@/components/admin/print-label-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/formatters";
import { prisma } from "@/lib/prisma";

type ShippingAddress = {
  line1?: string;
  city?: string;
  state?: string;
  postalCode?: string;
};

const decimalToNumber = (value: Prisma.Decimal | number | string) => {
  if (value instanceof Prisma.Decimal) {
    return Number(value.toString());
  }
  return Number(value);
};

export const dynamic = "force-dynamic";

export default async function LogisticsPage() {
  const [orders, logisticPartners] = await Promise.all([
    prisma.order.findMany({
      where: { status: OrderStatus.PROCESSING },
      include: { items: true },
      orderBy: { createdAt: "asc" },
    }),
    prisma.integration.findMany({
      where: { type: IntegrationType.SHIPPING, active: true },
      orderBy: { name: "asc" },
    }),
  ]);

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs uppercase tracking-wide text-muted-foreground">operações</p>
        <h1 className="text-3xl font-semibold text-zinc-900">Logística</h1>
        <p className="text-sm text-muted-foreground">
          Gere etiquetas e finalize os pedidos aprovados com suporte dos parceiros de entrega.
        </p>
      </div>

      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold text-zinc-900">Integrações logísticas</h2>
          <p className="text-sm text-muted-foreground">
            Configure as integrações ativas para disponibilizar etiquetas e rastreamento.
          </p>
        </div>
        {logisticPartners.length === 0 ? (
          <Card>
            <CardContent className="py-6 text-center text-sm text-muted-foreground">
              Nenhum parceiro logístico ativo. Cadastre integrações em{" "}
              <span className="font-semibold">Admin &gt; Integrações</span>.
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {logisticPartners.map((partner) => (
              <Card key={partner.id}>
                <CardHeader>
                  <CardTitle className="text-base">{partner.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{partner.provider}</p>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  {partner.baseUrl ? (
                    <p>Portal: {partner.baseUrl}</p>
                  ) : (
                    <p>Defina a URL do painel para facilitar o acesso.</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold text-zinc-900">Pedidos prontos para envio</h2>
          <p className="text-sm text-muted-foreground">
            Confirme as etiquetas e avance o status para concluído assim que o pacote estiver com o parceiro.
          </p>
        </div>

        {orders.length === 0 ? (
          <Card>
            <CardContent className="py-6 text-center text-sm text-muted-foreground">
              Nenhum pedido aguardando impressão de etiquetas.
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => {
              const address = (order.shippingAddress as ShippingAddress | null) ?? undefined;
              const total = formatCurrency(decimalToNumber(order.total));
              const partnerName = logisticPartners[0]?.name ?? "Parceiro logístico";

              return (
                <Card key={order.id} className="border-dashed">
                  <CardHeader className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-wide text-muted-foreground">#{order.id.slice(-6)}</p>
                      <CardTitle className="text-lg">{order.customerName}</CardTitle>
                      <p className="text-sm text-muted-foreground">{order.customerEmail}</p>
                      <p className="text-sm text-muted-foreground">{order.customerPhone}</p>
                    </div>
                    <Badge className="bg-sky-100 text-sky-900">{partnerName}</Badge>
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
                        <p className="text-xs uppercase tracking-wide text-muted-foreground">Endereço para etiqueta</p>
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

                    <div className="flex flex-wrap gap-2">
                      <PrintLabelButton
                        orderId={order.id}
                        customerName={order.customerName}
                        customerPhone={order.customerPhone}
                        integrationName={partnerName}
                        address={address}
                        items={order.items.map((item) => ({
                          name: item.productName,
                          quantity: item.quantity,
                        }))}
                      />
                      <form action={updateOrderStatusAction}>
                        <input type="hidden" name="orderId" value={order.id} />
                        <input type="hidden" name="status" value={OrderStatus.COMPLETED} />
                        <Button type="submit">Marcar como enviado</Button>
                      </form>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
