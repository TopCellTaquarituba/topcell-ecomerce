"use client";

import Link from "next/link";

import { useCart } from "@/hooks/use-cart";
import { useIsMounted } from "@/hooks/use-is-mounted";
import { formatCurrency } from "@/lib/formatters";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
  action?: React.ReactNode;
  showCheckoutLink?: boolean;
};

export function CartSummary({ action, showCheckoutLink = false }: Props) {
  const items = useCart((state) => state.items);
  const isMounted = useIsMounted();
  const safeItems = isMounted ? items : [];
  const total = safeItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Resumo</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Itens</span>
          <span>
            {safeItems.length} produto{safeItems.length === 1 ? "" : "s"}
          </span>
        </div>
        <div className="flex justify-between font-semibold">
          <span>Total</span>
          <span>{formatCurrency(total)}</span>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        {action}
        {showCheckoutLink && (
          <Button asChild variant="outline" className="w-full">
            <Link href="/checkout">Avançar para checkout</Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
