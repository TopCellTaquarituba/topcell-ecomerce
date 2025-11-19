import { Role } from "@prisma/client";
import { SignJWT, jwtVerify } from "jose";

const SESSION_COOKIE = "topcell_session";
const SESSION_DURATION = 60 * 60 * 8; // 8 hours

const encoder = new TextEncoder();

const getSecret = () => {
  const secret = process.env.AUTH_SECRET ?? "topcell-demo-secret";
  return encoder.encode(secret);
};

export type SessionPayload = {
  sub: string;
  role: Role;
  email?: string;
  name?: string;
};

export async function encryptSession(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DURATION}s`)
    .sign(getSecret());
}

export async function decryptSession(token: string) {
  try {
    const { payload } = await jwtVerify(token, getSecret());
    return payload as SessionPayload;
  } catch {
    return null;
  }
}

export function sessionCookieName() {
  return SESSION_COOKIE;
}

export function sessionMaxAge() {
  return SESSION_DURATION;
}
