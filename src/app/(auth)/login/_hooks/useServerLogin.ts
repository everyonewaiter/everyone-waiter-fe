/* eslint-disable no-console */

"use server";

import { getStoreList } from "@/app/(main)/(owner)/[id]/store/_api/stores.api";
import { login, getAccount } from "@/lib/api/auth.api";
import API_PATH from "@/lib/api/paths";
import { authInstance } from "@/lib/axios/instance";
import { setCookie } from "@/lib/cookies";

export async function serverLogin(email: string, password: string) {
  const response = await login({ email, password });
  console.log("[auth] baseURL =", authInstance.defaults.baseURL);
  console.log("[auth] PATH =", `${API_PATH.account}/sign-in`);

  setCookie("accessToken", response.accessToken);
  setCookie("refreshToken", response.refreshToken);

  const profileData = await getAccount(response.accessToken);
  console.log(profileData);

  setCookie("permission", profileData.permission);

  const storeList = await getStoreList(response.accessToken);
  console.log(storeList);

  return { profileData, storeList };
}
