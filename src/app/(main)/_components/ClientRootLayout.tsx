"use client";

import { useLoadingStore } from "@/stores/useNeedLoadingStore";
import Loading from "@/components/Loading";
import QueryProviders from "@/app/query-providers";
import useRouteChangeLoading from "@/hooks/useRouteChangeLoading";
import { OverlayStoreProvider } from "@/providers/overlayStoreProvider";
import { PropsWithChildren } from "react";

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
