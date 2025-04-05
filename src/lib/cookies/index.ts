"use server";

import { cookies } from "next/headers";

type TokenType = "accessToken" | "refreshToken";

const TOKEN_EXPIRATION = {
  accessToken: 60 * 60 * 3, // 3시간
  refreshToken: 60 * 60 * 24 * 365, // 1년
};

// NOTE - accessToken 및 refreshToken 접근
export async function getToken(key: TokenType) {
  const cookieStore = await cookies();

  return cookieStore.get(key)?.value;
}

// NOTE - 로그아웃
export async function deleteCookie(key: TokenType) {
  const cookieStore = await cookies();
  cookieStore.delete(key);
}

// NOTE - 쿠키 설정
export async function setCookie(key: TokenType, token: string) {
  const cookieStore = await cookies();
  cookieStore.set(key, token, {
    httpOnly: true,
    maxAge: TOKEN_EXPIRATION[key],
  });
}
