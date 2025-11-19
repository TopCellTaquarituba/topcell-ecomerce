import { IntegrationType } from "@prisma/client";
import { PlugZap } from "lucide-react";

type Integration = {
  id?: string;
  name: string;
  provider: string;
  type: IntegrationType;
  baseUrl?: string | null;
  active?: boolean | null;
};

type Props = {
  items: Integration[];
};

const typeLabel: Record<IntegrationType, string> = {
  [IntegrationType.CRM]: "CRM",
  [IntegrationType.ERP]: "ERP",
  [IntegrationType.OTHER]: "Custom",
  [IntegrationType.PAYMENTS]: "Pagamentos",
  [IntegrationType.SHIPPING]: "Logística",
};

export function IntegrationList({ items }: Props) {
  if (!items?.length) return null;

  return (
    <div className="space-y-3">
      {items.map((integration) => (
        <div
          key={integration.id ?? integration.name}
          className="flex items-center justify-between rounded-2xl border bg-white px-4 py-3 text-sm"
        >
          <div>
            <p className="font-semibold text-zinc-900">{integration.name}</p>
            <p className="text-xs text-muted-foreground">
              {typeLabel[integration.type]} • {integration.provider}
            </p>
          </div>
          <div className="flex items-center gap-1 text-emerald-600">
            <PlugZap className="h-4 w-4" />
            <span className="text-xs font-semibold uppercase tracking-wide">
              {integration.active === false ? "Inativo" : "Ativo"}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
