import { Prisma } from "@prisma/client";

import { ProductForm } from "@/components/forms/product-form";
import { ProductTable } from "@/components/admin/product-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const convertPrice = (value: Prisma.Decimal | string | number | null | undefined) => {
  if (!value) return 0;
  if (value instanceof Prisma.Decimal) {
    return Number(value.toString());
  }
  return Number(value);
};

export default async function AdminProductsPage() {
  const [products, categories] = await Promise.all([
    prisma.product.findMany({
      include: { category: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.category.findMany({
      orderBy: { name: "asc" },
    }),
  ]);

  const mappedProducts = products.map((product) => ({
    id: product.id,
    name: product.name,
    slug: product.slug,
    price: convertPrice(product.price),
    stock: product.stock,
    category: product.category?.name ?? "",
  }));

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-wide text-muted-foreground">Catálogo</p>
        <h1 className="text-3xl font-semibold text-zinc-900">Produtos</h1>
      </div>
      <div className="grid gap-6 lg:grid-cols-[0.7fr_1.3fr]">
        <Card>
          <CardHeader>
            <CardTitle>Novo produto</CardTitle>
          </CardHeader>
          <CardContent>
            <ProductForm
              categories={categories.map((category) => ({
                id: category.id,
                name: category.name,
              }))}
            />
          </CardContent>
        </Card>
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle>Produtos cadastrados</CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <ProductTable products={mappedProducts} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
