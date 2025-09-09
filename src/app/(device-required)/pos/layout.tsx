"use client";

import { useQuery } from "@tanstack/react-query";
import { PropsWithChildren, useEffect } from "react";
import { getStoreInfoDetail } from "@/app/(main)/(owner)/[id]/store/_api/stores.api";
import { storeKeys } from "@/app/(main)/(owner)/[id]/store/_queries/keys";
import { useDeviceContext } from "@/providers/deviceStoreProvider";
import { isNumber } from "@/utils/validate";
import getQueryClient from "@/app/get-query-client";
import { printToKitchen } from "./_utils/print-fn/print-kitchen";

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
          settingData?.setting?.printerLocation === "POS"
        ) {
          printToKitchen(receiptTrigger);
          queryClient.removeQueries({ queryKey: ["kitchen-receipt-trigger"] });
        }
      }
    });

    return () => unsubscribe();
  }, [queryClient, settingData]);

  return children;
}
