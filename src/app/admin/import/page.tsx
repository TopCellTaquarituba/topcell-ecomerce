import Link from "next/link";
import { Plug, UploadCloud } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getBlingAuthUrl } from "@/lib/bling";

export default function ImportProductsPage() {
  const blingAuthUrl = getBlingAuthUrl();

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-wide text-muted-foreground">Integrações</p>
        <h1 className="text-3xl font-semibold text-zinc-900">Importar produtos</h1>
        <p className="text-sm text-muted-foreground">
          Utilize esta sessão para carregar planilhas do Bling ou de outros ERPs. Em breve a integração será automática.
        </p>
      </div>

      <Card>
        <CardHeader className="flex items-center gap-3">
          <Plug className="h-6 w-6 text-primary" />
          <div>
            <CardTitle>Conectar com Bling</CardTitle>
            <p className="text-sm text-muted-foreground">
              Gere tokens oficiais e sincronize seu catálogo automaticamente.
            </p>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-muted-foreground">
            Clique no botão para abrir o fluxo de autorização do Bling e conceder acesso à TopCell.
          </div>
          <Button asChild className="rounded-full" disabled={!blingAuthUrl}>
            {blingAuthUrl ? <Link href={blingAuthUrl}>Autorizar Bling</Link> : <span>Configure as variáveis BLING_*</span>}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex items-center gap-3">
          <UploadCloud className="h-6 w-6 text-primary" />
          <div>
            <CardTitle>Arquivo de importação</CardTitle>
            <p className="text-sm text-muted-foreground">
              Aceitamos arquivos CSV ou XLSX exportados do Bling com cabeçalho padronizado.
            </p>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input type="file" accept=".csv,.xlsx" />
          <Textarea
            rows={4}
            placeholder="Observações sobre o lote, exemplo: importar apenas produtos da marca X."
          />
          <Button className="rounded-full w-full sm:w-auto">Enviar arquivo</Button>
        </CardContent>
      </Card>
    </div>
  );
}
