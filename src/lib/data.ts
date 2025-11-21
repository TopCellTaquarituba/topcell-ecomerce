import { Prisma, ProductStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export type CommerceProduct = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  shortDescription: string | null;
  highlights: string[];
  image: string | null;
  gallery: string[];
  price: number;
  compareAtPrice?: number | null;
  stock: number;
  category?: {
    id?: string;
    slug?: string | null;
    name?: string | null;
  } | null;
  status: ProductStatus;
  isFeatured: boolean;
};

const decimalToNumber = (value: Prisma.Decimal | string | number | null | undefined) => {
  if (!value) return null;
  if (value instanceof Prisma.Decimal) {
    return Number(value.toString());
  }
  return Number(value);
};

const mapProduct = (
  product: Prisma.ProductGetPayload<{ include: { category: true } }>,
): CommerceProduct => ({
  id: product.id,
  name: product.name,
  slug: product.slug,
  description: product.description,
  shortDescription: product.shortDescription ?? null,
  highlights: product.highlights,
  image: product.image,
  gallery: product.gallery,
  price: decimalToNumber(product.price) ?? 0,
  compareAtPrice: decimalToNumber(product.compareAtPrice),
  stock: product.stock,
  category: product.category
    ? { id: product.category.id, name: product.category.name, slug: product.category.slug }
    : undefined,
  status: product.status,
  isFeatured: product.isFeatured,
});

export async function getProducts(options?: { categorySlug?: string; featuredOnly?: boolean }) {
  const products = await prisma.product.findMany({
    where: {
      status: ProductStatus.PUBLISHED,
      ...(options?.featuredOnly ? { isFeatured: true } : {}),
      ...(options?.categorySlug
        ? {
            category: {
              slug: options.categorySlug,
            },
          }
        : {}),
    },
    include: {
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return products.map(mapProduct);
}

export async function getProductBySlug(slug: string) {
  const product = await prisma.product.findUnique({
    where: { slug },
    include: { category: true, prices: { include: { priceList: true } } },
  });

  if (!product) {
    return null;
  }

  return mapProduct(product);
}

export async function getCategories() {
  const items = await prisma.category.findMany({
    orderBy: { name: "asc" },
  });
  return items;
}

export async function getSiteSettings() {
  const site = await prisma.siteSetting.findUnique({
    where: { id: 1 },
    include: { banners: true, integrations: true },
  });
  return site;
}

export async function getDashboardSummary() {
  try {
    const [productCount, categoryCount, orderCount] = await Promise.all([
      prisma.product.count(),
      prisma.category.count(),
      prisma.order.count(),
    ]);

    return {
      productCount,
      categoryCount,
      orderCount,
    };
  } catch (error) {
    console.error("Erro ao buscar resumo do dashboard", error);
    return {
      productCount: 0,
      categoryCount: 0,
      orderCount: 0,
    };
  }
}
