import { NextResponse } from "next/server";
import { ZodError } from "zod";

import { getAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { categorySchema } from "@/lib/validators";

export async function GET() {
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
  });
  return NextResponse.json({ categories });
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
  }

  try {
    const payload = await request.json();
    const data = categorySchema.parse(payload);
    const category = await prisma.category.create({
      data,
    });
    return NextResponse.json({ category }, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ message: "Dados inválidos", issues: error.flatten() }, { status: 400 });
    }
    console.error("Erro categoria", error);
    return NextResponse.json({ message: "Erro interno" }, { status: 500 });
  }
}
