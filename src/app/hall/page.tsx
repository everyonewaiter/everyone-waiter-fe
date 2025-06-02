"use client";

import { Button } from "@/components/common/Button/Button";
import { ScrollArea, ScrollBar } from "@/components/common/ScrollArea";
import { useState } from "react";
import cn from "@/lib/utils";
import CallingCard from "./_components/CallingCard";
import OrderRow from "./_components/OrderRow";

export default function Hall() {
  const [activeTab, setActiveTab] = useState("주문");

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="w-full rounded-[32px] bg-white p-8">
        <div className="flex items-center gap-3">
          {["주문", "완료"].map((key) => (
            <Button
              key={key}
              variant={activeTab === key ? "default" : "outline"}
              color="black"
              className={cn(
                "button-xl text-lg !font-medium",
                activeTab === key ? "" : "border-gray-500 text-gray-200"
              )}
              onClick={() => setActiveTab(key)}
            >
              {key} 12건
            </Button>
          ))}
        </div>
        {activeTab === "완료" && (
          <div className="mt-6 flex flex-col gap-6">
            <OrderRow completed />
            <OrderRow completed />
            <OrderRow completed />
          </div>
        )}
      </div>
      {activeTab === "주문" && (
        <>
          <div className="flex w-full flex-col gap-6 rounded-[32px] bg-white p-8">
            <div className="flex items-center gap-2">
              <h2 className="text-gray-0 text-2xl font-semibold">호출 내역</h2>
              <div className="center h-8 w-8 rounded-[24px] bg-gray-700 text-xl font-medium">
                6
              </div>
            </div>
            <ScrollArea orientation="horizontal" className="h-full w-full">
              <div className="flex w-max gap-6">
                <CallingCard />
                <CallingCard />
                <CallingCard />
                <CallingCard />
                <CallingCard />
                <CallingCard />
                <CallingCard />
                <CallingCard />
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>
          <div className="w-full rounded-[32px] bg-white p-8">
            <div className="flex flex-col gap-6">
              <OrderRow />
              <OrderRow />
              <OrderRow />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
