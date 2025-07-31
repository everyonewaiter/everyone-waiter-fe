"use client";

import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
} from "react";

interface StoreContextType {
  storeId: string;
}

const StoreContext = createContext<StoreContextType | null>(null);

export function useStoreContext() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStoreContext must be used within a StoreProvider");
  }
  return context;
}

export function StoreProvider({
  children,
  storeId,
}: PropsWithChildren<{ storeId: string }>) {
  const value = useMemo(() => ({ storeId }), [storeId]);

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}
