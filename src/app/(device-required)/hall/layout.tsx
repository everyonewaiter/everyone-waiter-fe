"use client";

import { PropsWithChildren, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import getQueryClient from "@/app/get-query-client";
import { getStoreInfoDetail } from "@/app/(main)/(owner)/[id]/store/_api/stores.api";
import { storeKeys } from "@/app/(main)/(owner)/[id]/store/_queries/keys";
import { useDeviceContext } from "@/providers/deviceStoreProvider";
import { isNumber } from "@/utils/validate";
import Header from "./_components/Header";
import { printToKitchen } from "../pos/_utils/print-fn/print-kitchen";

export default function Layout({ children }: PropsWithChildren) {
  const { storeId } = useDeviceContext();
  const queryClient = getQueryClient();

  const { data: settingData } = useQuery({
    queryKey: storeKeys.detail(storeId!),
    queryFn: () => getStoreInfoDetail(storeId!),
    enabled: !!storeId && isNumber(storeId),
  });

  useEffect(() => {
    const unsubscribe = queryClient.getQueryCache().subscribe((event) => {
      if (
        event.type === "updated" &&
        JSON.stringify(event.query.queryKey) ===
          JSON.stringify(["kitchen-receipt-trigger"])
      ) {
        const receiptTrigger = event.query.state.data as ReceiptSSE;

        if (
          receiptTrigger?.printNo &&
          settingData?.setting?.printerLocation === "HALL"
        ) {
          printToKitchen(receiptTrigger);
          queryClient.removeQueries({
            queryKey: ["kitchen-receipt-trigger"],
          });
        }
      }
    });

    return () => unsubscribe();
  }, [queryClient, settingData]);

  return (
    <div className="scrollbar-hide flex min-h-dvh flex-col items-center gap-4 bg-gray-700 px-[60px] py-8">
      <Header href="/hall" />
      {children}
    </div>
  );
}
