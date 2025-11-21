"use client";

import { Printer } from "lucide-react";

import { Button } from "@/components/ui/button";

type LabelAddress = {
  line1?: string;
  city?: string;
  state?: string;
  postalCode?: string;
};

type LabelItem = {
  name: string;
  quantity: number;
};

type Props = {
  orderId: string;
  customerName: string;
  customerPhone?: string | null;
  integrationName?: string;
  address?: LabelAddress;
  items: LabelItem[];
};

export function PrintLabelButton({
  orderId,
  customerName,
  customerPhone,
  integrationName,
  address,
  items,
}: Props) {
  const handlePrint = () => {
    const printWindow = window.open("", "imprimir-etiqueta", "width=500,height=700");
    if (!printWindow) {
      return;
    }

    const itemsHtml = items
      .map(
        (item) =>
          `<li style="display:flex;justify-content:space-between;margin-bottom:4px;"><span>${item.name}</span><strong>x${item.quantity}</strong></li>`,
      )
      .join("");

    printWindow.document.write(`
      <html>
        <head>
          <title>Etiqueta ${orderId}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 16px; }
            h1 { font-size: 18px; margin-bottom: 4px; }
            h2 { font-size: 14px; margin: 12px 0 4px; }
            p, li { font-size: 12px; margin: 0; }
            .label { border: 1px dashed #000; padding: 16px; }
          </style>
        </head>
        <body>
          <div class="label">
            <h1>Envio - ${integrationName ?? "Parceiro logístico"}</h1>
            <p><strong>Pedido:</strong> ${orderId}</p>
            <h2>Destinatário</h2>
            <p>${customerName}</p>
            ${customerPhone ? `<p>Telefone: ${customerPhone}</p>` : ""}
            <h2>Endereço</h2>
            <p>${address?.line1 ?? ""}</p>
            <p>${address?.city ?? ""} - ${address?.state ?? ""}</p>
            <p>CEP ${address?.postalCode ?? ""}</p>
            <h2>Itens</h2>
            <ul style="list-style:none;padding:0;">${itemsHtml}</ul>
          </div>
          <script>
            window.print();
            setTimeout(() => window.close(), 300);
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <Button type="button" variant="outline" className="gap-2" onClick={handlePrint}>
      <Printer className="h-4 w-4" />
      Imprimir etiqueta
    </Button>
  );
}
