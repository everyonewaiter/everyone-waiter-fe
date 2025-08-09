import { NextRequest, NextResponse } from "next/server";

const publicPaths = [
  "/waiting/my-turn",
  "/waiting/result",
  "/waiting/cancel",
  "/menu/preview",
];

const authPaths = ["/login", "/signup"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const accessToken = req.cookies.get("accessToken")?.value;
  const permission = req.cookies.get("permission")?.value;

  const isAdminPath = pathname.startsWith("/admin");

  // NOTE: 관리자 페이지 접근 제한
  if (isAdminPath && permission !== "ADMIN") {
    return NextResponse.rewrite(new URL("/not-found", req.url));
  }

  // NOTE: 로그인한 상태에서 auth 페이지 접근 금지
  if (accessToken && authPaths.some((path) => pathname.startsWith(path))) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // NOTE: 로그인 상태가 아닐 때 main에 접근했을 경우
  if (pathname.startsWith("/main") && !accessToken) {
    return NextResponse.rewrite(new URL("/not-found", req.url));
  }

  // NOTE: 웨이팅 상태가 아닐 떄 접근했을 경우
  if (publicPaths.some((path) => pathname.startsWith(path))) {
    if (accessToken) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}
