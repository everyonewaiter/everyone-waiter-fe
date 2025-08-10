import { login } from "@/lib/api/auth.api";
import { setCookie } from "@/lib/cookies";

export async function serverLogin(email: string, password: string) {
  const res = await login({ email, password });
  const { accessToken, refreshToken } = res;

  setCookie("accessToken", accessToken);
  setCookie("refreshToken", refreshToken);

  return { accessToken };
}
