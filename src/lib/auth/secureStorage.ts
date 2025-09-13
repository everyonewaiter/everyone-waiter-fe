"use client";

import { signatureInstance } from "../axios/instance";

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
    return null;
  }
}

export function getPurposePath(purpose: string): string {
  switch (purpose.toLowerCase()) {
    case "pos":
      return "/pos";
    case "hall":
      return "/hall";
    default:
      return "/device";
  }
}

export async function getCurrentDevicePurpose(): Promise<string | null> {
  try {
    const meta = JSON.parse(localStorage.getItem("@meta") || "{}");
    if (!meta.deviceId || !meta.storeId) {
      return null;
    }

    const deviceInfo = (await getDecryptedItem({
      key: "@deviceInfo",
      deviceId: meta.deviceId,
      storeId: meta.storeId,
    })) as Device;

    return deviceInfo?.purpose || null;
  } catch (error) {
    return null;
  }
}

export async function updateDevice() {
  const meta = JSON.parse(localStorage.getItem("@meta") || "{}");
  if (!meta.deviceId || !meta.storeId) {
    throw new Error("메타 정보가 없습니다.");
  }

  const { deviceId, storeId } = meta;

  const localDeviceInfo = (await getDecryptedItem({
    key: "@deviceInfo",
    deviceId,
    storeId,
  })) as Device;

  if (!localDeviceInfo) {
    throw new Error("로컬 기기 정보가 없습니다.");
  }

  const response: { data: DeviceDetail } =
    await signatureInstance.get(`/devices`);

  if (response.data) {
    await setEncryptedItem({
      key: "@deviceInfo",
      value: {
        ...response.data,
      },
      deviceId,
      storeId,
    });
  }
}

export async function updateDevicePurpose() {
  try {
    const meta = JSON.parse(localStorage.getItem("@meta") || "{}");
    if (!meta.deviceId || !meta.storeId) {
      throw new Error("메타 정보가 없습니다.");
    }

    const { deviceId, storeId } = meta;

    const localDeviceInfo = (await getDecryptedItem({
      key: "@deviceInfo",
      deviceId,
      storeId,
    })) as Device;

    if (!localDeviceInfo) throw new Error("로컬 기기 정보가 없습니다.");

    const originalPurpose = localDeviceInfo.purpose;
    const toggledPurpose = originalPurpose === "POS" ? "HALL" : "POS";

    await setEncryptedItem({
      key: "@deviceInfo",
      value: {
        ...localDeviceInfo,
        purpose: toggledPurpose,
      },
      deviceId,
      storeId,
    });

    const response = await signatureInstance.get(`/devices/${deviceId}`);

    if (response.status === 200) {
      const purposePath = getPurposePath(toggledPurpose);
      const currentPath = window.location.pathname;

      if (!currentPath.startsWith(purposePath)) {
        window.location.href = purposePath;
      }

      return toggledPurpose;
    }

    return null;
  } catch (error) {
    window.location.href = "/device";
    return null;
  }
}
