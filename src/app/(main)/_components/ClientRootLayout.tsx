import { PropsWithChildren } from "react";
import QueryProviders from "@/app/query-providers";
import { OverlayStoreProvider } from "@/providers/overlayStoreProvider";

export default function ClientLayout({ children }: PropsWithChildren) {
  return (
    <OverlayStoreProvider>
      <QueryProviders>{children}</QueryProviders>
    </OverlayStoreProvider>
  );
}
