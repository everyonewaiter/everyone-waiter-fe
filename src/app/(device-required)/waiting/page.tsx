"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import dynamic from "next/dynamic";
import ResponsiveButton from "@/components/common/Button/ResponsiveButton";
import useDeviceInfo from "./_hooks/useDeviceInfo";
import useWaitingModal from "./_hooks/useWaitingModal";
import { waitingQueries } from "./_queries/useWaiting";
import { useWaitingSSE } from "./_hooks/useWaitingSSE";

const WaitingSection = dynamic(() => import("./_components/WaitingSection"), {
  ssr: false,
});

export default function Waiting() {
  const navigate = useRouter();
  const { deviceInfo, isLoading } = useDeviceInfo();
  const { handleOpenModal } = useWaitingModal();
  const [orderNotificationCount, setOrderNotificationCount] = useState(0);

  const waitingEnabled = !!deviceInfo?.deviceId && !isLoading;
  const { data: list } = waitingQueries.useWaitingList(waitingEnabled);

  const incrementOrderNotification = () => {
    setOrderNotificationCount((prev) => prev + 1);
  };

  useWaitingSSE({
    onOrderReceived: incrementOrderNotification,
  });

  return (
    <div className="min-h-screen w-screen bg-gray-700">
      <header className="fixed flex w-full flex-col gap-6 bg-gray-700 px-15 pt-10">
        <div className="flex w-full flex-row items-center justify-between">
          <strong className="text-3xl font-bold">웨이팅 관리</strong>
          <div className="relative flex">
            <ResponsiveButton
              color="grey"
              responsiveButtons={{
                lg: {
                  buttonSize: "xl",
                  className: "bg-gray-300 text-white text-lg font-semibold",
                },
              }}
              onClick={() => navigate.push("/hall")}
            >
              홀 화면 이동
            </ResponsiveButton>
            {orderNotificationCount > 0 && (
              <div className="bg-primary center absolute -top-5 -right-5 h-10 w-10 rounded-full text-xl font-semibold text-white">
                {orderNotificationCount}
              </div>
            )}
          </div>
        </div>
        <div className="h-[1px] w-full bg-gray-300" />
      </header>
      <div className="flex w-full flex-row gap-4 px-15 pt-38 pb-8">
        <section className="flex w-full flex-row gap-[25px]">
          <div className="flex w-12 flex-col gap-4">
            {list?.waitings?.map((item, index) => (
              <div
                className="center relative h-[225px] w-12"
                key={item.waitingId}
              >
                {index !== (list?.waitings?.length ?? 0) - 1 && (
                  <div className="absolute top-36 bottom-0 left-1/2 z-0 h-45 w-[2px] -translate-x-1/2 bg-gray-100" />
                )}
                <div className="center text- h-12 w-12 rounded-full bg-gray-100 text-xl font-semibold text-white">
                  {String(index + 1).padStart(3, "0")}
                </div>
              </div>
            ))}
          </div>
          <div className="flex w-full flex-col gap-4">
            {list?.waitings?.map((item) => (
              <div
                className="flex h-[225px] w-full flex-row gap-2"
                key={item.waitingId}
              >
                <div className="flex w-[160px] flex-col items-center justify-center gap-2 rounded-2xl bg-white">
                  <span className="text-lg font-medium">대기 번호</span>
                  <strong className="text-4xl font-bold">
                    {String(item.number).padStart(3, "0")}
                  </strong>
                </div>
                <WaitingSection
                  {...item}
                  onCall={() => handleOpenModal("call", item)}
                  onCancel={() => handleOpenModal("cancel", item)}
                  onEnterance={() => handleOpenModal("complete", item)}
                />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
