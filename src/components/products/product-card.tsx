import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

import { AddToCartButton } from "@/components/cart/add-to-cart-button";
import { formatCurrency } from "@/lib/formatters";
import { CommerceProduct } from "@/lib/data";

type Props = {
  product: CommerceProduct;
};

export function ProductCard({ product }: Props) {
  return (
    <div className="group flex h-full flex-col rounded-3xl border bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="relative mb-4 aspect-[4/3] overflow-hidden rounded-2xl bg-zinc-100">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(min-width: 768px) 300px, 100vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
            Sem imagem
          </div>
        )}
        {product.isFeatured && (
          <Badge className="absolute left-3 top-3 bg-black text-white">Destaque</Badge>
        )}
      </div>
      <div className="flex flex-1 flex-col">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{product.category?.name}</span>
          <span>Estoque: {product.stock}</span>
        </div>
        <Link href={`/products/${product.slug}`}>
          <h3 className="mt-2 text-lg font-semibold text-zinc-900">{product.name}</h3>
          <p className="text-sm text-muted-foreground">{product.shortDescription}</p>
        </Link>
        <div className="mt-4 flex flex-col gap-1">
          <div className="text-xl font-semibold text-zinc-900">{formatCurrency(product.price)}</div>
          {product.compareAtPrice && (
            <p className="text-xs text-muted-foreground line-through">
              {formatCurrency(product.compareAtPrice)}
            </p>
          )}
        </div>
        <div className="mt-4">
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
}
