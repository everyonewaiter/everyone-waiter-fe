import { NextRequest, NextResponse } from "next/server";

const publicPrefixes = [
  "/login",
  "/not-found",
  "/signup",
  "/auth",
  "/waitings",
  "/menus",
];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const accessToken = req.cookies.get("accessToken")?.value;
  const permission = req.cookies.get("permission")?.value;

  const isPublic = publicPrefixes.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );

  if (isPublic) {
    return NextResponse.next();
  }

  if (!permission || !accessToken) {
    return NextResponse.next();
  }

  // NOTE: userPaths 외 접근 제한
  if (permission === "USER" && !accessToken) {
    return NextResponse.redirect(new URL("/main", req.url));
  }

  // NOTE: 관리자 페이지 외 접근 제한
  if (permission === "ADMIN" && !accessToken) {
    return NextResponse.redirect(new URL("/admin/users", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // 정적/이미지/아이콘/스크립트/API 등 제외
    "/((?!_next/static|_next/image|favicon.ico|logo\\.svg|apple-touch-icon\\.png|icon-\\d+x\\d+\\.png|manifest\\.webmanifest|images|fonts|scripts|robots\\.txt|sitemap\\.xml|api).*)",
  ],
};
