"use server";

import { cookies } from "next/headers";

export type KeyType =
  | "accessToken"
  | "refreshToken"
  | "secretKey"
  | "permission";

const TOKEN_EXPIRATION = {
  accessToken: 60 * 10, // 10분
  refreshToken: 60 * 60 * 24 * 14, // 2주
  secretKey: 60 * 60 * 24 * 365, // 1년
  permission: 60 * 60 * 24 * 365, // 1년
};

// NOTE - accessToken 및 refreshToken 접근
export async function getToken(key: KeyType) {
  const cookieStore = await cookies();
  return cookieStore.get(key)?.value;
}

// NOTE - 로그아웃
export async function deleteCookie(key: KeyType) {
  const cookieStore = await cookies();
  cookieStore.delete({
    name: key,
    path: "/",
  });
}

// NOTE - 쿠키 설정
export async function setCookie(key: KeyType, value: string) {
  const cookie = await cookies();
  cookie.set(key, value, {
    httpOnly: key === "refreshToken",
    maxAge: TOKEN_EXPIRATION[key],
  });
}
