"use client";

import { PropsWithChildren, useEffect, useRef, useState } from "react";
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
import { unlockAudio } from "@/utils/audioNotification";

interface IProps {
  allowedPurpose: string;
}

export default function KitchenSSEGuard({
  children,
  allowedPurpose,
}: PropsWithChildren<IProps>) {
  const queryClient = getQueryClient();
  const { storeId } = useDeviceContext();

  const [hasUserInteracted, setHasUserInteracted] = useState(false);

  const processedPrintNos = useRef(new Set<number>());

  const { data: settingData } = useQuery({
    queryKey: storeKeys.detail(storeId!),
    queryFn: () => getStoreInfoDetail(storeId!),
    enabled: !!storeId && isNumber(storeId),
  });

  useEffect(() => {
    const unsubscribe = queryClient.getQueryCache().subscribe((event) => {
      if (event.type !== "updated") return;

      if (
        JSON.stringify(event.query.queryKey) ===
        JSON.stringify(["kitchen-receipt-trigger"])
      ) {
        const receiptTrigger = event.query.state.data as ReceiptSSE;

        if (
          receiptTrigger?.printNo &&
          settingData?.setting?.printerLocation === allowedPurpose.toUpperCase()
        ) {
          processedPrintNos.current.add(receiptTrigger.printNo);

          const hasCancelledMenus = receiptTrigger.receiptMenus.some(
            (menu) => menu.quantity < 0
          );

          if (hasCancelledMenus) {
            const cancelledMenus = receiptTrigger.receiptMenus.filter(
              (menu) => menu.quantity < 0
            );

            printCancelToKitchen({
              cancelledMenus,
              tableNo: receiptTrigger.tableNo,
              printNo: receiptTrigger.printNo,
              cancelledTime: new Date(),
              successHandler: () => {
                queryClient.setQueryData(
                  ["kitchen-receipt-trigger"],
                  undefined
                );
                queryClient.removeQueries({
                  queryKey: ["kitchen-receipt-trigger"],
                });
              },
            });
          } else {
            printToKitchen({
              ...receiptTrigger,
              successHandler: () => {
                queryClient.setQueryData(
                  ["kitchen-receipt-trigger"],
                  undefined
                );
                queryClient.removeQueries({
                  queryKey: ["kitchen-receipt-trigger"],
                });
              },
            });
          }

          setTimeout(() => {
            processedPrintNos.current.delete(receiptTrigger.printNo);
          }, 5000);
        }
      }
    });

    return () => unsubscribe();
  }, [queryClient, settingData, allowedPurpose]);

  useEffect(() => {
    const handleUserInteraction = async () => {
      if (!hasUserInteracted) {
        await unlockAudio();
        setHasUserInteracted(true);

        document.removeEventListener("click", handleUserInteraction);
        document.removeEventListener("touchstart", handleUserInteraction);
        document.removeEventListener("keydown", handleUserInteraction);
      }
    };

    if (!hasUserInteracted) {
      document.addEventListener("click", handleUserInteraction);
      document.addEventListener("touchstart", handleUserInteraction);
      document.addEventListener("keydown", handleUserInteraction);

      return () => {
        document.removeEventListener("click", handleUserInteraction);
        document.removeEventListener("touchstart", handleUserInteraction);
        document.removeEventListener("keydown", handleUserInteraction);
      };
    }
    return undefined;
  }, [hasUserInteracted]);

  return children;
}
