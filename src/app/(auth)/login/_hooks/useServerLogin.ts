"use server";

/* eslint-disable no-console */

import { getStoreList } from "@/app/(main)/(owner)/[id]/store/_api/stores.api";
import { login, getAccount } from "@/lib/api/auth.api";
import { setCookie } from "@/lib/cookies";

export async function serverLogin(email: string, password: string) {
  try {
    const res = await login({ email, password });
    const accessToken = res.accessToken ?? res.access_token;
    const refreshToken = res.refreshToken ?? res.refresh_token;

    if (!accessToken) {
      throw new Error("로그인 응답에 accessToken이 없습니다.");
    }

    setCookie("accessToken", accessToken);
    setCookie("refreshToken", refreshToken);

    const profileData = await getAccount(accessToken);
    setCookie("permission", profileData.permission);

    const storeList = await getStoreList(accessToken);

    return { profileData, storeList };
  } catch (err: any) {
    // 서버 로그 못 보니까, 클라로 바로 전달
    throw {
      status: err?.response?.status ?? null,
      data: err?.response?.data ?? null,
      url: `${err?.config?.baseURL}${err?.config?.url}`,
      message: err?.message,
    };
  }
}
