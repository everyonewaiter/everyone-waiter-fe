"use server";

import { getStoreList } from "@/app/(main)/(owner)/[id]/store/_api/stores.api";
import { login, getAccount } from "@/lib/api/auth.api";
import { setCookie } from "@/lib/cookies";

export async function serverLogin(email: string, password: string) {
  const { accessToken, refreshToken } = await login({ email, password });

  setCookie("accessToken", accessToken);
  setCookie("refreshToken", refreshToken);

  const profileData = await getAccount(accessToken);

  setCookie("permission", profileData.permission);

  const storeList = await getStoreList(accessToken);

  return { profileData, storeList };
}
