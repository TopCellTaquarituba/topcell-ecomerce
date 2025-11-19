import { NextResponse } from "next/server";
import { ZodError } from "zod";

import { Role } from "@prisma/client";
import { PrismaClientInitializationError } from "@prisma/client/runtime/library";
import { createSessionCookie, verifyPassword } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { loginSchema } from "@/lib/validators";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const data = loginSchema.parse(payload);

    const fallbackEmail = process.env.FALLBACK_ADMIN_EMAIL ?? "admin@topcell.com.br";
    const fallbackPassword = process.env.FALLBACK_ADMIN_PASSWORD ?? "topcell123";
    const fallbackName = process.env.FALLBACK_ADMIN_NAME ?? "Administrador TopCell";

    let useFallbackAuth = !process.env.DATABASE_URL;
    let user: {
      id: string;
      email: string;
      name: string;
      password: string;
      role: Role;
    } | null = null;

    if (!useFallbackAuth) {
      user = await prisma.user
        .findUnique({
          where: { email: data.email },
        })
        .catch((error) => {
          if (error instanceof PrismaClientInitializationError) {
            console.warn("Prisma indisponível, usando fallback de login.");
            useFallbackAuth = true;
            return null;
          }
          throw error;
        });
    }

    if (!user) {
      if (data.email === fallbackEmail && data.password === fallbackPassword) {
        const fallbackUser = {
          id: "fallback-admin",
          email: fallbackEmail,
          name: fallbackName,
          role: Role.ADMIN,
        };
        await createSessionCookie(fallbackUser);
        return NextResponse.json({ user: fallbackUser });
      }

      return NextResponse.json({ message: "Credenciais inválidas" }, { status: 401 });
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
