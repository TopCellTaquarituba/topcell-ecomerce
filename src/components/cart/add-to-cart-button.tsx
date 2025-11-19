"use client";

import { useTransition } from "react";
import { Loader2, ShoppingBag } from "lucide-react";

import { useCart } from "@/hooks/use-cart";
import { CommerceProduct } from "@/lib/data";
import { Button } from "@/components/ui/button";

type Props = {
  product: CommerceProduct;
};

export function AddToCartButton({ product }: Props) {
  const addItem = useCart((state) => state.addItem);
  const [pending, startTransition] = useTransition();

  return (
    <Button
      onClick={() => startTransition(() => addItem(product))}
      className="w-full gap-2"
      disabled={pending}
    >
      {pending ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <>
          <ShoppingBag className="h-4 w-4" />
          <span>Adicionar</span>
        </>
      )}
    </Button>
  );
}
