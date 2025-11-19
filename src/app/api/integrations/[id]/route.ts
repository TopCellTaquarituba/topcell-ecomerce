import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

import { getAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { integrationSchema } from "@/lib/validators";

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
    const data = integrationSchema.parse(payload);
    const integration = await prisma.integration.update({
      where: { id },
      data,
    });
    return NextResponse.json({ integration });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ message: "Dados inválidos", issues: error.flatten() }, { status: 400 });
    }
    console.error("Erro integração update", error);
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
    await prisma.integration.delete({
      where: { id },
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Erro integração delete", error);
    return NextResponse.json({ message: "Erro interno" }, { status: 500 });
  }
}
