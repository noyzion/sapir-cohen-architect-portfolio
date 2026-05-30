import { NextResponse } from "next/server";
import {
  SESSION_COOKIE,
  SESSION_MAX_AGE,
  checkPassword,
  createSessionToken,
  isAdminConfigured,
} from "@/lib/session";

export const runtime = "nodejs";

export async function POST(req: Request) {
  if (!isAdminConfigured()) {
    return NextResponse.json(
      {
        error:
          "האזור האישי אינו מוגדר. יש להגדיר ADMIN_PASSWORD ו-ADMIN_SESSION_SECRET.",
      },
      { status: 500 }
    );
  }

  const body = (await req.json().catch(() => null)) as
    | { password?: unknown }
    | null;
  const password = body?.password;

  if (typeof password !== "string" || !checkPassword(password)) {
    return NextResponse.json({ error: "סיסמה שגויה" }, { status: 401 });
  }

  const token = await createSessionToken();
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
  return res;
}
