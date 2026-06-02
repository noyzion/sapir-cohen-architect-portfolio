import { SignJWT } from "jose/jwt/sign";
import { jwtVerify } from "jose/jwt/verify";

/**
 * Edge-compatible session helpers (no node-only or next/headers imports) so
 * this module can be used from both middleware and route handlers.
 */

export const SESSION_COOKIE = "sapir_admin";
const ALG = "HS256";
const MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days

export function getAdminPassword(): string {
  return (process.env.ADMIN_PASSWORD ?? "").trim();
}

function getSessionSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET?.trim();
  if (!secret) throw new Error("ADMIN_SESSION_SECRET is not set");
  return secret;
}

function getSecret(): Uint8Array {
  return new TextEncoder().encode(getSessionSecret());
}

export function isAdminConfigured(): boolean {
  return Boolean(getAdminPassword() && process.env.ADMIN_SESSION_SECRET?.trim());
}

export async function createSessionToken(): Promise<string> {
  return new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: ALG })
    .setIssuedAt()
    .setExpirationTime(`${MAX_AGE_SECONDS}s`)
    .sign(getSecret());
}

export async function verifySessionToken(
  token: string | undefined | null
): Promise<boolean> {
  if (!token) return false;
  if (!process.env.ADMIN_SESSION_SECRET) return false;
  try {
    await jwtVerify(token, getSecret());
    return true;
  } catch {
    return false;
  }
}

/** Constant-time-ish comparison to avoid trivial timing leaks. */
export function checkPassword(input: string): boolean {
  const expected = getAdminPassword();
  if (!expected || input.length !== expected.length) return false;
  let mismatch = 0;
  for (let i = 0; i < expected.length; i++) {
    mismatch |= input.charCodeAt(i) ^ expected.charCodeAt(i);
  }
  return mismatch === 0;
}

export const SESSION_MAX_AGE = MAX_AGE_SECONDS;
