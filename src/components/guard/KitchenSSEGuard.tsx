"use client";

import { PropsWithChildren, useEffect, useRef } from "react";
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

  // 처리된 printNo를 추적하여 중복 방지
  const processedPrintNos = useRef(new Set<number>());

  const { data: settingData } = useQuery({
    queryKey: storeKeys.detail(storeId!),
    queryFn: () => getStoreInfoDetail(storeId!),
    enabled: !!storeId && isNumber(storeId),
  });

  useEffect(() => {
    const unsubscribe = queryClient.getQueryCache().subscribe((event) => {
      // 데이터 업데이트 이벤트만 처리
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
          // 이미 처리된 printNo인지 확인
          if (processedPrintNos.current.has(receiptTrigger.printNo)) {
            console.log(
              `PrintNo ${receiptTrigger.printNo} already processed, skipping`
            );
            return;
          }

          // 처리된 printNo 추가
          processedPrintNos.current.add(receiptTrigger.printNo);

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
              successHandler: () => {
                // 성공 후 쿼리 정리
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
                // 성공 후 쿼리 정리
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

  return children;
}
