"use server";

import { login } from "@/lib/api/auth.api";
import { setCookie } from "@/lib/cookies";

export async function serverLogin(email: string, password: string) {
  const { accessToken, refreshToken } = await login({ email, password });
  await setCookie("refreshToken", refreshToken);
  return { accessToken };
}
