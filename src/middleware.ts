import { NextRequest, NextResponse } from "next/server";

const publicPrefixes = [
  "/",
  "/login",
  "/not-found",
  "/signup",
  "/auth",
  "/waitings",
  "/menus",
  "/device",
  "/create",
  "/stores",
];

const deviceRequiredPrefixes = ["/pos", "/hall", "/waiting"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const permission = req.cookies.get("permission")?.value;

  const isPublic = publicPrefixes.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );
  const isDeviceRequired = deviceRequiredPrefixes.some((prefix) =>
    pathname.startsWith(prefix)
  );

  // 공개 페이지는 통과
  if (isPublic || isDeviceRequired) {
    return NextResponse.next();
  }

  // 권한별 접근 제한
  if (permission === "USER") {
    if (!pathname.startsWith("/main")) {
      const referer = req.headers.get("referer");
      if (referer) {
        return NextResponse.redirect(new URL(referer));
      }
      return NextResponse.redirect(new URL("/main", req.url));
    }
  }

  if (permission === "ADMIN") {
    if (!pathname.startsWith("/admin")) {
      const referer = req.headers.get("referer");
      if (referer) {
        return NextResponse.redirect(new URL(referer));
      }
      return NextResponse.redirect(new URL("/admin/users", req.url));
    }
  }

  if (permission === "OWNER") {
    if (!pathname.match(/^\/(\d+)(\/.*)?$/)) {
      const referer = req.headers.get("referer");
      if (referer) {
        return NextResponse.redirect(new URL(referer));
      }
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // 정적/이미지/아이콘/스크립트/API 등 제외
    "/((?!_next/static|_next/image|favicon.ico|logo\\.svg|apple-touch-icon\\.png|icon-\\d+x\\d+\\.png|manifest\\.webmanifest|images|fonts|scripts|robots\\.txt|sitemap\\.xml|api).*)",
  ],
};
