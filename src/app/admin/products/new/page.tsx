import { ProductForm } from "@/components/forms/product-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";

export default async function AdminNewProductPage() {
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-wide text-muted-foreground">Catálogo</p>
        <h1 className="text-3xl font-semibold text-zinc-900">Cadastrar novo produto</h1>
        <p className="text-sm text-muted-foreground">
          Complete todos os campos para integrar corretamente com o Bling e demais sistemas.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Informações do produto</CardTitle>
        </CardHeader>
        <CardContent>
          <ProductForm
            categories={categories.map((category) => ({
              id: category.id,
              name: category.name,
            }))}
          />
        </CardContent>
      </Card>
    </div>
  );
}
