import Link from "next/link";
import { ArrowRight, CreditCard, ShieldCheck, ShoppingBag, Truck } from "lucide-react";

import { siteConfig } from "@/config/site";
import { CategoryPill } from "@/components/categories/category-pill";
import { ProductCard } from "@/components/products/product-card";
import { BannerGrid } from "@/components/site/banner-grid";
import { HeroCarousel } from "@/components/site/hero-carousel";
import { Button } from "@/components/ui/button";
import { getCategories, getProducts, getSiteSettings } from "@/lib/data";

const faqs = [
  {
    question: "Quais formas de pagamento aceitam?",
    answer: "Cartões de crédito, Pix e boleto via Mercado Pago com parcelamento.",
  },
  {
    question: "Posso retirar na loja física?",
    answer: "Sim. Selecione retirada ao finalizar o pedido e avisaremos quando estiver pronto.",
  },
  {
    question: "Como acompanho meu pedido?",
    answer: "Você receberá o código de rastreio por e-mail e WhatsApp assim que o pedido for enviado.",
  },
];

const supportHighlights = [
  {
    icon: ShoppingBag,
    title: "Curadoria premium",
    description: "Linha enxuta com os eletrônicos mais pedidos e garantia oficial.",
  },
  {
    icon: Truck,
    title: "Envio rápido",
    description: "Pedidos despachados em até 24h úteis para todo o Brasil.",
  },
  {
    icon: ShieldCheck,
    title: "Compra segura",
    description: "Plataforma protegida e integração completa com Mercado Pago.",
  },
  {
    icon: CreditCard,
    title: "Parcelamento fácil",
    description: "Até 12x no cartão ou pagamento à vista com Pix e boleto.",
  },
];

export default async function HomePage() {
  const [site, categories, products] = await Promise.all([
    getSiteSettings(),
    getCategories(),
    getProducts({}),
  ]);

  const heroBanners = site?.banners ?? [];
  const secondaryBanners = heroBanners.slice(1);
  const featuredProducts = products.filter((product) => product.isFeatured).slice(0, 4);
  const newProducts = products.slice(0, 6);

  return (
    <div className="space-y-16">
      <section className="space-y-6">
        <HeroCarousel
          banners={heroBanners}
          fallbackTitle={site?.heroTitle ?? "Seu e-commerce completo de eletrônicos"}
          fallbackSubtitle={
            site?.heroSubtitle ?? "Produtos originais, envio rápido e retirada em Taquarituba."
          }
        />
        <div className="grid gap-4 rounded-[32px] border bg-white p-6 shadow-sm sm:grid-cols-3">
          {[
            { label: "Produtos ativos", value: products.length },
            { label: "Categorias", value: categories.length },
            { label: "Envios", value: "Brasil inteiro" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">{stat.label}</p>
              <p className="text-2xl font-semibold text-zinc-900">{stat.value}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
          {siteConfig.heroHighlights.map((highlight) => (
            <span key={highlight} className="rounded-full border px-4 py-1">
              {highlight}
            </span>
          ))}
        </div>
      </section>

      <section id="categorias" className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Departamentos</p>
            <h2 className="text-2xl font-semibold text-zinc-900">Explore por categoria</h2>
          </div>
          <Button asChild variant="ghost" className="rounded-full">
            <Link href="/products">
              Ver catálogo
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <CategoryPill
              key={category.slug}
              name={category.name}
              slug={category.slug}
              description={category.description}
            />
          ))}
        </div>
      </section>

      <section className="rounded-[32px] border bg-white p-6 shadow-sm">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">Benefícios</p>
        <h2 className="text-2xl font-semibold text-zinc-900">Por que comprar na TopCell</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {supportHighlights.map((highlight) => (
            <div key={highlight.title} className="rounded-2xl border p-4">
              <highlight.icon className="h-8 w-8 text-primary" />
              <p className="mt-3 font-semibold text-zinc-900">{highlight.title}</p>
              <p className="text-sm text-muted-foreground">{highlight.description}</p>
            </div>
          ))}
        </div>
      </section>

      {featuredProducts.length > 0 && (
        <section className="space-y-6" id="destaques">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Destaques</p>
              <h2 className="text-2xl font-semibold text-zinc-900">Escolhas TopCell</h2>
            </div>
            <Button asChild variant="outline" className="rounded-full">
              <Link href="/products?ordenar=maior">Ver todos</Link>
            </Button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard key={`featured-${product.id}`} product={product} />
            ))}
          </div>
        </section>
      )}

      {newProducts.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Novidades</p>
              <h2 className="text-2xl font-semibold text-zinc-900">Chegaram agora</h2>
            </div>
            <Button asChild variant="ghost" className="rounded-full">
              <Link href="/products">Catálogo completo</Link>
            </Button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {newProducts.map((product) => (
              <ProductCard key={`new-${product.id}`} product={product} />
            ))}
          </div>
        </section>
      )}

      {secondaryBanners.length > 0 && (
        <section className="space-y-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Campanhas</p>
            <h2 className="text-2xl font-semibold text-zinc-900">Ofertas em destaque</h2>
          </div>
          <BannerGrid banners={secondaryBanners} />
        </section>
      )}

      <section id="sobre" className="grid gap-6 rounded-3xl border bg-white p-6 shadow-sm lg:grid-cols-[0.6fr_0.4fr]">
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">Sobre nós</p>
          <h3 className="text-2xl font-semibold text-zinc-900">{site?.heroTitle ?? "Nossa história"}</h3>
          <p className="text-sm text-muted-foreground">
            {site?.aboutBody ??
              "Somos um e-commerce independente localizado em Taquarituba, dedicado a oferecer os melhores eletrônicos com entrega rápida e atendimento humanizado."}
          </p>
          <p className="text-sm text-muted-foreground">
            {site?.mission ??
              "Nossa missão é facilitar o dia a dia com produtos confiáveis, suporte próximo e opções flexíveis de envio."}
          </p>
        </div>
        <div className="space-y-2 rounded-2xl border bg-zinc-50 p-4 text-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Endereço</p>
          <p>{site?.addressLine}</p>
          <p>
            {site?.city} - {site?.state} · CEP {site?.postalCode}
          </p>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mt-4">Atendimento</p>
          <p>{site?.storeHours ?? "Seg a Sex 9h-18h · Sábado 9h-13h"}</p>
        </div>
      </section>

      <section id="contato" className="rounded-3xl border bg-white p-6 shadow-sm">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">Contato direto</p>
          <h3 className="text-2xl font-semibold text-zinc-900">Fale conosco</h3>
        </div>
        <div className="mt-4 grid gap-6 md:grid-cols-2">
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Canais oficiais
            </h4>
            <p>Email: {site?.contactEmail}</p>
            <p>WhatsApp: {site?.contactPhone}</p>
            <div className="flex flex-wrap gap-2">
              <Button asChild className="rounded-full">
                <Link href={`https://wa.me/${siteConfig.contact.whatsapp}`}>Chamar no WhatsApp</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full">
                <Link href={`tel:${siteConfig.contact.phone.replace(/\D/g, "")}`}>Ligar agora</Link>
              </Button>
            </div>
          </div>
          <div className="space-y-3 rounded-2xl border bg-zinc-50 p-4">
            <h4 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Perguntas frequentes
            </h4>
            <div className="space-y-3 text-sm">
              {faqs.map((faq) => (
                <div key={faq.question}>
                  <p className="font-semibold text-zinc-900">{faq.question}</p>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
