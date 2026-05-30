import "server-only";
import { promises as fs } from "fs";
import path from "path";
import { unstable_noStore as noStore } from "next/cache";
import { Redis } from "@upstash/redis";

/**
 * Tiny key/value document store for editable site content.
 *
 * - Production: Upstash Redis (env vars added by the Vercel integration).
 *   Supports both UPSTASH_* and KV_* variable names.
 * - Local development / no Redis configured: a JSON file at ./.data/content.json
 *   so editing works locally without any cloud setup.
 */

const KEY_PREFIX = "content:";
const DATA_FILE = path.join(process.cwd(), ".data", "content.json");

let redisClient: Redis | null = null;

function getRedis(): Redis | null {
  const url =
    process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL ?? "";
  const token =
    process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN ?? "";
  if (!url || !token) return null;
  if (!redisClient) redisClient = new Redis({ url, token });
  return redisClient;
}

export function storeMode(): "redis" | "file" {
  return getRedis() ? "redis" : "file";
}

async function fileReadAll(): Promise<Record<string, unknown>> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf8");
    return JSON.parse(raw) as Record<string, unknown>;
  } catch {
    return {};
  }
}

async function fileWriteAll(map: Record<string, unknown>): Promise<void> {
  await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(map, null, 2), "utf8");
}

export async function storeGet<T>(key: string): Promise<T | null> {
  // Reading editable content opts pages out of static caching so edits show up.
  noStore();
  const redis = getRedis();
  if (redis) {
    const value = await redis.get<T>(KEY_PREFIX + key);
    return value ?? null;
  }
  const all = await fileReadAll();
  return (all[key] as T) ?? null;
}

export async function storeSet<T>(key: string, value: T): Promise<void> {
  const redis = getRedis();
  if (redis) {
    await redis.set(KEY_PREFIX + key, value);
    return;
  }
  const all = await fileReadAll();
  all[key] = value;
  await fileWriteAll(all);
}
