import { login } from "@/lib/api/auth.api";
import { setCookie } from "@/lib/cookies";

export async function serverLogin(email: string, password: string) {
  const response = await login({ email, password });

  await setCookie("accessToken", response.accessToken);
  await setCookie("refreshToken", response.refreshToken);

  return { accessToken: response.accessToken };
}
