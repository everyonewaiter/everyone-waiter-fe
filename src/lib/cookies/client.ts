type KeyType = "accessToken" | "refreshToken" | "permission" | "store";

const TOKEN_EXPIRATION: Record<KeyType, number> = {
  accessToken: 60 * 60 * 3, // 3시간
  refreshToken: 60 * 60 * 24 * 365, // 1년
  permission: 60 * 30 * 3, // 30분
  store: 60 * 30 * 3,
};

export function setClientCookie(key: KeyType, value: string) {
  document.cookie = `${key}=${encodeURIComponent(value)}; path=/; max-age=${TOKEN_EXPIRATION[key]}; secure`;
}

export function getClientCookie(key: KeyType) {
  if (typeof document === "undefined") return null;
  const raw =
    document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${key}=`))
      ?.split("=")[1] ?? null;
  return raw ? decodeURIComponent(raw) : null;
}

export function getClientPermission() {
  const permission = getClientCookie("permission");
  return permission;
}

export function deleteClientCookie(key: string) {
  if (typeof document === "undefined") return;
  document.cookie = `${key}=; path=/; max-age=0`;
}
