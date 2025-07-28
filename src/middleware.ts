import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const accessToken = req.cookies.get("accessToken")?.value;
  const permission = req.cookies.get("permission")?.value;
  const storeId = req.cookies.get("store")?.value;
  const isLoginPage = pathname.startsWith("/login");

  if (!accessToken && !isLoginPage) {
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  if (accessToken && isLoginPage) {
    let redirectUrl: URL;

    if (permission === "ADMIN") {
      redirectUrl = new URL("/admin/users", req.url);
    } else if (storeId) {
      redirectUrl = new URL(`/${storeId}`, req.url);
    } else {
      redirectUrl = new URL("https://everyonewaiter.com", req.url);
    }

    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|logo|images|fonts|api|manifest).*)"],
};
