"use client";

import { Button } from "@/components/common/Button";
import { ScrollArea } from "@/components/common/ScrollArea";
import useOverlay from "@/hooks/use-overlay";
import { Fragment } from "react";
import QueryProviders from "@/app/query-providers";
import Alert from "@/components/common/Alert/Alert";
import MenuBox from "./MenuBox";

export default function SideSection2() {
  const openReceipt = useOverlay();
  const cancel = useOverlay();

  const handlePrintReceipt: React.MouseEventHandler<HTMLButtonElement> = (
    e
  ) => {
    e.stopPropagation();

    openReceipt.open(() => (
      <QueryProviders>
        <Alert onClose={openReceipt.close} buttonText="출력하기">
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
        <Alert
          onClose={cancel.close}
          buttonColor="primary"
          onAction={() => {}}
          buttonText="취소하기"
        >
          <div className="-py-3 flex flex-col gap-3">
            <span className="text-primary text-[28px] font-semibold">
              {(72000).toLocaleString()}원
            </span>
            <span className="font-regular text-lg text-gray-200">
              결제를 취소하시겠습니까?
            </span>
          </div>
        </Alert>
      </QueryProviders>
    ));
  };

  return (
    <>
      <div className="flex items-center gap-4">
        <div className="text-primary rounded-[80px] bg-[#F2202016] px-5 py-3 text-xl font-medium">
          4888
        </div>
        <strong className="text-gray-0 text-[28px] font-semibold">
          주문 내역
        </strong>
      </div>
      <div className="flex flex-col">
        <ScrollArea className="h-[700px] w-full">
          {[1, 2].map((item, index, arr) => (
            <Fragment key={item}>
              <MenuBox key={item} index={index} />
              {index < arr.length - 1 && (
                <div className="my-8 h-[2px] w-full bg-gray-700" />
              )}
            </Fragment>
          ))}
        </ScrollArea>
        <div className="mt-8 flex gap-3">
          <Button
            variant="outline"
            color="outline-black"
            className="flex h-[64px] w-[180px] rounded-[12px] px-8 text-xl"
            onClick={handleCancelPayment}
          >
            결제 취소하기
          </Button>
          <Button
            color="black"
            className="flex h-[64px] flex-1 rounded-[12px] px-8 text-xl"
            onClick={handlePrintReceipt}
          >
            영수증 출력하기
          </Button>
        </div>
      </div>
    </>
  );
}
