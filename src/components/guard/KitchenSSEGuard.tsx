"use client";

import { PropsWithChildren, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { storeKeys } from "@/app/(main)/(owner)/[id]/store/_queries/keys";
import { getStoreInfoDetail } from "@/app/(main)/(owner)/[id]/store/_api/stores.api";
import { isNumber } from "@/utils/validate";
import getQueryClient from "@/app/get-query-client";
import {
  printToKitchen,
  printCancelToKitchen,
} from "@/app/(device-required)/pos/_utils/print-fn/print-kitchen";
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
        JSON.stringify(event.query.queryKey) ===
        JSON.stringify(["kitchen-receipt-trigger"])
      ) {
        const receiptTrigger = event.query.state.data as ReceiptSSE;

        if (
          receiptTrigger?.printNo &&
          settingData?.setting?.printerLocation === allowedPurpose.toUpperCase()
        ) {
          const hasCancelledMenus = receiptTrigger.receiptMenus.some(
            (menu) => menu.quantity === -1
          );

          if (hasCancelledMenus) {
            const cancelledMenus = receiptTrigger.receiptMenus.filter(
              (menu) => menu.quantity === -1
            );

            printCancelToKitchen({
              cancelledMenus,
              tableNo: receiptTrigger.tableNo,
              printNo: receiptTrigger.printNo,
              cancelledTime: new Date(),
            });
          } else {
            printToKitchen(receiptTrigger);
          }

          queryClient.setQueryData(["kitchen-receipt-trigger"], undefined);
          queryClient.removeQueries({ queryKey: ["kitchen-receipt-trigger"] });
        }
      }
    });

    return () => unsubscribe();
    // eslint-disable-next-line
  }, [queryClient, settingData]);

  return children;
}
