"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { useCart } from "@/hooks/use-cart";
import { checkoutSchema, CheckoutInput } from "@/lib/validators";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CartSummary } from "@/components/cart/cart-summary";

export function CheckoutForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const items = useCart((state) => state.items);
  const clear = useCart((state) => state.clear);

  const form = useForm<CheckoutInput>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      customerName: "",
      customerEmail: "",
      customerPhone: "",
      addressLine: "",
      city: "",
      state: "",
      postalCode: "",
      notes: "",
      items: [],
      total: 0,
    },
  });

  const onSubmit = async (values: CheckoutInput) => {
    if (!items.length) {
      toast.error("Adicione produtos ao carrinho antes de finalizar.");
      return;
    }

    try {
      setLoading(true);
      const payload = {
        ...values,
        items: items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        total: items.reduce((acc, item) => acc + item.price * item.quantity, 0),
      };

      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Erro ao registrar pedido");
      }

      clear();
      toast.success("Pedido registrado! Entraremos em contato rapidamente.");
      router.push("/");
    } catch (error) {
      console.error(error);
      toast.error("Não foi possível concluir o pedido.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6 rounded-3xl border bg-white p-6 shadow-sm">
          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Checkout seguro</p>
            <h2 className="text-2xl font-semibold text-zinc-900">Informações do comprador</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="customerName"
              render={({ field }) => (
                <FormItem className="sm:col-span-2">
                  <FormLabel>Nome completo</FormLabel>
                  <FormControl>
                    <Input placeholder="Seu nome" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="customerEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="e-mail@exemplo.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="customerPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefone/WhatsApp</FormLabel>
                  <FormControl>
                    <Input placeholder="(14) 99999-9999" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid gap-4">
            <FormField
              control={form.control}
              name="addressLine"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Endereço</FormLabel>
                  <FormControl>
                    <Input placeholder="Rua, número e complemento" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cidade</FormLabel>
                    <FormControl>
                      <Input placeholder="Cidade" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estado</FormLabel>
                    <FormControl>
                      <Input placeholder="UF" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="postalCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CEP</FormLabel>
                  <FormControl>
                    <Input placeholder="18740-019" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Observações</FormLabel>
                <FormControl>
                  <Textarea rows={4} placeholder="Acesse o prédio pelo portão lateral..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4 rounded-3xl border bg-white p-6 shadow-sm">
          <CartSummary
            action={
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Processando..." : "Enviar pedido"}
              </Button>
            }
          />
          <p className="text-xs text-muted-foreground">
            Após enviar o pedido, nossa equipe entrará em contato pelo WhatsApp informado para
            confirmar pagamento, frete e retirada.
          </p>
        </div>
      </form>
    </Form>
  );
}
