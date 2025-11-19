import { Metadata } from "next";
import Link from "next/link";

import { siteConfig } from "@/config/site";
import { ProductCard } from "@/components/products/product-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getCategories, getProducts } from "@/lib/data";

export const metadata: Metadata = {
  title: "Produtos",
};

type Props = {
  searchParams: {
    categoria?: string;
  };
};

export default async function ProductsPage({ searchParams }: Props) {
  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts({
      categorySlug: searchParams.categoria,
    }),
  ]);

  return (
    <div className="space-y-8">
      <section className="rounded-[32px] border bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground">TopCell</p>
            <h1 className="text-3xl font-semibold text-zinc-900">Catálogo completo</h1>
            <p className="text-sm text-muted-foreground">
              Produtos selecionados e assistência com estoque em {siteConfig.address.city}.
            </p>
          </div>
          <Button asChild className="rounded-full">
            <Link href="/checkout">Montar orçamento</Link>
          </Button>
        </div>
        <Separator className="my-4" />
        <div className="flex flex-wrap gap-3 text-sm">
          <Link
            href="/products"
            className={`rounded-full border px-4 py-1 ${
              !searchParams.categoria ? "border-black bg-black text-white" : ""
            }`}
          >
            Todos
          </Link>
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/products?categoria=${category.slug}`}
              className={`rounded-full border px-4 py-1 ${
                searchParams.categoria === category.slug ? "border-black bg-black text-white" : ""
              }`}
            >
              {category.name}
            </Link>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Resultados</p>
            <h2 className="text-xl font-semibold text-zinc-900">
              {products.length} produto{products.length === 1 ? "" : "s"}
            </h2>
          </div>
          {searchParams.categoria && (
            <Badge variant="secondary">Filtrado por {searchParams.categoria}</Badge>
          )}
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
