import { Metadata } from "next";
import Link from "next/link";

import { siteConfig } from "@/config/site";
import { ProductCard } from "@/components/products/product-card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getCategories, getProducts } from "@/lib/data";

export const metadata: Metadata = {
  title: "Produtos",
};

type Props = {
  searchParams: {
    categoria?: string;
    marca?: string;
    ordenar?: string;
  };
};

export default async function ProductsPage({ searchParams }: Props) {
  const [categories, allProducts] = await Promise.all([getCategories(), getProducts({})]);

  const brands = Array.from(
    new Set(allProducts.map((product) => product.name.split(" ")[0] ?? "TopCell")),
  ).sort((a, b) => a.localeCompare(b));

  let products = allProducts;

  if (searchParams.categoria) {
    products = products.filter((product) => product.category?.slug === searchParams.categoria);
  }

  if (searchParams.marca) {
    products = products.filter((product) =>
      product.name.toLowerCase().startsWith(searchParams.marca!.toLowerCase()),
    );
  }

  if (searchParams.ordenar === "maior") {
    products = [...products].sort((a, b) => b.price - a.price);
  } else if (searchParams.ordenar === "menor") {
    products = [...products].sort((a, b) => a.price - b.price);
  }

  return (
    <div className="space-y-8">
      <section className="rounded-[32px] border bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground">TopCell</p>
            <h1 className="text-3xl font-semibold text-zinc-900">Catálogo completo</h1>
            <p className="text-sm text-muted-foreground">
              Produtos selecionados com envio imediato e opção de retirada em {siteConfig.address.city}.
            </p>
          </div>
          <Button asChild className="rounded-full">
            <Link href="/checkout">Montar orçamento</Link>
          </Button>
        </div>
        <Separator className="my-4" />
        <p className="text-sm text-muted-foreground">
          Use os filtros abaixo para encontrar o dispositivo ideal. Os departamentos e marcas são gerenciados pelo
          painel admin.
        </p>
      </section>

      <section className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <aside className="rounded-3xl border bg-white p-4 shadow-sm">
          <form className="space-y-4" method="GET">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Departamento</p>
              <select
                name="categoria"
                defaultValue={searchParams.categoria ?? ""}
                className="w-full rounded-2xl border px-3 py-2 text-sm"
              >
                <option value="">Todos</option>
                {categories.map((category) => (
                  <option key={category.slug} value={category.slug}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Marca</p>
              <select
                name="marca"
                defaultValue={searchParams.marca ?? ""}
                className="w-full rounded-2xl border px-3 py-2 text-sm"
              >
                <option value="">Todas</option>
                {brands.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Ordenar</p>
              <select
                name="ordenar"
                defaultValue={searchParams.ordenar ?? ""}
                className="w-full rounded-2xl border px-3 py-2 text-sm"
              >
                <option value="">Mais recentes</option>
                <option value="menor">Menor preço</option>
                <option value="maior">Maior preço</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <Button type="submit" className="rounded-full">
                Aplicar filtros
              </Button>
              <Button asChild variant="ghost" className="rounded-full">
                <Link href="/products">Limpar</Link>
              </Button>
            </div>
          </form>
        </aside>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Resultados</p>
              <h2 className="text-xl font-semibold text-zinc-900">
                {products.length} produto{products.length === 1 ? "" : "s"}
              </h2>
            </div>
            {searchParams.categoria && (
              <div className="rounded-full border px-3 py-1 text-sm">
                Departamento: {searchParams.categoria}
              </div>
            )}
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
