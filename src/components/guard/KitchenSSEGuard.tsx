"use client";

import { PropsWithChildren, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { storeKeys } from "@/app/(main)/(owner)/[id]/store/_queries/keys";
import { getStoreInfoDetail } from "@/app/(main)/(owner)/[id]/store/_api/stores.api";
import { isNumber } from "@/utils/validate";
import getQueryClient from "@/app/get-query-client";
import { printToKitchen } from "@/app/(device-required)/pos/_utils/print-fn/print-kitchen";
import { useDeviceContext } from "@/providers/deviceStoreProvider";

interface IProps {
  allowedPurpose: string;
}

export default function KitchenSSEGuard({
  children,
  allowedPurpose,
}: PropsWithChildren<IProps>) {
  const queryClient = getQueryClient();
  const { storeId } = useDeviceContext();

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
          settingData?.setting?.printerLocation === allowedPurpose.toUpperCase()
        ) {
          printToKitchen(receiptTrigger);
          queryClient.removeQueries({ queryKey: ["kitchen-receipt-trigger"] });
        }
      }
    });

    return () => unsubscribe();
    // eslint-disable-next-line
  }, [queryClient, settingData]);

  return children;
}
