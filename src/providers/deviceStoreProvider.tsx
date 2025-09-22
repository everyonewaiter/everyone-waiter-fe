"use client";

import { getDecryptedItem } from "@/lib/auth/secureStorage";
import React, {
  createContext,
  useContext,
  useMemo,
  useEffect,
  useState,
} from "react";

interface DeviceContextType {
  storeId: string | null;
  deviceId: string | null;
  deviceInfo: Device | null;
}

const DeviceContext = createContext<DeviceContextType | null>(null);

export function useDeviceContext() {
  const context = useContext(DeviceContext);
  if (!context) {
    throw new Error("useStoreContext must be used within a StoreProvider");
  }
  return context;
}

export function DeviceProvider({ children }: { children: React.ReactNode }) {
  const [storeId, setStoreId] = useState<string | null>(null);
  const [deviceId, setDeviceId] = useState<string | null>(null);
  const [deviceInfo, setDeviceInfo] = useState<Device | null>(null);

  useEffect(() => {
    const meta = JSON.parse(localStorage.getItem("@meta") || "{}");
    const getDeviceInfo = async () => {
      const d = (await getDecryptedItem({
        key: "@deviceInfo",
        deviceId: meta.deviceId,
        storeId: meta.storeId,
      })) as Device;
      return d;
    };

    (async () => {
      const d = await getDeviceInfo();
      setDeviceInfo(d ?? null);
      setStoreId(meta.storeId ?? null);
      setDeviceId(meta.deviceId ?? null);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = useMemo(
    () => ({ storeId, deviceId, deviceInfo }),
    [storeId, deviceId, deviceInfo]
  );

  return (
    <DeviceContext.Provider value={value}>{children}</DeviceContext.Provider>
  );
}
