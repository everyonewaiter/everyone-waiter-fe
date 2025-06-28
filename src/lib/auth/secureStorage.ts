"use client";

const SALT = "MY_APP_SECRET_SALT";

async function generateKey(deviceId: string, storeId: string) {
  const raw = `${deviceId}:${storeId}:${SALT}`;
  const hashBuffer = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(raw)
  );
  return crypto.subtle.importKey("raw", hashBuffer, "AES-GCM", false, [
    "encrypt",
    "decrypt",
  ]);
}

export async function setEncryptedItem({
  key,
  value,
  deviceId,
  storeId,
}: {
  key: string;
  value: any;
  deviceId: string;
  storeId: string;
}) {
  const cryptoKey = await generateKey(deviceId, storeId);
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encoded = new TextEncoder().encode(JSON.stringify(value));
  const encrypted = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    cryptoKey,
    encoded
  );

  const result = {
    iv: Array.from(iv),
    data: Array.from(new Uint8Array(encrypted)),
  };

  localStorage.setItem(key, JSON.stringify(result));
}

export async function getDecryptedItem<T>({
  key,
  deviceId,
  storeId,
}: {
  key: string;
  deviceId: string;
  storeId: string;
}): Promise<T | null> {
  const stored = localStorage.getItem(key);
  if (!stored) return null;

  const parsed = JSON.parse(stored);
  const iv = new Uint8Array(parsed.iv);
  const data = new Uint8Array(parsed.data);

  const cryptoKey = await generateKey(deviceId, storeId);
  try {
    const decrypted = await crypto.subtle.decrypt(
      { name: "AES-GCM", iv },
      cryptoKey,
      data
    );
    return JSON.parse(new TextDecoder().decode(decrypted));
  } catch (e) {
    console.warn("복호화 실패", e);
    return null;
  }
}
