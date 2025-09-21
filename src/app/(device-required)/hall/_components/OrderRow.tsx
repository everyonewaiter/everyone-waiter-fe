"use client";

import Button from "@/components/common/Button/Button";
import { ScrollArea, ScrollBar } from "@/components/common/ScrollArea";
import useOverlay from "@/hooks/useOverlay";
import cn from "@/lib/utils";
import dynamic from "next/dynamic";
import { convertToTableName } from "@/utils/converter";
import OrderCard from "./OrderCard";
import { hallQueries } from "../_query/useHall";

const CompleteAllModal = dynamic(() => import("./CompleteAllModal"), {
  ssr: false,
});

interface IProps extends HallOrder {
  completed?: boolean;
}

export default function OrderRow({ completed, ...props }: IProps) {
  const { open, close } = useOverlay();

  const serve = hallQueries.useServeOrder();

  const handleCompleteAll = () => {
    open(() => (
      <CompleteAllModal
        close={close}
        type="all-complete"
        onComplete={() => {
          serve.mutate({ orderId: props.orderId }, { onSuccess: close });
        }}
        tableNo={props.tableNo}
      />
    ));
  };

  const getTime = (date: string) => {
    const timePart = date.split(" ")[1];
    const time = timePart.slice(0, 5);
    const hour = parseInt(time.split(":")[0], 10);
    const ampm = hour >= 12 ? "PM" : "AM";

    let displayHour;
    if (hour > 12) {
      displayHour = hour - 12;
    } else if (hour === 0) {
      displayHour = 12;
    } else {
      displayHour = hour;
    }

    return `${ampm} ${String(displayHour).padStart(2, "0")}:${String(time.split(":")[1]).padStart(2, "0")}`;
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
          "flex h-full flex-col rounded-3xl border border-gray-500 p-6",
          completed ? "h-[360px] min-w-[286px]" : "h-[394px] min-w-[318px]"
        )}
      >
        <div className="center rounded-xl border border-gray-600 p-3 text-lg font-medium text-gray-300">
          주문 시간 {getTime(props.createdAt)}
        </div>
        {completed && (
          <div className="center mt-[10px] rounded-xl border border-gray-600 p-3 text-lg font-medium text-gray-300">
            완료 시간 PM {getTime(props.servedTime)}
          </div>
        )}
        <div className="center w-full flex-1 flex-col gap-3">
          {!completed && (
            <Button
              variant="outline"
              className={cn(
                "button-sm !rounded-3xl",
                props.category === "INITIAL"
                  ? "border-primary text-primary"
                  : "border-[#00B603] text-[#00B603]"
              )}
            >
              {props.category === "INITIAL" ? "주문" : "추가"}
            </Button>
          )}
          <span
            className={cn(
              "text-gray-0 text-lg font-medium",
              !completed && "mt-3"
            )}
          >
            테이블
          </span>
          <strong className="text-4xl font-bold">
            {convertToTableName(props.tableNo)}
          </strong>
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
      <section className="flex h-full w-full flex-col gap-4 overflow-hidden rounded-3xl border border-gray-500 p-6">
        <div className="w-full rounded-xl bg-gray-700 px-5 py-3">
          메모: {props.memo}
        </div>
        <div className="flex w-full flex-1 flex-col">
          <ScrollArea className="h-full w-full">
            <div className="flex w-max gap-[10px]">
              {props.orderMenus
                .sort((a, b) => Number(a.served) - Number(b.served))
                .map((menu) => (
                  <OrderCard
                    key={menu.orderMenuId}
                    completed={completed}
                    orderId={props.orderId}
                    {...menu}
                  />
                ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      </section>
    </div>
  );
}
