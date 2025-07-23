export function setClientCookie(
  key: string,
  value: string,
  maxAge = 60 * 60 * 3 // default: 3시간
) {
  document.cookie = `${key}=${value}; path=/; max-age=${maxAge}; secure`;
}

export function getClientCookie(key: string) {
  return (
    document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${key}=`))
      ?.split("=")[1] ?? null
  );
}
