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
import { print } from "../_utils/print-fn/print-receipt";
import SideBottom from "./SideSection/SideBottom";
import { printRefund } from "../_utils/print-fn/print-refund";

const Alert = dynamic(() => import("@/components/common/Alert/Alert"), {
  ssr: false,
});

interface IProps extends OrderPaymentsList {
  resetSelectedRow: () => void;
  isCancelled: boolean;
  resultPayment: number;
}

export default function SideSection2({
  resetSelectedRow,
  isCancelled,
  resultPayment,
  ...selectedRow
}: IProps) {
  const openReceipt = useOverlay();
  const cancel = useOverlay();

  const { storeId } = useDeviceContext();

  const { data: activity } = posQueries.useActivityById(
    selectedRow?.posTableActivityId as string
  );
  const { data: stores } = posQueries.useStoreInfo(storeId as string);

  const handleReceipt = () => {
    if (!isCancelled && selectedRow?.state === "CANCEL") {
      printRefund({
        type: selectedRow.method === "CARD" ? "card-receipt" : "cash-receipt",
        activity: activity!,
        stores: stores!,
        payments: selectedRow,
        successHandler: openReceipt.close,
      });
      return;
    }

    if (selectedRow?.state !== "CANCEL" && selectedRow.method === "CARD") {
      print({
        type: "card-receipt",
        activity: activity!,
        stores: stores!,
        payment: {
          CARDNAME: selectedRow.issuerName,
          FILLER: selectedRow.cardNo,
          INSTALLMENT: selectedRow.installment,
          APPROVALNO: selectedRow.approvalNo,
        },
        paymentTradeTime: selectedRow.tradeTime || "",
        successHandler: openReceipt.close,
      });
      return;
    }

    if (selectedRow?.state !== "CANCEL" && selectedRow.method === "CASH") {
      print({
        type: "cash-receipt",
        activity: activity!,
        stores: stores!,
        cashReceiptPhoneNo: selectedRow.cashReceiptNo,
        makePersonalPayment: selectedRow.cashReceiptType === "DEDUCTION",
        paymentTradeTime: selectedRow.tradeTime || "",
        successHandler: openReceipt.close,
      });
    }
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
          close={() => {
            cancel.close();
            resetSelectedRow();
          }}
          orderPayment={selectedRow}
          activity={activity!}
          type="pay-cancel"
        />
      </QueryProviders>
    ));
  };

  console.log(activity);

  return (
    <aside className="relative w-full">
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
          {selectedRow ? selectedRow?.posTableActivityId : "-"}
        </div>
      </div>
      <div className="flex flex-1 flex-col">
        <ScrollArea className="h-[calc(100dvh-500px)] w-full pt-8">
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
      </div>
      <SideBottom
        type="history"
        totalOrderPrice={activity?.totalOrderPrice ?? 0}
        discount={activity?.discount ?? 0}
        remainingPaymentPrice={activity?.remainingPaymentPrice ?? 0}
        resultPayment={resultPayment}
        onAddDiscount={() => {}}
      />
      <div className="bottom-0 flex w-full gap-3 bg-white pt-6">
        {selectedRow?.cancellable && (
          <Button
            variant="outline"
            color="black"
            className="button-xl flex w-[180px] rounded-xl px-8 text-xl"
            disabled={!selectedRow}
            onClick={handleCancelPayment}
          >
            결제 취소하기
          </Button>
        )}
        {isCancelled ? (
          <span className="button-xl center w-full !text-xl">취소됨</span>
        ) : (
          <Button
            color="black"
            className="button-xl flex flex-1 rounded-xl px-8 text-xl"
            disabled={!selectedRow}
            onClick={handlePrintReceipt}
          >
            {selectedRow?.state === "CANCEL"
              ? "취소 영수증 출력하기"
              : "영수증 출력하기"}
          </Button>
        )}
      </div>
    </aside>
  );
}
