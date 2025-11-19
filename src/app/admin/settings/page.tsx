import { SiteSettingsForm } from "@/components/forms/site-settings-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getSiteSettings } from "@/lib/data";

export default async function AdminSettingsPage() {
  const site = await getSiteSettings();

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-wide text-muted-foreground">Conteúdo</p>
        <h1 className="text-3xl font-semibold text-zinc-900">Configurações gerais</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Textos e contatos</CardTitle>
        </CardHeader>
        <CardContent>
          <SiteSettingsForm defaults={site ?? undefined} />
        </CardContent>
      </Card>
    </div>
  );
}
