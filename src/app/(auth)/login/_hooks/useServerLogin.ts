"use server";

import { getStoreList } from "@/app/(main)/(owner)/[id]/store/_api/stores.api";
import { login, getAccount } from "@/lib/api/auth.api";
import { setCookie } from "@/lib/cookies";

export async function serverLogin(email: string, password: string) {
  const response = await login({ email, password });

  // 서버 쿠키
  setCookie("accessToken", response.accessToken);
  setCookie("refreshToken", response.refreshToken);

  const profileData = await getAccount();

  setCookie("role", profileData.permission);

  const storeList = await getStoreList();

  return {
    profileData,
    storeList,
    token: { ...response },
    permission: profileData.permission,
  };
}
