"use client";

import ResponsiveButton from "@/components/common/ResponsiveButton";
import useOverlay from "@/hooks/use-overlay";
import QueryProviders from "@/app/query-providers";
import { useRouter } from "next/navigation";
import WaitingModal from "./_components/WaitingModal";
import WaitingSection from "./_components/WaitingSection";

const dummy: Waiting[] = [
  {
    waitingId: BigInt("694865267482835533"),
    phoneNumber: "01044591812",
    adult: 2,
    infant: 0,
    number: 1,
    callCount: 0,
    lastCallTime: "1970-01-01 00:00:00",
    state: "REGISTRATION",
    createdAt: "2025-01-01 12:00:00",
  },
  {
    waitingId: BigInt("694865267482835536"),
    phoneNumber: "01044591813",
    adult: 2,
    infant: 1,
    number: 1,
    callCount: 0,
    lastCallTime: "1970-01-01 00:00:00",
    state: "REGISTRATION",
    createdAt: "2025-01-01 12:00:00",
  },
];

export default function Waiting() {
  const navigate = useRouter();
  const { open, close } = useOverlay();

  const handleOpenModal = (type: "call" | "enter" | "cancel") => {
    open(() => (
      <QueryProviders>
        <WaitingModal close={close} type={type} />
      </QueryProviders>
    ));
  };

  return (
    <div className="min-h-screen w-screen bg-gray-700">
      <header className="fixed flex w-full flex-col gap-6 bg-gray-700 px-15 pt-10">
        <div className="flex w-full flex-row items-center justify-between">
          <strong className="text-3xl font-bold">웨이팅 관리</strong>
          <div className="relative">
            <ResponsiveButton
              color="grey"
              responsiveButtons={{
                lg: {
                  buttonSize: "xl",
                  className: "bg-gray-300 text-white text-lg font-semibold",
                },
              }}
              onClick={() => navigate.push("/control/hall")}
            >
              홀 화면 이동
            </ResponsiveButton>
            <div className="bg-primary center absolute -top-5 -right-5 h-10 w-10 rounded-full text-xl font-semibold text-white">
              4
            </div>
          </div>
        </div>
        <div className="h-[1px] w-full bg-gray-300" />
      </header>
      <div className="flex w-full flex-row gap-4 px-15 pt-38 pb-8">
        <section className="flex w-full flex-row gap-[25px]">
          <div className="flex w-12 flex-col gap-4">
            {dummy.map((item, index) => (
              <div
                className="center relative h-[225px] w-12"
                key={item.waitingId}
              >
                {index !== dummy.length - 1 && (
                  <div className="absolute top-36 bottom-0 left-1/2 z-0 h-45 w-[2px] -translate-x-1/2 bg-gray-100" />
                )}
                <div className="center text- h-12 w-12 rounded-full bg-gray-100 text-xl font-semibold text-white">
                  {String(index + 1).padStart(2, "0")}
                </div>
              </div>
            ))}
          </div>
          <div className="flex w-full flex-col gap-4">
            {dummy.map((item, index) => (
              <div
                className="flex h-[225px] w-full flex-row gap-2"
                key={item.waitingId}
              >
                <div className="flex w-[160px] flex-col items-center justify-center gap-2 rounded-[16px] bg-white">
                  <span className="text-lg font-medium">대기 번호</span>
                  <strong className="text-4xl font-bold">
                    {String(index + 1).padStart(3, "0")}
                  </strong>
                </div>
                <WaitingSection
                  {...item}
                  onCall={() => handleOpenModal("call")}
                  onCancel={() => handleOpenModal("cancel")}
                  onEnterance={() => handleOpenModal("enter")}
                />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
