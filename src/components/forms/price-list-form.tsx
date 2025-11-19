"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Resolver, useForm } from "react-hook-form";
import { toast } from "sonner";

import { priceListSchema, PriceListInput } from "@/lib/validators";
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
import { Checkbox } from "@/components/ui/checkbox";

type PriceListFormValues = Omit<PriceListInput, "isDefault" | "currency"> & {
  isDefault: boolean;
  currency: string;
};

export function PriceListForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const form = useForm<PriceListFormValues>({
    resolver: zodResolver(priceListSchema) as Resolver<PriceListFormValues>,
    defaultValues: {
      name: "",
      description: "",
      isDefault: false,
      currency: "BRL",
    },
  });

  const onSubmit = async (values: PriceListFormValues) => {
    try {
      setLoading(true);
      const response = await fetch("/api/price-lists", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!response.ok) {
        throw new Error("Erro ao registrar");
      }
      form.reset({
        name: "",
        description: "",
        isDefault: false,
        currency: "BRL",
      });
      toast.success("Lista de preço criada.");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Não foi possível salvar.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="Varejo padrão" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Input
                  placeholder="Uso geral"
                  value={field.value ?? ""}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  name={field.name}
                  ref={field.ref}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="currency"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Moeda</FormLabel>
              <FormControl>
                <Input placeholder="BRL" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isDefault"
          render={({ field }) => (
            <FormItem className="flex items-center gap-2 space-y-0 rounded-xl border px-3 py-2">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Definir como padrão</FormLabel>
                <p className="text-xs text-muted-foreground">
                  Será usada automaticamente no site.
                </p>
              </div>
            </FormItem>
          )}
        />
        <Button type="submit" disabled={loading}>
          {loading ? "Salvando..." : "Criar lista"}
        </Button>
      </form>
    </Form>
  );
}
