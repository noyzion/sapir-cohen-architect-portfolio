import { NextResponse } from "next/server";
import {
  canUseClientBlobUpload,
  getBlobAccess,
  getBlobAuthMode,
  hasBlobReadWriteToken,
  hasBlobStoreId,
  hasVercelOidcToken,
  isBlobConfigured,
} from "@/lib/blobAccess";
import {
  getAdminPassword,
  getPasswordRevision,
  isAdminConfigured,
} from "@/lib/session";
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
      /** Changes after ADMIN_PASSWORD changes + redeploy — use to confirm Vercel picked up the new value. */
      passwordRevision: await getPasswordRevision(),
    },
    blob: {
      configured: isBlobConfigured(),
      authMode: getBlobAuthMode(),
      readWriteTokenSet: hasBlobReadWriteToken(),
      storeIdSet: hasBlobStoreId(),
      oidcTokenSet: hasVercelOidcToken(),
      clientUploadAvailable: canUseClientBlobUpload(),
      webhookKeySet: Boolean(process.env.BLOB_WEBHOOK_PUBLIC_KEY),
      access: getBlobAccess(),
    },
    contentStore: storeMode(),
    hint: isLocal
      ? "זו סביבת פיתוח מקומית — משתמשת ב-.env.local, לא ב-Vercel."
      : vercelEnv === "preview"
        ? "זו Preview deployment — משתמשת במשתני Preview ב-Vercel, לא Production."
        : "זו Production — משתמשת במשתני Production ב-Vercel.",
  });
}
