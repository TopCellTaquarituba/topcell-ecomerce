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

  const cookieStore = cookies();
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

export function destroySessionCookie() {
  const cookieStore = cookies();
  cookieStore.delete(sessionCookieName());
}

export async function getSessionUser() {
  const cookieStore = cookies();
  const token = cookieStore.get(sessionCookieName());
  if (!token) {
    return null;
  }

  const payload = await decryptSession(token.value);
  if (!payload?.sub) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: { id: payload.sub },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  });

  return user;
}

export async function getAdminSession() {
  const user = await getSessionUser();
  if (!user || user.role !== Role.ADMIN) {
    return null;
  }
  return user;
}
