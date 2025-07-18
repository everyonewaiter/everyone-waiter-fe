import { PropsWithChildren, ReactNode, Suspense } from "react";
import { StoreProvider } from "@/providers/storeProvider";
import getQueryClient from "@/app/get-query-client";
import { notFound } from "next/navigation";
import ClientModalWrapper from "../../_components/ClientModalWrapper";
import { storeKeys } from "./store/_queries/keys";
import { getRegisters } from "./store/_api/stores.api";

export default async function OwnerLayout({
  children,
  modal,
}: PropsWithChildren<{ modal: ReactNode }>) {
  const queryClient = getQueryClient();

  try {
    await queryClient.fetchQuery({
      queryKey: storeKeys.list(1),
      queryFn: () => getRegisters(1),
    });
  } catch (error) {
    return notFound();
  }

  return (
    <StoreProvider>
      <div className="relative flex h-full flex-col overflow-hidden">
        <div className="flex-1">{children}</div>
        <Suspense fallback={<div>로드 중...</div>}>
          <ClientModalWrapper>{modal}</ClientModalWrapper>
        </Suspense>
      </div>
    </StoreProvider>
  );
}
