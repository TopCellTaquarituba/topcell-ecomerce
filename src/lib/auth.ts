import { cookies } from "next/headers";
import { compare, hash } from "bcryptjs";
import { Role } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import {
  decryptSession,
  encryptSession,
  sessionCookieName,
  sessionMaxAge,
} from "@/lib/session";

export async function hashPassword(password: string) {
  return hash(password, 10);
}

export async function verifyPassword(password: string, hashed: string) {
  return compare(password, hashed);
}

export async function createSessionCookie(user: {
  id: string;
  email: string;
  name: string;
  role: Role;
}) {
  const token = await encryptSession({
    sub: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  });

  const cookieStore = await cookies();
  cookieStore.set({
    name: sessionCookieName(),
    value: token,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: sessionMaxAge(),
    path: "/",
  });
}

export async function destroySessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(sessionCookieName());
}

export async function getSessionUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get(sessionCookieName());
  if (!token) {
    return null;
  }

  const payload = await decryptSession(token.value);
  if (!payload?.sub) {
    return null;
  }

  const fallbackUser = {
    id: String(payload.sub),
    name: payload.name ?? "Administrador TopCell",
    email: payload.email ?? "admin@topcell.com.br",
    role: payload.role ?? Role.ADMIN,
  };

  if (!process.env.DATABASE_URL) {
    return fallbackUser;
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: payload.sub },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    return user ?? fallbackUser;
  } catch (error) {
    console.warn("Não foi possível recuperar usuário do banco, usando fallback.", error);
    return fallbackUser;
  }
}

export async function getAdminSession() {
  const user = await getSessionUser();
  if (!user || user.role !== Role.ADMIN) {
    return null;
  }
  return user;
}
