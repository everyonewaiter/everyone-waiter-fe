"use client";

import { Button } from "@/components/common/Button/Button";
import { ScrollArea, ScrollBar } from "@/components/common/ScrollArea";
import cn from "@/lib/utils";
import useOverlay from "@/hooks/use-overlay";
import OrderCard from "./OrderCard";
import CompleteAllModal from "./CompleteAllModal";

interface IProps {
  completed?: boolean;
}

export default function OrderRow({ completed }: IProps) {
  const { open, close } = useOverlay();

  const handleCompleteAll = () => {
    open(() => (
      <CompleteAllModal
        close={close}
        type="all-complete"
        onComplete={() => {}}
      />
    ));
  };

  return (
    <div
      className={cn(
        "flex items-center gap-6",
        completed ? "h-[360px]" : "h-[384px]"
      )}
    >
      <section
        className={cn(
          "flex h-full flex-col rounded-[24px] border border-gray-500 p-6",
          completed ? "h-[360px] min-w-[286px]" : "h-[394px] min-w-[318px]"
        )}
      >
        <div className="center rounded-[12px] border border-gray-600 p-3 text-lg font-medium text-gray-300">
          주문 시간 PM 02:23
        </div>
        {completed && (
          <div className="center mt-[10px] rounded-[12px] border border-gray-600 p-3 text-lg font-medium text-gray-300">
            완료 시간 PM 02:25
          </div>
        )}
        <div className="center w-full flex-1 flex-col gap-3">
          {!completed && (
            <Button variant="outline" className="button-sm !rounded-[24px]">
              주문
            </Button>
          )}
          <span
            className={cn(
              "text-gray-0 text-lg font-medium",
              !completed && "mt-3"
            )}
          >
            테이블 번호
          </span>
          <strong className="text-4xl font-bold">03</strong>
        </div>
        {!completed && (
          <Button
            color="black"
            className="button-lg"
            onClick={handleCompleteAll}
          >
            전체 완료
          </Button>
        )}
      </section>
      <section className="flex h-full w-full flex-col gap-4 overflow-hidden rounded-[24px] border border-gray-500 p-6">
        <div className="w-full rounded-[12px] bg-gray-700 px-5 py-3">메모:</div>
        <div className="flex w-full flex-1 flex-col">
          <ScrollArea className="h-full w-full">
            <div className="flex w-max gap-[10px]">
              <OrderCard completed={completed!} />
              <OrderCard completed={completed!} />
              <OrderCard completed={completed!} />
              <OrderCard completed={completed!} />
              <OrderCard completed={completed!} />
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      </section>
    </div>
  );
}
