"use server";

import { cookies } from "next/headers";

export async function saveRefresh(refresh: string) {
  const isProd = process.env.NODE_ENV === "production";

  const cookieStore = await cookies();

  cookieStore.set("refreshToken", refresh, {
    httpOnly: true,
    secure: isProd,
    sameSite: "none",
    path: "/",
    maxAge: 60 * 60 * 24 * 14,
  });
}
