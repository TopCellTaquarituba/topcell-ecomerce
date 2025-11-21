"use client";

import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Resolver, useForm } from "react-hook-form";
import { toast } from "sonner";

import { productSchema, ProductInput } from "@/lib/validators";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

type CategoryOption = {
  id: string;
  name: string;
};

type Props = {
  categories: CategoryOption[];
};

const readFileAsDataUrl = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

export function ProductForm({ categories }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imageLink, setImageLink] = useState("");
  const form = useForm<ProductInput>({
    resolver: zodResolver(productSchema) as Resolver<ProductInput>,
    defaultValues: {
      name: "",
      slug: "",
      description: "",
      shortDescription: "",
      price: 0,
      stock: 0,
      categoryId: "",
      isFeatured: false,
      highlights: [],
      status: "PUBLISHED",
      image: "",
      gallery: [],
      compareAtPrice: undefined,
    },
  });

  const gallery = form.watch("gallery") ?? [];
  const coverImage = form.watch("image") ?? "";

  const onSubmit = async (values: ProductInput) => {
    try {
      setLoading(true);
      const response = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Erro ao salvar");
      }

      form.reset();
      toast.success("Produto cadastrado com sucesso.");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Não foi possível salvar o produto.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddImageLink = () => {
    const link = imageLink.trim();
    if (!link) return;
    const nextGallery = [...gallery, link];
    form.setValue("gallery", nextGallery, { shouldDirty: true });
    if (!coverImage) {
      form.setValue("image", link, { shouldDirty: true });
    }
    setImageLink("");
  };

  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);
    if (!files.length) return;
    try {
      const encoded = await Promise.all(files.map(readFileAsDataUrl));
      const nextGallery = [...gallery, ...encoded];
      form.setValue("gallery", nextGallery, { shouldDirty: true });
      if (!coverImage && encoded[0]) {
        form.setValue("image", encoded[0], { shouldDirty: true });
      }
    } finally {
      event.target.value = "";
    }
  };

  const removeImage = (url: string) => {
    const nextGallery = gallery.filter((item) => item !== url);
    form.setValue("gallery", nextGallery, { shouldDirty: true });
    if (coverImage === url) {
      form.setValue("image", nextGallery[0] ?? "", { shouldDirty: true });
    }
  };

  const setCover = (url: string) => {
    form.setValue("image", url, { shouldDirty: true });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <input type="hidden" {...form.register("image")} value={coverImage ?? ""} />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="Produto" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug</FormLabel>
              <FormControl>
                <Input placeholder="produto-topcell" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid gap-4 sm:grid-cols-3">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preço</FormLabel>
                <FormControl>
                  <Input type="number" step="0.01" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="stock"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estoque</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="compareAtPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preço promocional</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="Valor riscado"
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
        </div>
        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categoria</FormLabel>
              <Select onValueChange={field.onChange} value={field.value ?? ""}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="shortDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição curta</FormLabel>
              <FormControl>
                <Input
                  placeholder="Resumo"
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
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição completa</FormLabel>
              <FormControl>
                <Textarea
                  rows={4}
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
          name="gallery"
          render={() => (
            <FormItem>
              <FormLabel>Imagens do produto</FormLabel>
              <div className="space-y-3 rounded-2xl border bg-muted/40 p-4">
                <div className="flex flex-col gap-2 sm:flex-row">
                  <Input
                    placeholder="https://..."
                    value={imageLink}
                    onChange={(event) => setImageLink(event.target.value)}
                  />
                  <Button type="button" onClick={handleAddImageLink} disabled={!imageLink.trim()}>
                    Adicionar link
                  </Button>
                </div>
                <Input type="file" multiple accept="image/*" onChange={handleFileUpload} />
                <p className="text-xs text-muted-foreground">
                  Envie arquivos locais ou cole URLs (CDN, Google Drive, etc). Use o botão abaixo para definir a capa.
                </p>
                {gallery.length === 0 ? (
                  <p className="rounded-xl border border-dashed px-4 py-6 text-center text-sm text-muted-foreground">
                    Nenhuma imagem adicionada.
                  </p>
                ) : (
                  <div className="grid gap-3 md:grid-cols-2">
                    {gallery.map((url) => (
                      <div key={url} className="rounded-2xl border bg-white p-3">
                        <div className="relative h-32 w-full overflow-hidden rounded-xl bg-muted">
                          <Image src={url} alt="" fill sizes="150px" className="object-cover" unoptimized />
                        </div>
                        <div className="mt-2 flex flex-wrap gap-2">
                          <Button
                            type="button"
                            size="sm"
                            variant={coverImage === url ? "default" : "secondary"}
                            onClick={() => setCover(url)}
                          >
                            {coverImage === url ? "Imagem de capa" : "Definir como capa"}
                          </Button>
                          <Button type="button" size="sm" variant="ghost" onClick={() => removeImage(url)}>
                            Remover
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={loading}>
          {loading ? "Salvando..." : "Cadastrar produto"}
        </Button>
      </form>
    </Form>
  );
}
