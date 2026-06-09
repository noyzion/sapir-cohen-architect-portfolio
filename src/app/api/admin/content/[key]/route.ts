import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { CONTENT_KEYS, getContentByKey, type ContentKey } from "@/lib/content";
import { SITE_CONTENT_TAG, storeSet } from "@/lib/store";

export const runtime = "nodejs";

function isContentKey(value: string): value is ContentKey {
  return (CONTENT_KEYS as readonly string[]).includes(value);
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ key: string }> }
) {
  const { key } = await params;
  if (!isContentKey(key)) {
    return NextResponse.json({ error: "Unknown content key" }, { status: 404 });
  }
  const data = await getContentByKey(key);
  return NextResponse.json({ data });
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ key: string }> }
) {
  const { key } = await params;
  if (!isContentKey(key)) {
    return NextResponse.json({ error: "Unknown content key" }, { status: 404 });
  }
  const body = (await req.json().catch(() => null)) as { data?: unknown } | null;
  if (!body || body.data === undefined) {
    return NextResponse.json({ error: "Missing data" }, { status: 400 });
  }
  try {
    await storeSet(key, body.data);
    revalidateTag(SITE_CONTENT_TAG);
    return NextResponse.json({ ok: true });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to save content";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
