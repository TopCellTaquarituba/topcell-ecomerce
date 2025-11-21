"use client";

import { Minus, Plus, Trash2 } from "lucide-react";

import { useCart } from "@/hooks/use-cart";
import { useIsMounted } from "@/hooks/use-is-mounted";
import { formatCurrency } from "@/lib/formatters";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function CartItems() {
  const items = useCart((state) => state.items);
  const removeItem = useCart((state) => state.removeItem);
  const updateQuantity = useCart((state) => state.updateQuantity);
  const isMounted = useIsMounted();
  const safeItems = isMounted ? items : [];

  if (!isMounted) {
    return (
      <Card>
        <CardContent className="py-6 text-center text-sm text-muted-foreground">
          Carregando carrinho...
        </CardContent>
      </Card>
    );
  }

  if (safeItems.length === 0) {
    return (
      <Card>
        <CardContent className="py-6 text-center text-sm text-muted-foreground">
          Nenhum produto por aqui. Explore nossos destaques e adicione itens ao carrinho.
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {safeItems.map((item) => (
        <Card key={item.id}>
          <CardContent className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center">
            <div className="flex-1">
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-muted-foreground">{formatCurrency(item.price)}</p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-9 text-center text-sm">{item.quantity}</span>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="ml-auto h-8 w-8 text-muted-foreground"
              onClick={() => removeItem(item.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
