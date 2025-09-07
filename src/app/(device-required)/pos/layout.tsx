"use client";

import { useQuery } from "@tanstack/react-query";
import { getStoreInfoDetail } from "@/app/(main)/(owner)/[id]/store/_api/stores.api";
import { storeKeys } from "@/app/(main)/(owner)/[id]/store/_queries/keys";
import { useDeviceContext } from "@/providers/deviceStoreProvider";
import getQueryClient from "@/app/get-query-client";
import { PropsWithChildren, useEffect } from "react";
import { printToKitchen } from "./_utils/print-receipt";

export default function Layout({ children }: PropsWithChildren) {
  const { storeId } = useDeviceContext();

  const { data: receiptTrigger } = useQuery({
    queryKey: ["kitchen-receipt-trigger"],
    enabled: false,
  }) as {
    data: {
      memo: string;
      tableNo: number;
      printNo: number;
      receiptMenu: [
        {
          name: string;
          quantity: number;
          options: string[];
        },
      ];
    };
  };

  const { data: settingData } = useQuery({
    queryKey: storeKeys.detail(storeId!),
    queryFn: () => getStoreInfoDetail(storeId!),
  });

  useEffect(() => {
    const queryClient = getQueryClient();

    if (
      receiptTrigger?.printNo &&
      settingData?.setting?.printerLocation === "POS"
    ) {
      printToKitchen(receiptTrigger);
      queryClient.removeQueries({ queryKey: ["kitchen-receipt-trigger"] });
    }
    // eslint-disable-next-line
  }, [receiptTrigger]);

  return children;
}
