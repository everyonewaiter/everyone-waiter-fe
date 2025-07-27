"use client";

import { Fragment } from "react";
import dynamic from "next/dynamic";
import QueryProviders from "@/app/query-providers";
import Button from "@/components/common/Button/Button";
import { ScrollArea } from "@/components/common/ScrollArea";
import useOverlay from "@/hooks/useOverlay";
import cn from "@/lib/utils";
import { useDeviceContext } from "@/providers/deviceStoreProvider";
import { posQueries } from "../_queries/usePos";
import MenuBox from "./MenuBox";
import CancelAlert from "./modals/CancelAlert";
import { print } from "../_utils/print-receipt";

const Alert = dynamic(() => import("@/components/common/Alert/Alert"), {
  ssr: false,
});

export default function SideSection2({ ...selectedRow }: OrderPaymentsList) {
  const openReceipt = useOverlay();
  const cancel = useOverlay();

  const { storeId } = useDeviceContext();

  const { data: activity } = posQueries.useActivityById(
    selectedRow?.posTableActivityId as string
  );
  const { data: stores } = posQueries.useStoreInfo(storeId as string);

  const handleReceipt = () => {
    activity?.orderPayments.forEach((payment) => {
      if (payment.method === "CARD") {
        print({
          type: "card-receipt",
          activity: activity!,
          stores: stores!,
          payment: {
            CARDNAME: payment.issuerName,
            FILLER: payment.cardNo,
            INSTALLMENT: payment.installment,
            APPROVALNO: payment.approvalNo,
            TRADETIME: payment.tradeTime,
          },
        });
      } else {
        print({
          type: "cash-receipt",
          activity: activity!,
          stores: stores!,
          cashReceiptPhoneNo: payment.cashReceiptNo,
        });
      }
    });
  };

  const handlePrintReceipt: React.MouseEventHandler<HTMLButtonElement> = (
    e
  ) => {
    e.stopPropagation();

    openReceipt.open(() => (
      <QueryProviders>
        <Alert
          onClose={openReceipt.close}
          buttonText="출력하기"
          onAction={handleReceipt}
        >
          <div className="flex flex-col gap-[6px] py-3">
            <span className="text-gray-0 text-xl font-semibold">
              영수증을 출력하시겠습니까?
            </span>
            <span className="text-lg font-medium text-gray-200">
              주문 내역이 포함되어 있어요!
            </span>
          </div>
        </Alert>
      </QueryProviders>
    ));
  };

  const handleCancelPayment: React.MouseEventHandler<HTMLButtonElement> = (
    e
  ) => {
    e.stopPropagation();

    cancel.open(() => (
      <QueryProviders>
        <CancelAlert
          close={cancel.close}
          activityData={activity!}
          type="pay-cancel"
          hasMultiCancel
        />
      </QueryProviders>
    ));
  };

  return (
    <aside className="w-full">
      <div className="flex items-center justify-between gap-4">
        <strong className="text-gray-0 text-[28px] font-semibold">
          주문 내역
        </strong>
        <div
          className={cn(
            "rounded-[80px] px-5 py-3 text-xl font-medium",
            selectedRow
              ? "text-primary bg-[#F2202016]"
              : "bg-gray-700 text-gray-300"
          )}
        >
          {selectedRow ? selectedRow.orderPaymentId : "-"}
        </div>
      </div>
      <div className="flex flex-col">
        <ScrollArea className="h-[700px] w-full pt-8">
          {selectedRow &&
            Array.isArray(activity?.orders) &&
            activity?.orders?.map((item, index, arr) => (
              <Fragment key={item.orderId}>
                <MenuBox index={index} nonInteractive {...item} />
                {selectedRow && index < arr.length - 1 && (
                  <div className="my-8 h-[2px] w-full bg-gray-700" />
                )}
              </Fragment>
            ))}
        </ScrollArea>
        <div className="mt-8 flex w-full gap-3">
          {selectedRow?.cancellable && (
            <Button
              variant="outline"
              color="black"
              className="flex h-[64px] w-[180px] rounded-[12px] px-8 text-xl"
              disabled={!selectedRow}
              onClick={handleCancelPayment}
            >
              결제 취소하기
            </Button>
          )}
          <Button
            color="black"
            className="flex h-[64px] flex-1 rounded-[12px] px-8 text-xl"
            disabled={!selectedRow}
            onClick={handlePrintReceipt}
          >
            영수증 출력하기
          </Button>
        </div>
      </div>
    </aside>
  );
}
