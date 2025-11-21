import Link from "next/link";
import { Prisma } from "@prisma/client";

import { ProductTable } from "@/components/admin/product-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const convertPrice = (value: Prisma.Decimal | string | number | null | undefined) => {
  if (!value) return 0;
  if (value instanceof Prisma.Decimal) {
    return Number(value.toString());
  }
  return Number(value);
};

type Props = {
  searchParams?: {
    q?: string;
  };
};

export default async function AdminProductsPage({ searchParams }: Props) {
  const query = searchParams?.q?.trim() ?? "";

  const products = await prisma.product.findMany({
    where: query
      ? {
          OR: [
            { name: { contains: query, mode: "insensitive" } },
            { slug: { contains: query, mode: "insensitive" } },
            { sku: { contains: query, mode: "insensitive" } },
            { brand: { contains: query, mode: "insensitive" } },
          ],
        }
      : undefined,
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });

  const mappedProducts = products.map((product) => ({
    id: product.id,
    name: product.name,
    slug: product.slug,
    sku: product.sku,
    brand: product.brand,
    price: convertPrice(product.price),
    stock: product.stock,
    category: product.category?.name ?? "",
  }));

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-wide text-muted-foreground">Catálogo</p>
          <h1 className="text-3xl font-semibold text-zinc-900">Produtos cadastrados</h1>
          <p className="text-sm text-muted-foreground">Pesquise por código, nome ou marca.</p>
        </div>
        <Button asChild className="rounded-full">
          <Link href="/admin/products/new">Novo produto</Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Buscar produtos</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-3 sm:flex-row" action="/admin/products" method="GET">
            <Input
              name="q"
              placeholder="Digite o nome, código ou marca"
              defaultValue={query}
              className="flex-1"
            />
            <div className="flex gap-2">
              <Button type="submit">Buscar</Button>
              {query && (
                <Button type="button" variant="ghost" asChild>
                  <Link href="/admin/products">Limpar</Link>
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle>{mappedProducts.length} produto(s) encontrados</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <ProductTable products={mappedProducts} />
        </CardContent>
      </Card>
    </div>
  );
}
