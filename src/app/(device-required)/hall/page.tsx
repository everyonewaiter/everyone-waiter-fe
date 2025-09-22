"use client";

import { useState } from "react";
import Button from "@/components/common/Button/Button";
import { ScrollArea, ScrollBar } from "@/components/common/ScrollArea";
import cn from "@/lib/utils";
import Spinner from "@/components/common/Spinner";
import CallingCard from "./_components/CallingCard";
import OrderRow from "./_components/OrderRow";
import { useOrderList } from "./_query/useOrderList";
import { useStaffCall } from "./_query/useStaffCall";

enum ActiveTab {
  order = "주문",
  served = "완료",
}

export default function Hall() {
  const [activeTab, setActiveTab] = useState<ActiveTab>(ActiveTab.order);

  const {
    data: staffCalls,
    isLoading: staffCallsLoading,
    isError: staffCallsError,
  } = useStaffCall();
  const {
    data: orders,
    isLoading: ordersLoading,
    isError: ordersError,
  } = useOrderList();

  const tabList: Record<ActiveTab, HallOrder[]> = {
    [ActiveTab.order]: orders?.unserved ?? [],
    [ActiveTab.served]: orders?.served ?? [],
  };

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="w-full rounded-4xl bg-white p-8">
        <div className="flex items-center gap-3">
          {Object.keys(tabList).map((key) => (
            <Button
              key={key}
              variant={activeTab === key ? "default" : "outline"}
              color="black"
              className={cn(
                "button-xl relative text-lg !font-medium",
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
            {orders?.served?.map((item) => (
              <OrderRow key={item.orderId} {...item} completed />
            ))}
          </div>
        )}
      </div>
      {activeTab === "주문" && (
        <>
          <div className="flex w-full flex-col gap-6 rounded-4xl bg-white p-8">
            <div className="flex items-center gap-2">
              <h2 className="text-gray-0 text-2xl font-semibold">호출 내역</h2>
              <div className="center h-8 w-8 rounded-3xl bg-gray-700 text-xl font-medium">
                {staffCalls?.staffCalls.length ?? "0"}
              </div>
            </div>
            {!staffCallsLoading && staffCalls?.staffCalls?.length! > 0 && (
              <ScrollArea className="h-full w-full">
                <div className="flex w-max gap-6">
                  {staffCalls?.staffCalls?.map((call) => (
                    <CallingCard key={call.staffCallId} {...call} />
                  ))}
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            )}
            {!staffCallsLoading &&
              !staffCalls?.staffCalls?.length &&
              !staffCallsError && <span>직원 호출 내역이 없습니다.</span>}
            {staffCallsLoading && !staffCallsError && <Spinner />}
            {staffCallsError && (
              <span>직원 호출 내역을 불러올 수 없습니다.</span>
            )}
          </div>
          <div className="flex w-full flex-col gap-6 rounded-4xl bg-white p-8">
            {!ordersLoading && orders?.unserved?.length! > 0 && (
              <div className="w-full rounded-4xl">
                <div className="flex flex-col gap-6">
                  {orders?.unserved?.map((item) => (
                    <OrderRow key={item.orderId} {...item} />
                  ))}
                </div>
              </div>
            )}
            {!ordersLoading && !orders?.unserved?.length && !ordersError && (
              <span>주문 내역이 없습니다.</span>
            )}
            {ordersLoading && !ordersError && <Spinner />}
            {ordersError && <span>주문 내역을 불러올 수 없습니다.</span>}
          </div>
        </>
      )}
    </div>
  );
}
