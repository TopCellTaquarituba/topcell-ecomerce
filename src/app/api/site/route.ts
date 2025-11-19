import { NextResponse } from "next/server";
import { ZodError } from "zod";

import { getAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { siteSettingsSchema } from "@/lib/validators";

export async function GET() {
  const site = await prisma.siteSetting.findUnique({
    where: { id: 1 },
    include: { banners: true, integrations: true },
  });
  return NextResponse.json({ site });
}

export async function PUT(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
  }

  try {
    const payload = await request.json();
    const data = siteSettingsSchema.parse(payload);

    const site = await prisma.siteSetting.upsert({
      where: { id: 1 },
      update: data,
      create: data,
    });

    return NextResponse.json({ site });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ message: "Dados inválidos", issues: error.flatten() }, { status: 400 });
    }
    console.error("Erro site settings", error);
    return NextResponse.json({ message: "Erro interno" }, { status: 500 });
  }
}
