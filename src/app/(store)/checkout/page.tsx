import { Metadata } from "next";

import { CheckoutForm } from "@/components/forms/checkout-form";

export const metadata: Metadata = {
  title: "Checkout",
};

export default function CheckoutPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-wide text-muted-foreground">Finalizar compra</p>
        <h1 className="text-3xl font-semibold text-zinc-900">Checkout TopCell</h1>
      </div>
      <CheckoutForm />
    </div>
  );
}
