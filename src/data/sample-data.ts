import { ProductStatus } from "@prisma/client";

export const sampleCategories = [
  {
    id: "smartphones",
    name: "Produtos para celular",
    slug: "smartphones",
    description: "Smartphones, cases, películas e gadgets de produtividade.",
  },
  {
    id: "perifericos",
    name: "Periféricos",
    slug: "perifericos",
    description: "Teclados, monitores, hubs USB-C e mais.",
  },
  {
    id: "bebidas",
    name: "Bebidas",
    slug: "bebidas",
    description: "Energéticos e cafés selecionados para o dia corrido.",
  },
];

export const sampleProducts = [
  {
    id: "iphone-15-pro",
    name: "iPhone 15 Pro 256GB",
    slug: "iphone-15-pro",
    description: "Todo o poder da Apple geração 2024 com acabamento em titânio.",
    shortDescription: "Smartphone top de linha",
    highlights: ["Tela 6.1\" ProMotion", "Câmera 48MP", "USB-C"],
    image:
      "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800&auto=format&fit=crop&q=80",
    gallery: [],
    price: 9999.9,
    compareAtPrice: 10499.9,
    stock: 4,
    status: ProductStatus.PUBLISHED,
    category: {
      slug: "smartphones",
      name: "Produtos para celular",
    },
    isFeatured: true,
  },
  {
    id: "galaxy-s24-ultra",
    name: "Galaxy S24 Ultra",
    slug: "galaxy-s24-ultra",
    description: "Tela ampla, caneta S Pen e recursos de IA nativos Samsung.",
    shortDescription: "Desempenho e produtividade sem limites.",
    highlights: ["S Pen", "IA Galaxy", "200MP"],
    image:
      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=800&auto=format&fit=crop&q=80",
    gallery: [],
    price: 8999.9,
    compareAtPrice: 9499.9,
    stock: 8,
    status: ProductStatus.PUBLISHED,
    category: {
      slug: "smartphones",
      name: "Produtos para celular",
    },
    isFeatured: true,
  },
  {
    id: "teclado-topcell",
    name: "Teclado Mecânico RGB TopCell",
    slug: "teclado-topcell",
    description: "Switch brown lubrificado e keycaps em PBT para digitação confortável.",
    shortDescription: "Para gamers e criadores.",
    highlights: ["Hot-swap", "USB-C", "Layout ABNT2"],
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80",
    gallery: [],
    price: 649.9,
    stock: 10,
    status: ProductStatus.PUBLISHED,
    category: {
      slug: "perifericos",
      name: "Periféricos",
    },
    isFeatured: true,
  },
];

export const sampleBanners = [
  {
    id: "assistencia",
    title: "Assistência técnica TopCell",
    description: "Troca de tela, upgrades e consultoria express em Taquarituba.",
  },
  {
    id: "corporativo",
    title: "Projetos corporativos",
    description: "Integrações com APIs, estoque dedicado e logística integrada.",
  },
];

export const sampleSite = {
  heroTitle: "Tecnologia, bebidas e eletros no coração de Taquarituba",
  heroSubtitle:
    "TopCell conecta smartphones, periféricos, bebidas funcionais e serviços de integração.",
  heroHighlight: "Retire na Rua Centro, 529 • CEP 18740-019",
  contactEmail: "topcelltaquarituba@gmail.com",
  contactPhone: "14 99622-8136",
  addressLine: "Rua Centro, 529 - Taquarituba/SP",
  city: "Taquarituba",
  state: "SP",
  postalCode: "18740-019",
  bannerCta: "Chamar no WhatsApp",
  whatsapp: "5514996228136",
  storeHours: "Seg a Sex 9h-18h • Sábado 9h-13h",
  shippingInfo: "Envios nacionais e retirada expressa em Taquarituba.",
  returnPolicy: "Trocas em até 7 dias com nota fiscal e embalagem original.",
};
