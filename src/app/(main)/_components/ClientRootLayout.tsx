"use client";

import { PropsWithChildren, useEffect } from "react";
import QueryProviders from "@/app/query-providers";
import { OverlayStoreProvider } from "@/providers/overlayStoreProvider";

export default function ClientLayout({ children }: PropsWithChildren) {
  useEffect(() => {
    const preloadLottie = async () => {
      try {
        await Promise.all([
          import("react-lottie"),
          import("@/assets/json/rice-white.json"),
        ]);
      } catch (error) {
        console.error("Failed to preload Lottie:", error);
      }
    };

    preloadLottie();
  }, []);

  return (
    <OverlayStoreProvider>
      <QueryProviders>{children}</QueryProviders>
    </OverlayStoreProvider>
  );
}
