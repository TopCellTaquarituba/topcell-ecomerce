import { NextResponse } from "next/server";
import { ZodError } from "zod";

import { getAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { priceListSchema } from "@/lib/validators";

type Params = {
  params: { id: string };
};

export async function PATCH(request: Request, { params }: Params) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
  }

  try {
    const payload = await request.json();
    const data = priceListSchema.parse(payload);
    const priceList = await prisma.priceList.update({
      where: { id: params.id },
      data,
    });
    return NextResponse.json({ priceList });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ message: "Dados inválidos", issues: error.flatten() }, { status: 400 });
    }
    console.error("Erro lista de preço update", error);
    return NextResponse.json({ message: "Erro interno" }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
  }

  try {
    await prisma.priceList.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Erro lista de preço delete", error);
    return NextResponse.json({ message: "Erro interno" }, { status: 500 });
  }
}
