import { setCookie } from "@/lib/cookies";

export const saveRefresh = async (refresh: string) => {
  await setCookie("refreshToken", refresh);
};
