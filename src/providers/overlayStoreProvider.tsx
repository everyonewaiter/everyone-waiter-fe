"use client";

import { createOverlayStore, OverlayStore } from "@/stores/overlayStore";
import { Fragment, ReactNode, createContext, useContext, useRef } from "react";
import { useStore } from "zustand";

export type OverlayStoreApi = ReturnType<typeof createOverlayStore>;

export const OverlayStoreContext = createContext<OverlayStoreApi | undefined>(
  undefined
);

export const useOverlayStore = <T,>(
  selector: (store: OverlayStore) => T
): T => {
  const overlayStoreContext = useContext(OverlayStoreContext);

  if (!overlayStoreContext) {
    throw new Error(
      "useOverlayStore는 반드시 OverlayStoreProvider 내에서만 사용되어야 합니다."
    );
  }

  return useStore(overlayStoreContext, selector);
};

export function OverlayRoot() {
  const { overlays } = useOverlayStore((state) => state);

  return (
    <>
      {[...overlays.entries()].map(([id, element]) => (
        <Fragment key={id}>{element}</Fragment>
      ))}
    </>
  );
}

export function OverlayStoreProvider({ children }: { children: ReactNode }) {
  const storeRef = useRef<OverlayStoreApi>(createOverlayStore());

  return (
    <OverlayStoreContext.Provider value={storeRef.current}>
      {children}
      <OverlayRoot />
    </OverlayStoreContext.Provider>
  );
}
