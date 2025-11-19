import { NextResponse } from "next/server";
import { ZodError } from "zod";

import { getAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { integrationSchema } from "@/lib/validators";

export async function GET() {
  const integrations = await prisma.integration.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ integrations });
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
  }

  try {
    const payload = await request.json();
    const data = integrationSchema.parse(payload);
    const integration = await prisma.integration.create({
      data: {
        ...data,
        siteSettingId: 1,
      },
    });
    return NextResponse.json({ integration }, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ message: "Dados inválidos", issues: error.flatten() }, { status: 400 });
    }
    console.error("Erro integração", error);
    return NextResponse.json({ message: "Erro interno" }, { status: 500 });
  }
}
