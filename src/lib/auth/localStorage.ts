"use client";

import secureLocalStorage from "react-secure-storage";

type KeyType = "deviceInfo" | "secretKey";

export async function getSecureItem(key: KeyType) {
  const item = secureLocalStorage.getItem(key);
  return item ? JSON.parse(item as string) : null;
}

export async function deleteSecureItem(key: KeyType) {
  secureLocalStorage.removeItem(key);
}

export async function setSecureItem(key: KeyType, value: any) {
  secureLocalStorage.setItem(key, JSON.stringify(value));
}
