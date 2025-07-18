"use client";

import { usePathname } from "next/navigation";
import React, { createContext, useContext, useMemo } from "react";

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

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const storeId = pathname.split("/")[1];

  const value = useMemo(() => ({ storeId }), [storeId]);

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}
