import { Prisma, PrismaClient, ProductStatus, Role, IntegrationType } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

const decimal = (value: number) => new Prisma.Decimal(value);

const categories = [
  {
    name: "Smartphones e Acessórios",
    slug: "smartphones",
    description:
      "Celulares, capinhas e soluciones para manter o seu smartphone protegido e atualizado.",
    heroImage:
      "https://images.unsplash.com/photo-1512412046876-f386342eddb3?w=800&auto=format&fit=crop&q=80",
  },
  {
    name: "Periféricos e Informática",
    slug: "perifericos",
    description:
      "Teclados, monitores, hubs e acessórios para montar um setup eficiente em casa ou no escritório.",
    heroImage:
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&auto=format&fit=crop&q=80",
  },
  {
    name: "Bebidas e Lifestyle",
    slug: "bebidas",
    description:
      "Energéticos, cafés especiais e itens que acompanham o ritmo acelerado dos nossos clientes.",
    heroImage:
      "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800&auto=format&fit=crop&q=80",
  },
  {
    name: "Eletrodomésticos Inteligentes",
    slug: "eletrodomesticos",
    description: "Soluções conectadas para casa, cozinha e cuidado diário.",
    heroImage:
      "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?w=800&auto=format&fit=crop&q=80",
  },
  {
    name: "Cuidados Pessoais",
    slug: "cuidados-pessoais",
    description:
      "Aparelhos de beleza, barbeadores, massageadores e outros produtos focados em bem-estar.",
    heroImage:
      "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=800&auto=format&fit=crop&q=80",
  },
];

const products = [
  {
    name: "iPhone 15 Pro 256GB Titânio Azul",
    slug: "iphone-15-pro-256gb",
    sku: "APL-IP15PRO-256",
    description:
      "Smartphone premium com chip A17 Pro, conjunto de câmeras profissionais e acabamento em titânio.",
    shortDescription: "Potência máxima para criadores exigentes.",
    highlights: ["Tela 6.1\" ProMotion", "Câmera tripla 48 MP", "USB-C", "Titanium Design"],
    price: 9999.9,
    compareAtPrice: 10499.9,
    stock: 6,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=1200&auto=format&fit=crop&q=80",
    ],
    category: "smartphones",
    status: ProductStatus.PUBLISHED,
    isFeatured: true,
  },
  {
    name: "Samsung Galaxy S24 Ultra 512GB",
    slug: "galaxy-s24-ultra",
    sku: "SMS-S24U-512",
    description:
      "O ecossistema Galaxy agora com IA integrada, caneta S Pen e câmera de 200 MP para criadores móveis.",
    shortDescription: "Velocidade e produtividade para o dia inteiro.",
    highlights: ["Tela 6.8\" 120Hz", "S Pen", "IA Galaxy", "Carregamento 45W"],
    price: 8999.9,
    compareAtPrice: 9499.9,
    stock: 10,
    image:
      "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1527693277587-93c89ff8a56d?w=1200&auto=format&fit=crop&q=80",
    ],
    category: "smartphones",
    status: ProductStatus.PUBLISHED,
    isFeatured: true,
  },
  {
    name: "Fone Bluetooth Noise Cancelling Pulse X",
    slug: "fone-bluetooth-pulse-x",
    sku: "PUL-FONE-ANC",
    description:
      "Headphone sem fio com cancelamento ativo de ruídos, até 30 horas de autonomia e modo game.",
    shortDescription: "Som cristalino para chamadas e entretenimento.",
    highlights: ["Bluetooth 5.3", "Multiponto", "Fone dobrável", "Estojo rígido"],
    price: 699.9,
    compareAtPrice: 799.9,
    stock: 25,
    image:
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1478810810369-07072c5c79ae?w=1200&auto=format&fit=crop&q=80",
    ],
    category: "smartphones",
    status: ProductStatus.PUBLISHED,
    isFeatured: true,
  },
  {
    name: "Teclado Mecânico RGB TopCell Switch Brown",
    slug: "teclado-mecanico-topcell",
    sku: "TPC-TCLD-RGB",
    description:
      "Layout ABNT2 compacto com keycaps em PBT e espuma acústica para digitação silenciosa.",
    shortDescription: "Ideal para produtividade e jogos.",
    highlights: ["Switch Brown", "Hot-swappable", "USB-C", "Software macOS/Windows"],
    price: 649.9,
    compareAtPrice: null,
    stock: 18,
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&auto=format&fit=crop&q=80",
    ],
    category: "perifericos",
    status: ProductStatus.PUBLISHED,
    isFeatured: true,
  },
  {
    name: "Monitor 27\" 4K Creator Display",
    slug: "monitor-27-4k",
    sku: "TPC-MON-27-4K",
    description:
      "Painel IPS calibrado com 99% sRGB, USB-C com 90W e modo de baixa luz azul.",
    shortDescription: "Pronto para edições precisas e dashboards corporativos.",
    highlights: ["HDR400", "Altura ajustável", "Hub USB", "Compatível VESA"],
    price: 2899.9,
    compareAtPrice: 3199.9,
    stock: 8,
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=1200&auto=format&fit=crop&q=80",
    ],
    category: "perifericos",
    status: ProductStatus.PUBLISHED,
    isFeatured: false,
  },
  {
    name: "Energy Drink TopFuel 350ml",
    slug: "energy-drink-topfuel",
    sku: "TPC-DRINK-350",
    description:
      "Formula exclusiva desenvolvida para revendedores, com sabor cítrico e vitaminas do complexo B.",
    shortDescription: "Energia para longos plantões.",
    highlights: ["Zero açúcar", "Com taurina", "Embalagem reciclável"],
    price: 11.9,
    compareAtPrice: 13.9,
    stock: 120,
    image:
      "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800&auto=format&fit=crop&q=80",
    gallery: [],
    category: "bebidas",
    status: ProductStatus.PUBLISHED,
    isFeatured: false,
  },
  {
    name: "Cafeteira Smart Pour Over",
    slug: "cafeteira-smart",
    sku: "TPC-CAFE-SMART",
    description:
      "Controle a extração pelo aplicativo, ajuste temperatura e agende o preparo diário.",
    shortDescription: "Sabor artesanal com automação.",
    highlights: ["App iOS/Android", "Bico gooseneck", "Carafe térmica"],
    price: 1599.9,
    compareAtPrice: 1799.9,
    stock: 5,
    image:
      "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&auto=format&fit=crop&q=80",
    gallery: [],
    category: "eletrodomesticos",
    status: ProductStatus.PUBLISHED,
    isFeatured: false,
  },
  {
    name: "Aspirador Robô TopCell Sense",
    slug: "aspirador-robo-sense",
    sku: "TPC-ROBO-SENSE",
    description:
      "Mapeamento LiDAR, base auto esvaziante e integração com assistentes de voz.",
    shortDescription: "Casa limpa sem esforço.",
    highlights: ["Autonomia 160min", "Compartimento 3L", "Sensores antiqueda"],
    price: 3299.9,
    compareAtPrice: 3599.9,
    stock: 4,
    image:
      "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?w=800&auto=format&fit=crop&q=80",
    gallery: [],
    category: "eletrodomesticos",
    status: ProductStatus.PUBLISHED,
    isFeatured: true,
  },
  {
    name: "Massageador Facial LED Glow",
    slug: "massageador-led-glow",
    sku: "TPC-CARE-GLOW",
    description:
      "Massagem sônica com terapia de luz vermelha para estimular colágeno e melhorar textura da pele.",
    shortDescription: "Auto cuidado inteligente.",
    highlights: ["Carregamento magnético", "3 intensidades", "A prova d'água"],
    price: 489.9,
    compareAtPrice: 549.9,
    stock: 30,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&auto=format&fit=crop&q=80",
    gallery: [],
    category: "cuidados-pessoais",
    status: ProductStatus.PUBLISHED,
    isFeatured: false,
  },
];

const priceLists = [
  {
    name: "Varejo Padrão",
    description: "Tabela utilizada no site e loja física TopCell.",
    isDefault: true,
  },
  {
    name: "Clube Parceiros",
    description: "Valores especiais para integradores e empresas.",
    isDefault: false,
  },
];

const banners = [
  {
    title: "Assistência técnica autorizada",
    description: "Troca de telas, upgrades e diagnósticos avançados em até 24h.",
    image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=1200&q=80&auto=format",
    buttonLabel: "Agendar suporte",
    buttonLink: "/#servicos",
  },
  {
    title: "Projetos corporativos",
    description: "Configuração de dispositivos e periféricos para times híbridos.",
    image: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=1200&q=80&auto=format",
    buttonLabel: "Falar com especialista",
    buttonLink: "/#corporativo",
  },
];

const integrations = [
  {
    name: "Neon DB",
    provider: "Neon",
    type: IntegrationType.ERP,
    baseUrl: "https://console.neon.tech",
    metadata: { description: "Banco de dados serverless para a loja." },
  },
  {
    name: "Gateway Pagamentos",
    provider: "Mercado Pago",
    type: IntegrationType.PAYMENTS,
    baseUrl: "https://www.mercadopago.com.br/developers",
    metadata: { sandbox: true },
  },
  {
    name: "Envios Inteligentes",
    provider: "Melhor Envio",
    type: IntegrationType.SHIPPING,
    baseUrl: "https://www.melhorenvio.com.br/",
    metadata: { service: "cotacao" },
  },
];

async function main() {
  console.log(">> Limpando base padrão");

  await prisma.banner.deleteMany();
  await prisma.integration.deleteMany();
  await prisma.productPrice.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.priceList.deleteMany();

  const adminPassword = await hash("topcell123", 10);

  await prisma.user.upsert({
    where: { email: "admin@topcell.com.br" },
    update: {},
    create: {
      name: "Administrador TopCell",
      email: "admin@topcell.com.br",
      password: adminPassword,
      phone: "14 99622-8136",
      role: Role.ADMIN,
    },
  });

  const setting = await prisma.siteSetting.upsert({
    where: { id: 1 },
    update: {},
    create: {
      heroTitle: "TopCell - tecnologia e cuidado em Taquarituba",
      heroSubtitle:
        "Oferecemos smartphones, periféricos, bebidas especiais e toda a linha de eletro presentes no dia a dia.",
      heroHighlight: "Atendimento humanizado no Centro, rua 529",
      heroImage:
        "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=1600&auto=format&fit=crop&q=80",
      aboutHeading: "Especialistas em eletrônicos e soluções digitais",
      aboutBody:
        "A TopCell nasceu para facilitar a vida conectada. Com curadoria de produtos, assistência técnica e integrações prontas para o seu negócio, entregamos velocidade e confiança.",
      mission: "Tecnologia acessível, suporte próximo e parcerias duradouras.",
      whatsapp: "5514996228136",
      bannerCta: "Chamar no WhatsApp",
      contactEmail: "topcelltaquarituba@gmail.com",
      contactPhone: "14 99622-8136",
      addressLine: "Rua Centro, 529",
      city: "Taquarituba",
      state: "SP",
      postalCode: "18740-019",
      storeHours: "Seg a Sex 9h-18h • Sábado 9h-13h",
      shippingInfo: "Envios para todo o Brasil com parceiros logísticos e retirada rápida em loja.",
      returnPolicy: "Trocas em até 7 dias com embalagem original e nota fiscal.",
    },
  });

  await prisma.banner.createMany({
    data: banners.map((banner) => ({
      ...banner,
      siteSettingId: setting.id,
    })),
  });

  await Promise.all(
    integrations.map((integration) =>
      prisma.integration.create({
        data: {
          ...integration,
          siteSettingId: setting.id,
        },
      }),
    ),
  );

  const priceListRecords = [];
  for (const priceList of priceLists) {
    const record = await prisma.priceList.create({
      data: {
        name: priceList.name,
        description: priceList.description,
        isDefault: priceList.isDefault,
      },
    });
    priceListRecords.push(record);
  }

  for (const category of categories) {
    await prisma.category.create({
      data: category,
    });
  }

  for (const product of products) {
    const category = await prisma.category.findUnique({
      where: { slug: product.category },
    });

    const created = await prisma.product.create({
      data: {
        name: product.name,
        slug: product.slug,
        sku: product.sku,
        description: product.description,
        shortDescription: product.shortDescription,
        highlights: product.highlights,
        image: product.image,
        gallery: product.gallery,
        price: decimal(product.price),
        compareAtPrice: product.compareAtPrice ? decimal(product.compareAtPrice) : undefined,
        stock: product.stock,
        isFeatured: product.isFeatured,
        status: product.status,
        categoryId: category?.id,
      },
    });

    for (const priceList of priceListRecords) {
      const factor = priceList.isDefault ? 1 : 0.95;
      await prisma.productPrice.create({
        data: {
          productId: created.id,
          priceListId: priceList.id,
          amount: decimal(product.price * factor),
        },
      });
    }
  }

  console.log("✅ Seed finalizado com sucesso");
}

main()
  .catch((error) => {
    console.error("Erro ao executar seed", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
