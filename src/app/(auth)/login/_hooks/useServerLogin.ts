"use server";

/* eslint-disable no-console */

import { getStoreList } from "@/app/(main)/(owner)/[id]/store/_api/stores.api";
import { login, getAccount } from "@/lib/api/auth.api";
import { setCookie } from "@/lib/cookies";
import Error from "next/error";

export async function serverLogin(email: string, password: string) {
  try {
    const res = await login({ email, password });
    const { accessToken, refreshToken } = res;

    setCookie("accessToken", accessToken);
    setCookie("refreshToken", refreshToken);

    const profileData = await getAccount(accessToken);
    setCookie("permission", profileData.permission);

    const storeList = await getStoreList(accessToken);

    return { profileData, storeList };
  } catch (e) {
    throw new Error(e as any);
  }
}
