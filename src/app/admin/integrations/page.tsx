import { IntegrationForm } from "@/components/forms/integration-form";
import { IntegrationTable } from "@/components/admin/integration-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";

export default async function AdminIntegrationsPage() {
  const integrations = await prisma.integration.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-wide text-muted-foreground">Integrações</p>
        <h1 className="text-3xl font-semibold text-zinc-900">APIs externas</h1>
      </div>
      <div className="grid gap-6 lg:grid-cols-[0.6fr_1.4fr]">
        <Card>
          <CardHeader>
            <CardTitle>Nova integração</CardTitle>
          </CardHeader>
          <CardContent>
            <IntegrationForm />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Integrações configuradas</CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <IntegrationTable items={integrations} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
