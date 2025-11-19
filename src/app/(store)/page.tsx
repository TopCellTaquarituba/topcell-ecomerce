import Link from "next/link";
import { BatteryCharging, Plug, ShoppingCart } from "lucide-react";

import { siteConfig } from "@/config/site";
import { CategoryPill } from "@/components/categories/category-pill";
import { ProductCard } from "@/components/products/product-card";
import { BannerGrid } from "@/components/site/banner-grid";
import { InfoGrid } from "@/components/site/info-grid";
import { IntegrationList } from "@/components/site/integration-list";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getCategories, getProducts, getSiteSettings } from "@/lib/data";

export default async function HomePage() {
  const [site, categories, products, featuredProducts] = await Promise.all([
    getSiteSettings(),
    getCategories(),
    getProducts({}),
    getProducts({ featuredOnly: true }),
  ]);

  const heroStats = [
    { label: "Produtos ativos", value: products.length },
    { label: "Categorias", value: categories.length },
    { label: "Entrega express", value: "Taquarituba • SP" },
  ];

  return (
    <div className="space-y-16">
      <section className="grid gap-8 rounded-[40px] border bg-gradient-to-br from-white to-zinc-50 px-6 py-10 md:grid-cols-[1.1fr_0.9fr] md:px-10">
        <div className="space-y-6">
          <Badge className="bg-black text-white">TopCell Taquarituba</Badge>
          <h1 className="text-3xl font-semibold leading-tight text-zinc-900 md:text-4xl">
            {site?.heroTitle ?? "Tecnologia minimalista em Taquarituba"}
          </h1>
          <p className="text-base text-muted-foreground md:text-lg">
            {site?.heroSubtitle ??
              "Produtos para celular, periféricos, bebidas especiais e eletrodomésticos conectados em um lugar só."}
          </p>
          <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
            {siteConfig.heroHighlights.map((highlight) => (
              <span key={highlight} className="rounded-full border px-4 py-1">
                {highlight}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg" className="gap-2 rounded-full px-6">
              <Link href="/products">
                <ShoppingCart className="h-4 w-4" />
                Ver catálogo
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full border-black px-6 text-black"
            >
              <Link href={`https://wa.me/${siteConfig.contact.whatsapp}`}>
                Conversar com especialista
              </Link>
            </Button>
          </div>
          <dl className="grid gap-4 sm:grid-cols-3">
            {heroStats.map((stat) => (
              <div key={stat.label} className="rounded-3xl border px-4 py-3">
                <dt className="text-xs text-muted-foreground">{stat.label}</dt>
                <dd className="text-2xl font-semibold text-zinc-900">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="rounded-[32px] border bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            Soluções rápidas
          </p>
          <InfoGrid
            items={[
              {
                icon: BatteryCharging,
                title: "Assistência e upgrades",
                description: "Troca de telas, migração de dados e reparos em até 24h.",
              },
              {
                icon: Plug,
                title: "Integração APIs",
                description: "Consultoria para integrar Neon DB, pagamentos e hubs logísticos.",
              },
            ]}
          />
          <div className="mt-6 rounded-2xl border bg-zinc-950 px-5 py-6 text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
              Localização
            </p>
            <p className="text-lg font-semibold">{siteConfig.address.street}</p>
            <p className="text-sm text-zinc-300">
              {siteConfig.address.city} - {siteConfig.address.state} • CEP {siteConfig.address.postalCode}
            </p>
          </div>
        </div>
      </section>

      <section id="categorias" className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Categorias</p>
            <h2 className="text-2xl font-semibold text-zinc-900">Escolha o universo ideal</h2>
          </div>
          <Button asChild variant="ghost">
            <Link href="/products">Ver tudo</Link>
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

      <section id="produtos" className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Destaques</p>
            <h2 className="text-2xl font-semibold text-zinc-900">Escolhas TopCell</h2>
          </div>
          <Button asChild variant="ghost">
            <Link href="/products?tipo=destaques">Catálogo completo</Link>
          </Button>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {featuredProducts.slice(0, 3).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Loja completa</p>
            <h2 className="text-2xl font-semibold text-zinc-900">Novidades</h2>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.slice(0, 6).map((product) => (
            <ProductCard key={`list-${product.id}`} product={product} />
          ))}
        </div>
      </section>

      <section id="servicos" className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Serviços</p>
            <h2 className="text-2xl font-semibold text-zinc-900">Experiências guiadas</h2>
          </div>
        </div>
        <BannerGrid banners={site?.banners ?? []} />
      </section>

      <section className="grid gap-8 lg:grid-cols-[0.6fr_0.4fr]">
        <div className="space-y-4 rounded-3xl border bg-white p-6 shadow-sm">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            Integrações e APIs externas
          </p>
          <h3 className="text-2xl font-semibold text-zinc-900">
            Expandimos seu projeto com conectores oficiais
          </h3>
          <p className="text-sm text-muted-foreground">
            Configure gateways de pagamento, bancos de dados serverless, logística inteligente e
            notificações personalizadas dentro do painel TopCell. Tudo administrado em minutos.
          </p>
          <IntegrationList items={site?.integrations ?? []} />
        </div>
        <div className="space-y-4 rounded-3xl border bg-white p-6 shadow-sm">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">Contato direto</p>
          <h3 className="text-xl font-semibold text-zinc-900">Atendimento personalizado</h3>
          <div className="space-y-2 text-sm">
            <p>Email: {site?.contactEmail}</p>
            <p>Telefone: {site?.contactPhone}</p>
            <p>
              Endereço: {site?.addressLine} • {site?.city} - {site?.state}
            </p>
            <p>CEP: {site?.postalCode}</p>
          </div>
          <Button asChild className="w-full rounded-full">
            <Link href="/checkout">Iniciar pedido rápido</Link>
          </Button>
        </div>
      </section>

      <section className="rounded-3xl border bg-zinc-900 p-6 text-white md:p-10">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">Retirada em loja</p>
          <h3 className="text-3xl font-semibold">Centro de Taquarituba</h3>
          <p className="text-sm text-zinc-300">
            Rua Centro, 529 • CEP 18740-019 • Whatsapp {site?.contactPhone}
          </p>
        </div>
        <div className="mt-6 grid gap-4 text-sm text-zinc-200 md:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
              Horários
            </p>
            <p>{site?.storeHours ?? "Seg a Sex 9h-18h • Sábado 9h-13h"}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
              Benefícios exclusivos
            </p>
            <ul className="list-inside list-disc space-y-1">
              <li>Checkout rápido integrado ao painel</li>
              <li>Integração Neon DB com Prisma</li>
              <li>Dashboard administrativo completo</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
