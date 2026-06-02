import { SignJWT } from "jose/jwt/sign";
import { jwtVerify } from "jose/jwt/verify";

/**
 * Edge-compatible session helpers (no node-only or next/headers imports) so
 * this module can be used from both middleware and route handlers.
 */

export const SESSION_COOKIE = "sapir_admin";
const ALG = "HS256";
const MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days

/** Strip whitespace and optional surrounding quotes from env values. */
function normalizeEnvValue(value: string | undefined): string {
  let normalized = (value ?? "").trim();
  if (
    (normalized.startsWith('"') && normalized.endsWith('"')) ||
    (normalized.startsWith("'") && normalized.endsWith("'"))
  ) {
    normalized = normalized.slice(1, -1);
  }
  return normalized;
}

export function getAdminPassword(): string {
  return normalizeEnvValue(process.env.ADMIN_PASSWORD);
}

function getSessionSecret(): string {
  const secret = normalizeEnvValue(process.env.ADMIN_SESSION_SECRET);
  if (!secret) throw new Error("ADMIN_SESSION_SECRET is not set");
  return secret;
}

/** Short hash so sessions invalidate when ADMIN_PASSWORD changes. Edge-safe. */
export async function getPasswordRevision(): Promise<string> {
  const password = getAdminPassword();
  if (!password) return "";
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(password)
  );
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("")
    .slice(0, 16);
}

function getSecret(): Uint8Array {
  return new TextEncoder().encode(getSessionSecret());
}

export function isAdminConfigured(): boolean {
  return Boolean(getAdminPassword() && normalizeEnvValue(process.env.ADMIN_SESSION_SECRET));
}

export async function createSessionToken(): Promise<string> {
  return new SignJWT({ role: "admin", pwdRev: await getPasswordRevision() })
    .setProtectedHeader({ alg: ALG })
    .setIssuedAt()
    .setExpirationTime(`${MAX_AGE_SECONDS}s`)
    .sign(getSecret());
}

export async function verifySessionToken(
  token: string | undefined | null
): Promise<boolean> {
  if (!token) return false;
  if (!normalizeEnvValue(process.env.ADMIN_SESSION_SECRET)) return false;
  try {
    const { payload } = await jwtVerify(token, getSecret());
    const expectedRevision = await getPasswordRevision();
    if (!expectedRevision) return false;
    if (payload.pwdRev !== expectedRevision) return false;
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
