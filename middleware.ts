import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("accessToken")?.value;
  const { pathname } = req.nextUrl;

  // 특정 경로 제외 토큰 검사
  const prevent =
    pathname.startsWith("/waitings") || pathname.startsWith("/menus");

  if (!token && !prevent && pathname === "/") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/(.*)"],
};
