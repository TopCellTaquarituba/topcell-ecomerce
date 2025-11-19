import { CategoryForm } from "@/components/forms/category-form";
import { CategoryTable } from "@/components/admin/category-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";

export default async function AdminCategoriesPage() {
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-wide text-muted-foreground">Catálogo</p>
        <h1 className="text-3xl font-semibold text-zinc-900">Categorias</h1>
      </div>
      <div className="grid gap-6 lg:grid-cols-[0.6fr_1.4fr]">
        <Card>
          <CardHeader>
            <CardTitle>Novo grupo</CardTitle>
          </CardHeader>
          <CardContent>
            <CategoryForm />
          </CardContent>
        </Card>
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle>Categorias cadastradas</CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <CategoryTable categories={categories} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
