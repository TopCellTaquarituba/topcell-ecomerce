import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { ZodError } from "zod";

import { getAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { productSchema } from "@/lib/validators";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function PATCH(request: NextRequest, context: RouteContext) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
  }

  try {
    const { id } = await context.params;
    const payload = await request.json();
    const data = productSchema.parse(payload);

    const product = await prisma.product.update({
      where: { id },
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

    return NextResponse.json({ product });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ message: "Dados inválidos", issues: error.flatten() }, { status: 400 });
    }
    console.error("Erro ao atualizar produto", error);
    return NextResponse.json({ message: "Erro interno" }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, context: RouteContext) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
  }

  try {
    const { id } = await context.params;
    await prisma.product.delete({
      where: { id },
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Erro ao remover produto", error);
    return NextResponse.json({ message: "Erro interno" }, { status: 500 });
  }
}
