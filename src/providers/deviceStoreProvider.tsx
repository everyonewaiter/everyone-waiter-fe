"use client";

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

  useEffect(() => {
    const meta = JSON.parse(localStorage.getItem("@meta") || "{}");
    setStoreId(meta.storeId ?? null);
    setDeviceId(meta.deviceId ?? null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = useMemo(() => ({ storeId, deviceId }), [storeId, deviceId]);

  return (
    <DeviceContext.Provider value={value}>{children}</DeviceContext.Provider>
  );
}
