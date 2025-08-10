import { KeyType } from "./index";

export async function getClientCookie(key: KeyType) {
  return (
    document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${key}=`))
      ?.split("=")[1] ?? null
  );
}
