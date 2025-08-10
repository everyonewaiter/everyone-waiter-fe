"use server";

import { login } from "@/lib/api/auth.api";
import { cookies } from "next/headers";

export async function serverLogin(email: string, password: string) {
  const response = await login({ email, password });

  const cookie = await cookies();
  cookie.set("accessToken", response.accessToken, {
    path: "/",
    sameSite: "lax",
  });
  cookie.set("refreshToken", response.refreshToken, {
    path: "/",
    sameSite: "lax",
    httpOnly: true,
  });

  return { accessToken: response.accessToken };
}
