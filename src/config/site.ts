export const siteConfig = {
  name: "TopCell",
  description:
    "TopCell é a loja completa de eletrônicos em Taquarituba com smartphones, periféricos, bebidas funcionais e eletro inteligentes.",
  address: {
    street: "Rua Centro, 529",
    city: "Taquarituba",
    state: "SP",
    postalCode: "18740-019",
  },
  contact: {
    email: "topcelltaquarituba@gmail.com",
    phone: "14 99622-8136",
    whatsapp: "5514996228136",
  },
  locationLabel: "Centro • Taquarituba",
  heroHighlights: [
    "Assistência Técnica Especializada",
    "Retirada expressa no Centro 529",
    "Integrações com APIs de pagamento e logística",
  ],
  collections: [
    { slug: "smartphones", label: "Produtos para celular" },
    { slug: "perifericos", label: "Periféricos para informática" },
    { slug: "bebidas", label: "Bebidas e lifestyle" },
    { slug: "eletrodomesticos", label: "Eletrodomésticos" },
    { slug: "cuidados-pessoais", label: "Cuidados pessoais" },
  ],
  social: [
    { title: "Instagram", href: "https://instagram.com" },
    { title: "WhatsApp", href: "https://wa.me/5514996228136" },
  ],
};

export type SiteConfig = typeof siteConfig;
