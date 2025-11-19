"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type Integration = {
  id: string;
  name: string;
  provider: string;
  type: string;
  baseUrl?: string | null;
};

type Props = {
  items: Integration[];
};

export function IntegrationTable({ items }: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const remove = (id: string) =>
    startTransition(async () => {
      await fetch(`/api/integrations/${id}`, { method: "DELETE" });
      router.refresh();
    });

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nome</TableHead>
          <TableHead>Fornecedor</TableHead>
          <TableHead>Tipo</TableHead>
          <TableHead>URL</TableHead>
          <TableHead className="text-right">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((integration) => (
          <TableRow key={integration.id}>
            <TableCell>{integration.name}</TableCell>
            <TableCell>{integration.provider}</TableCell>
            <TableCell>{integration.type}</TableCell>
            <TableCell className="truncate text-xs text-muted-foreground">
              {integration.baseUrl ?? "-"}
            </TableCell>
            <TableCell className="text-right">
              <Button
                variant="ghost"
                size="icon"
                disabled={pending}
                onClick={() => remove(integration.id)}
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
