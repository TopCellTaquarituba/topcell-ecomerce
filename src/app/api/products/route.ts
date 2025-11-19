import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { ZodError } from "zod";

import { getAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { productSchema } from "@/lib/validators";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const featured = searchParams.get("featured") === "true";

  const products = await prisma.product.findMany({
    where: {
      ...(category ? { category: { slug: category } } : {}),
      ...(featured ? { isFeatured: true } : {}),
    },
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ products });
}

export async function POST(request: Request) {
  const user = await getAdminSession();
  if (!user) {
    return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
  }

  try {
    const payload = await request.json();
    const data = productSchema.parse(payload);

    const product = await prisma.product.create({
      data: {
        name: data.name,
        slug: data.slug,
        sku: data.sku ?? undefined,
        description: data.description,
        shortDescription: data.shortDescription,
        highlights: data.highlights ?? [],
        image: data.image ?? undefined,
        gallery: data.gallery ?? [],
        price: new Prisma.Decimal(data.price),
        compareAtPrice: data.compareAtPrice
          ? new Prisma.Decimal(data.compareAtPrice)
          : undefined,
        stock: data.stock,
        isFeatured: Boolean(data.isFeatured),
        status: data.status,
        categoryId: data.categoryId ?? undefined,
      },
    });

    return NextResponse.json({ product }, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ message: "Dados inválidos", issues: error.flatten() }, { status: 400 });
    }
    console.error("Erro ao criar produto", error);
    return NextResponse.json({ message: "Erro interno" }, { status: 500 });
  }
}
