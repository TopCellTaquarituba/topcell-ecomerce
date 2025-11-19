import { Prisma, ProductStatus } from "@prisma/client";

import { sampleBanners, sampleCategories, sampleProducts, sampleSite } from "@/data/sample-data";
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
  try {
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

    if (!products.length) {
      return sampleProducts;
    }

    return products.map(mapProduct);
  } catch (error) {
    console.warn("Falling back to sample products", error);
    return sampleProducts;
  }
}

export async function getProductBySlug(slug: string) {
  try {
    const product = await prisma.product.findUnique({
      where: { slug },
      include: { category: true, prices: { include: { priceList: true } } },
    });

    if (!product) {
      return sampleProducts.find((item) => item.slug === slug) ?? null;
    }

    return mapProduct(product);
  } catch (error) {
    console.warn("Falling back to sample product", error);
    return sampleProducts.find((item) => item.slug === slug) ?? null;
  }
}

export async function getCategories() {
  try {
    const items = await prisma.category.findMany({
      orderBy: { name: "asc" },
    });
    if (!items.length) return sampleCategories;
    return items;
  } catch (error) {
    console.warn("Falling back to sample categories", error);
    return sampleCategories;
  }
}

export async function getSiteSettings() {
  try {
    const site = await prisma.siteSetting.findUnique({
      where: { id: 1 },
      include: { banners: true, integrations: true },
    });

    if (!site) {
      return {
        ...sampleSite,
        banners: sampleBanners,
        integrations: [],
      };
    }

    return site;
  } catch (error) {
    console.warn("Falling back to sample site settings", error);
    return {
      ...sampleSite,
      banners: sampleBanners,
      integrations: [],
    };
  }
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
  } catch {
    return {
      productCount: sampleProducts.length,
      categoryCount: sampleCategories.length,
      orderCount: 0,
    };
  }
}
