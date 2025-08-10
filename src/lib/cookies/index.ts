"use server";

import { cookies } from "next/headers";

export type KeyType =
  | "accessToken"
  | "refreshToken"
  | "secretKey"
  | "permission";

const TOKEN_EXPIRATION = {
  accessToken: 60 * 60 * 24 * 14, // 12시간
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
export async function setCookie(key: KeyType, token: string) {
  const cookieStore = await cookies();
  cookieStore.set(key, token, {
    httpOnly: key === "refreshToken",
    secure: key === "refreshToken",
    maxAge: TOKEN_EXPIRATION[key],
    path: "/",
    sameSite: "lax",
  });
}
