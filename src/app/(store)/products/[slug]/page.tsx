import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { AddToCartButton } from "@/components/cart/add-to-cart-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getProductBySlug, getProducts } from "@/lib/data";
import { formatCurrency } from "@/lib/formatters";

type Props = {
  params: { slug: string };
};

export default async function ProductDetailPage({ params }: Props) {
  const product = await getProductBySlug(params.slug);
  if (!product) {
    notFound();
  }

  const related = await getProducts({
    categorySlug: product.category?.slug ?? undefined,
  });

  return (
    <div className="space-y-10">
      <div className="grid gap-8 rounded-[32px] border bg-white p-6 shadow-sm lg:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-3xl border bg-zinc-100">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
              Imagem indisponível
            </div>
          )}
        </div>
        <div className="space-y-6">
          <div className="space-y-2">
            <Badge variant="outline" className="rounded-full px-3">
              {product.category?.name ?? "TopCell"}
            </Badge>
            <h1 className="text-3xl font-semibold text-zinc-900">{product.name}</h1>
            <p className="text-sm text-muted-foreground">{product.description}</p>
          </div>
          <div>
            <p className="text-4xl font-semibold text-zinc-900">{formatCurrency(product.price)}</p>
            {product.compareAtPrice && (
              <p className="text-sm text-muted-foreground line-through">
                {formatCurrency(product.compareAtPrice)}
              </p>
            )}
          </div>
          {product.highlights?.length ? (
            <ul className="list-inside list-disc space-y-2 text-sm text-muted-foreground">
              {product.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : null}
          <div className="grid gap-2 sm:grid-cols-2">
            <AddToCartButton product={product} />
            <Button asChild variant="outline" className="w-full">
              <Link href="/checkout">Orçamento rápido</Link>
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Estoque em Taquarituba/SP • Retirada no mesmo dia ou envio nacional.
          </p>
        </div>
      </div>

      {related.length > 1 && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                Complementos
              </p>
              <h2 className="text-xl font-semibold text-zinc-900">Produtos relacionados</h2>
            </div>
            <Button asChild variant="ghost">
              <Link href={`/products?categoria=${product.category?.slug}`}>Ver categoria</Link>
            </Button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related
              .filter((item) => item.id !== product.id)
              .slice(0, 3)
              .map((item) => (
                <div key={item.id} className="rounded-3xl border bg-white p-4">
                  <p className="text-sm font-semibold">{item.name}</p>
                  <Separator className="my-3" />
                  <p className="text-lg font-semibold">{formatCurrency(item.price)}</p>
                  <Button asChild variant="link" className="px-0 text-sm">
                    <Link href={`/products/${item.slug}`}>Ver detalhes</Link>
                  </Button>
                </div>
              ))}
          </div>
        </section>
      )}
    </div>
  );
}
