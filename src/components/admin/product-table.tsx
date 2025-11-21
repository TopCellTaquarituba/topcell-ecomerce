"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

import { formatCurrency } from "@/lib/formatters";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type ProductRow = {
  id: string;
  name: string;
  slug: string;
  sku?: string | null;
  brand?: string | null;
  price: number;
  stock: number;
  category?: string | null;
};

type Props = {
  products: ProductRow[];
};

export function ProductTable({ products }: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const remove = (id: string) =>
    startTransition(async () => {
      await fetch(`/api/products/${id}`, { method: "DELETE" });
      router.refresh();
    });

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Produto</TableHead>
          <TableHead>Código</TableHead>
          <TableHead>Marca</TableHead>
          <TableHead>Categoria</TableHead>
          <TableHead>Estoque</TableHead>
          <TableHead>Preço</TableHead>
          <TableHead className="text-right">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell>
              <div>
                <p className="font-medium">{product.name}</p>
                <p className="text-xs text-muted-foreground">{product.slug}</p>
              </div>
            </TableCell>
            <TableCell>{product.sku ?? "-"}</TableCell>
            <TableCell>{product.brand ?? "-"}</TableCell>
            <TableCell>{product.category ?? "-"}</TableCell>
            <TableCell>{product.stock}</TableCell>
            <TableCell>{formatCurrency(product.price)}</TableCell>
            <TableCell className="text-right">
              <Button
                variant="ghost"
                size="icon"
                className="text-red-500"
                disabled={pending}
                onClick={() => remove(product.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
