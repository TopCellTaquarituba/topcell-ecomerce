"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type PriceList = {
  id: string;
  name: string;
  description?: string | null;
  currency: string;
  isDefault: boolean;
};

type Props = {
  priceLists: PriceList[];
};

export function PriceListTable({ priceLists }: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const remove = (id: string) =>
    startTransition(async () => {
      await fetch(`/api/price-lists/${id}`, { method: "DELETE" });
      router.refresh();
    });

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nome</TableHead>
          <TableHead>Descrição</TableHead>
          <TableHead>Moeda</TableHead>
          <TableHead>Padrão</TableHead>
          <TableHead className="text-right">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {priceLists.map((priceList) => (
          <TableRow key={priceList.id}>
            <TableCell>{priceList.name}</TableCell>
            <TableCell className="text-sm text-muted-foreground">
              {priceList.description ?? "-"}
            </TableCell>
            <TableCell>{priceList.currency}</TableCell>
            <TableCell>{priceList.isDefault ? "Sim" : "Não"}</TableCell>
            <TableCell className="text-right">
              <Button
                variant="ghost"
                size="icon"
                disabled={pending}
                onClick={() => remove(priceList.id)}
              >
                <Trash2 className="h-4 w-4 text-red-500" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
