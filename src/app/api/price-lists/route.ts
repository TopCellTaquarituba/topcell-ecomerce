import { NextResponse } from "next/server";
import { ZodError } from "zod";

import { getAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { priceListSchema } from "@/lib/validators";

export async function GET() {
  const priceLists = await prisma.priceList.findMany({
    include: { products: true },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ priceLists });
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
  }

  try {
    const payload = await request.json();
    const data = priceListSchema.parse(payload);
    const priceList = await prisma.priceList.create({
      data,
    });
    return NextResponse.json({ priceList }, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ message: "Dados inválidos", issues: error.flatten() }, { status: 400 });
    }
    console.error("Erro lista de preço", error);
    return NextResponse.json({ message: "Erro interno" }, { status: 500 });
  }
}
