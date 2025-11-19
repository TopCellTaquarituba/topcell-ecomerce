import { PriceListForm } from "@/components/forms/price-list-form";
import { PriceListTable } from "@/components/admin/price-list-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";

export default async function AdminPriceListsPage() {
  const priceLists = await prisma.priceList.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-wide text-muted-foreground">Comercial</p>
        <h1 className="text-3xl font-semibold text-zinc-900">Listas de preço</h1>
      </div>
      <div className="grid gap-6 lg:grid-cols-[0.6fr_1.4fr]">
        <Card>
          <CardHeader>
            <CardTitle>Novo grupo</CardTitle>
          </CardHeader>
          <CardContent>
            <PriceListForm />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Tabelas existentes</CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <PriceListTable priceLists={priceLists} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
