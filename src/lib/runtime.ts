/** True when running on Vercel (server or client with NEXT_PUBLIC_VERCEL_URL). */
export function isVercelDeployment(): boolean {
  return Boolean(
    process.env.VERCEL ||
      process.env.VERCEL_ENV ||
      process.env.NEXT_PUBLIC_VERCEL_URL
  );
}

/** Local filesystem writes (public/uploads, .data) are dev-only. */
export function canUseLocalFilesystem(): boolean {
  return !isVercelDeployment();
}
