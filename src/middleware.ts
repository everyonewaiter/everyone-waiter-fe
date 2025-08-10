import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const accessToken = req.cookies.get("accessToken")?.value;
  const permission = req.cookies.get("permission")?.value;

  const isAdminPath = pathname.startsWith("/admin");
  const isUserPath = pathname.startsWith("/main");

  // NOTE: userPaths 외 접근 제한
  if (permission === "USER") {
    if (!isUserPath || !accessToken) {
      return NextResponse.rewrite(new URL("/not-found", req.url));
    }
  }

  // NOTE: 관리자 페이지 외 접근 제한
  if (permission === "ADMIN") {
    if (!isAdminPath || !accessToken) {
      return NextResponse.rewrite(new URL("/not-found", req.url));
    }
  }

  // NOTE: 로그인 상태가 아닐 때 main에 접근했을 경우
  if (pathname.startsWith("/main") && !accessToken) {
    return NextResponse.rewrite(new URL("/not-found", req.url));
  }

  return NextResponse.next();
}
