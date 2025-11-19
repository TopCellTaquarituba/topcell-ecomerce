"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type Props = {
  categories: {
    id: string;
    name: string;
    slug: string;
    description?: string | null;
  }[];
};

export function CategoryTable({ categories }: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const remove = (id: string) =>
    startTransition(async () => {
      await fetch(`/api/categories/${id}`, { method: "DELETE" });
      router.refresh();
    });

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nome</TableHead>
          <TableHead>Slug</TableHead>
          <TableHead className="text-right">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {categories.map((category) => (
          <TableRow key={category.id}>
            <TableCell>
              <div>
                <p className="font-medium">{category.name}</p>
                <p className="text-xs text-muted-foreground">{category.description}</p>
              </div>
            </TableCell>
            <TableCell>{category.slug}</TableCell>
            <TableCell className="text-right">
              <Button
                variant="ghost"
                size="icon"
                disabled={pending}
                onClick={() => remove(category.id)}
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
