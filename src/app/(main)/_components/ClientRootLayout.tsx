"use client";

import { PropsWithChildren } from "react";
import QueryProviders from "@/app/query-providers";
import Loading from "@/components/Loading";
import useRouteChangeLoading from "@/hooks/useRouteChangeLoading";
import { OverlayStoreProvider } from "@/providers/overlayStoreProvider";
import { useLoadingStore } from "@/stores/useNeedLoadingStore";

export default function ClientLayout({ children }: PropsWithChildren) {
  const { needLoading, setNeedLoading } = useLoadingStore();

  useRouteChangeLoading(setNeedLoading);

  return (
    <OverlayStoreProvider>
      {needLoading && <Loading />}
      <QueryProviders>{children}</QueryProviders>
    </OverlayStoreProvider>
  );
}
