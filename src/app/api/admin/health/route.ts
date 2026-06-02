import { NextResponse } from "next/server";
import { getBlobAccess } from "@/lib/blobAccess";
import { getAdminPassword, isAdminConfigured } from "@/lib/session";
import { storeMode } from "@/lib/store";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/** Non-secret diagnostics — shows what THIS server instance actually reads. */
export async function GET() {
  const vercelEnv = process.env.VERCEL_ENV;
  const isLocal =
    !vercelEnv && process.env.NODE_ENV !== "production";

  return NextResponse.json({
    /** production | preview | development | local */
    environment: vercelEnv ?? (isLocal ? "local" : "unknown"),
    host: process.env.VERCEL_URL ?? "localhost",
    isLocalDev: isLocal,
    admin: {
      configured: isAdminConfigured(),
      passwordSet: Boolean(getAdminPassword()),
      sessionSecretSet: Boolean(process.env.ADMIN_SESSION_SECRET?.trim()),
    },
    blob: {
      tokenSet: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
      storeIdSet: Boolean(process.env.BLOB_STORE_ID),
      webhookKeySet: Boolean(process.env.BLOB_WEBHOOK_PUBLIC_KEY),
      access: getBlobAccess(),
      partialConnection:
        Boolean(process.env.BLOB_STORE_ID) &&
        !process.env.BLOB_READ_WRITE_TOKEN,
    },
    contentStore: storeMode(),
    hint: isLocal
      ? "זו סביבת פיתוח מקומית — משתמשת ב-.env.local, לא ב-Vercel."
      : vercelEnv === "preview"
        ? "זו Preview deployment — משתמשת במשתני Preview ב-Vercel, לא Production."
        : "זו Production — משתמשת במשתני Production ב-Vercel.",
  });
}
