import { KeyType } from "./index";

export function getClientCookie(key: KeyType) {
  return (
    document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${key}=`))
      ?.split("=")[1] ?? null
  );
}

export function setClientCookie(key: KeyType, value: string) {
  if (key === "refreshToken") return;
  document.cookie = `${key}=${encodeURIComponent(value)}; Path=/; SameSite=Lax`;
}
