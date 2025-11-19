import { NextResponse } from "next/server";
import { ZodError } from "zod";

import { createSessionCookie, verifyPassword } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { loginSchema } from "@/lib/validators";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const data = loginSchema.parse(payload);

    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Credenciais inválidas" },
        {
          status: 401,
        },
      );
    }

    const isValid = await verifyPassword(data.password, user.password);
    if (!isValid) {
      return NextResponse.json({ message: "Credenciais inválidas" }, { status: 401 });
    }

    await createSessionCookie(user);

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ message: "Dados inválidos", issues: error.flatten() }, { status: 400 });
    }
    console.error("Erro login", error);
    return NextResponse.json({ message: "Erro interno" }, { status: 500 });
  }
}
