"use client";

import { PropsWithChildren, useEffect } from "react";
import QueryProviders from "@/app/query-providers";
import { OverlayStoreProvider } from "@/providers/overlayStoreProvider";

export default function ClientLayout({ children }: PropsWithChildren) {
  useEffect(() => {
    const preloadLottie = async () => {
      await Promise.all([
        import("react-lottie"),
        import("@/assets/json/rice-white.json"),
      ]);
    };

    preloadLottie();
  }, []);

  return (
    <OverlayStoreProvider>
      <QueryProviders>{children}</QueryProviders>
    </OverlayStoreProvider>
  );
}
