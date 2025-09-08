"use client";

import { PropsWithChildren, useEffect } from "react";
import getQueryClient from "@/app/get-query-client";
import { getStoreInfoDetail } from "@/app/(main)/(owner)/[id]/store/_api/stores.api";
import { storeKeys } from "@/app/(main)/(owner)/[id]/store/_queries/keys";
import { useQuery } from "@tanstack/react-query";
import { useDeviceContext } from "@/providers/deviceStoreProvider";
import { isNumber } from "@/utils/validate";
import Header from "./_components/Header";
import { printToKitchen } from "../pos/_utils/print-receipt";

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
    enabled: !!storeId && isNumber(storeId),
  });

  useEffect(() => {
    const queryClient = getQueryClient();

    if (
      receiptTrigger?.printNo &&
      settingData?.setting?.printerLocation === "HALL"
    ) {
      printToKitchen(receiptTrigger);
      queryClient.removeQueries({ queryKey: ["kitchen-receipt-trigger"] });
    }
    // eslint-disable-next-line
  }, [receiptTrigger]);

  return (
    <div className="scrollbar-hide flex min-h-dvh flex-col items-center gap-4 bg-gray-700 px-[60px] py-8">
      <Header href="/hall" />
      {children}
    </div>
  );
}
