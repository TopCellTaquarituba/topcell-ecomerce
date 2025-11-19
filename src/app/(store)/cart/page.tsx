import { Metadata } from "next";

import { CartItems } from "@/components/cart/cart-items";
import { CartSummary } from "@/components/cart/cart-summary";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Carrinho",
};

export default function CartPage() {
  return (
    <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="space-y-4">
        <div>
          <p className="text-xs uppercase tracking-wide text-muted-foreground">TopCell</p>
          <h1 className="text-3xl font-semibold text-zinc-900">Seu carrinho</h1>
        </div>
        <CartItems />
      </div>
      <CartSummary
        showCheckoutLink
        action={
          <Button asChild className="w-full">
            <a href="/checkout">Concluir pedido</a>
          </Button>
        }
      />
    </div>
  );
}
