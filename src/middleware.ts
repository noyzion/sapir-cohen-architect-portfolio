import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/session";

function withAdminRobotsTag(response: NextResponse): NextResponse {
  response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  return response;
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Login page + login endpoint + health check must stay public.
  if (
    pathname === "/admin/login" ||
    pathname === "/api/admin/login" ||
    pathname === "/api/admin/logout" ||
    pathname === "/api/admin/health" ||
    pathname === "/api/admin/session"
  ) {
    return withAdminRobotsTag(NextResponse.next());
  }

  const token = req.cookies.get(SESSION_COOKIE)?.value;
  if (await verifySessionToken(token)) {
    return withAdminRobotsTag(NextResponse.next());
  }

  if (pathname.startsWith("/api/")) {
    return withAdminRobotsTag(
      NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    );
  }

  const url = req.nextUrl.clone();
  url.pathname = "/admin/login";
  url.searchParams.set("from", pathname);
  return withAdminRobotsTag(NextResponse.redirect(url));
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
