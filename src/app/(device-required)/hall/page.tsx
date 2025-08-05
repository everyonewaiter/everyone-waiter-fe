"use client";

import { useState } from "react";
import Button from "@/components/common/Button/Button";
import { ScrollArea, ScrollBar } from "@/components/common/ScrollArea";
import cn from "@/lib/utils";
import Spinner from "@/components/common/Spinner";
import useOverlay from "@/hooks/useOverlay";
import Alert from "@/components/common/Alert/Alert";
import CallingCard from "./_components/CallingCard";
import OrderRow from "./_components/OrderRow";
import { hallQueries } from "./_query/useHall";
import useHandleQueryError from "./_hooks/useHandleQueryError";
import { useHallSSE } from "./_hooks/useHallSSE";

enum ActiveTab {
  order = "주문",
  served = "완료",
}

export default function Hall() {
  const [activeTab, setActiveTab] = useState<ActiveTab>(ActiveTab.order);
  const [hasError, setHasError] = useState({
    staffCall: false,
    servedList: false,
    orders: false,
  });

  const staffCalls = hallQueries.useStaffCallList(hasError.staffCall);
  const servedList = hallQueries.useOrderList(true, hasError.servedList);
  const orders = hallQueries.useOrderList(false, hasError.orders);

  const { open, close } = useOverlay();

  const handleOpenAlert = (message: string) => {
    open(() => (
      <Alert onClose={close} hasNoAction>
        {message}
      </Alert>
    ));
  };

  useHandleQueryError(
    handleOpenAlert,
    setHasError,
    staffCalls,
    servedList,
    orders
  );
  useHallSSE();

  const tabList: Record<ActiveTab, HallOrder[]> = {
    [ActiveTab.order]: orders.data?.orders ?? [],
    [ActiveTab.served]: servedList?.data?.orders ?? [],
  };

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="w-full rounded-[32px] bg-white p-8">
        <div className="flex items-center gap-3">
          {Object.keys(tabList).map((key) => (
            <Button
              key={key}
              variant={activeTab === key ? "default" : "outline"}
              color="black"
              className={cn(
                "button-xl text-lg !font-medium",
                activeTab === key ? "" : "border-gray-500 text-gray-200"
              )}
              onClick={() => setActiveTab(key as ActiveTab)}
            >
              {key} {tabList[key as ActiveTab].length}건
            </Button>
          ))}
        </div>
        {activeTab === "완료" && (
          <div className="mt-6 flex flex-col gap-6">
            {servedList?.data?.orders.map((item) => (
              <OrderRow key={item.orderId} {...item} completed />
            ))}
          </div>
        )}
      </div>
      {activeTab === "주문" && (
        <>
          <div className="flex w-full flex-col gap-6 rounded-[32px] bg-white p-8">
            <div className="flex items-center gap-2">
              <h2 className="text-gray-0 text-2xl font-semibold">호출 내역</h2>
              <div className="center h-8 w-8 rounded-[24px] bg-gray-700 text-xl font-medium">
                {staffCalls?.data?.staffCalls.length ?? "0"}
              </div>
            </div>
            {!staffCalls.isLoading &&
              staffCalls?.data?.staffCalls?.length! > 0 && (
                <ScrollArea className="h-full w-full">
                  <div className="flex w-max gap-6">
                    {staffCalls?.data?.staffCalls.map((call) => (
                      <CallingCard key={call.staffCallId} {...call} />
                    ))}
                  </div>
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
              )}
            {!staffCalls.isLoading &&
              !staffCalls?.data?.staffCalls?.length &&
              !staffCalls.isError && <span>직원 호출 내역이 없습니다.</span>}
            {staffCalls.isLoading && !staffCalls.isError && <Spinner />}
            {staffCalls.isError && (
              <span>직원 호출 내역을 불러올 수 없습니다.</span>
            )}
          </div>
          <div className="flex w-full flex-col gap-6 rounded-[32px] bg-white p-8">
            {!orders.isLoading && orders?.data?.orders?.length! > 0 && (
              <div className="w-full rounded-[32px]">
                <div className="flex flex-col gap-6">
                  {orders?.data?.orders.map((item) => (
                    <OrderRow key={item.orderId} {...item} />
                  ))}
                </div>
              </div>
            )}
            {!orders.isLoading &&
              !orders?.data?.orders?.length &&
              !orders.isError && <span>주문 내역이 없습니다.</span>}
            {orders.isLoading && !orders.isError && <Spinner />}
            {orders.isError && <span>주문 내역을 불러올 수 없습니다.</span>}
          </div>
        </>
      )}
    </div>
  );
}
