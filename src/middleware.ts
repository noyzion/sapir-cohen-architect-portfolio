import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  DEFAULT_LOCALE,
  pathnameHasLocale,
} from "@/lib/i18n";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/session";

function withAdminRobotsTag(response: NextResponse): NextResponse {
  response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  return response;
}

function withLocaleHeader(response: NextResponse, locale: string): NextResponse {
  response.headers.set("x-locale", locale);
  return response;
}

async function handleAdmin(req: NextRequest): Promise<NextResponse> {
  const { pathname } = req.nextUrl;

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

function handleI18n(req: NextRequest): NextResponse {
  const { pathname } = req.nextUrl;

  if (pathnameHasLocale(pathname)) {
    const locale = pathname.split("/")[1] ?? DEFAULT_LOCALE;
    return withLocaleHeader(NextResponse.next(), locale);
  }

  const locale = DEFAULT_LOCALE;
  const url = req.nextUrl.clone();
  url.pathname =
    pathname === "/" ? `/${locale}` : `/${locale}${pathname}`;
  return NextResponse.redirect(url);
}

function shouldSkipI18n(pathname: string): boolean {
  return (
    pathname.startsWith("/api/") ||
    pathname.startsWith("/_next/") ||
    pathname === "/favicon.ico" ||
    /\.[^/]+$/.test(pathname)
  );
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/admin") || pathname.startsWith("/api/admin")) {
    return handleAdmin(req);
  }

  if (shouldSkipI18n(pathname)) {
    return NextResponse.next();
  }

  return handleI18n(req);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
