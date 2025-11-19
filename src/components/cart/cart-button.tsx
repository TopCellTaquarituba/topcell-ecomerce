"use client";

import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";

import { useCart } from "@/hooks/use-cart";
import { formatCurrency } from "@/lib/formatters";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function CartButton() {
  const items = useCart((state) => state.items);
  const removeItem = useCart((state) => state.removeItem);
  const updateQuantity = useCart((state) => state.updateQuantity);
  const total = items.reduce((acc, item) => acc + item.quantity * item.price, 0);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="relative gap-2 px-3 text-sm font-medium">
          <ShoppingBag className="h-5 w-5" />
          <span>Carrinho</span>
          {items.length > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
              {items.reduce((acc, item) => acc + item.quantity, 0)}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col gap-4 sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Seu carrinho</SheetTitle>
          <SheetDescription>
            Produtos selecionados na TopCell. Os preços são apresentados em Reais.
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 space-y-4 overflow-y-auto">
          {items.length === 0 && (
            <p className="text-sm text-muted-foreground">
              Nenhum item por aqui. Explore os destaques de smartphones, periféricos ou bebidas
              funcionais.
            </p>
          )}
          {items.map((item) => (
            <div key={item.id} className="flex gap-3 rounded-xl border p-3">
              <div className="flex-1">
                <p className="text-sm font-semibold">{item.name}</p>
                <p className="text-xs text-muted-foreground">{formatCurrency(item.price)}</p>
                <div className="mt-2 flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-8 text-center text-sm">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="ml-auto h-8 w-8 text-muted-foreground"
                    onClick={() => removeItem(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Remover</span>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <SheetFooter className="flex flex-col gap-2">
          <div className="flex items-center justify-between text-sm font-medium">
            <span>Total</span>
            <span>{formatCurrency(total)}</span>
          </div>

          <Button asChild className="w-full">
            <Link href="/checkout">Finalizar pedido</Link>
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
