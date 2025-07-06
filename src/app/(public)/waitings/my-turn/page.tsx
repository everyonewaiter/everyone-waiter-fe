"use client";

import QueryProviders from "@/app/query-providers";
import Button from "@/components/common/Button/Button";
import useOverlay from "@/hooks/use-overlay";
import Image from "next/image";
import CancelWaitingModal from "../_components/CancelWaitingModal";

export default function Page() {
  const { open, close } = useOverlay();

  const handleCancelModal = () => {
    open(() => (
      <QueryProviders>
        <CancelWaitingModal close={close} />
      </QueryProviders>
    ));
  };

  return (
    <>
      <div className="flex w-full flex-col items-center gap-8 px-5">
        <Image
          src="/logo/logo-medium.svg"
          alt="로고"
          width={100}
          height={100}
        />
        <div className="flex w-full flex-col">
          <h1 className="text-gray-0 text-center text-[28px] font-bold">
            고객님 앞에
            <br />
            <span className="text-primary">10팀이</span> 대기 중입니다.
          </h1>
          <div className="relative mt-17 w-full">
            {/* 말풍선 + 세모 */}
            <div
              className="absolute -top-[40px] flex w-full flex-col items-center items-end"
              style={{
                left: "calc(100% * (1 - 0.71 + 0.02))",
                transform: "translateX(-50%)",
              }}
            >
              <div className="bg-primary w-fit rounded-[24px] px-3 py-2 text-xs font-semibold text-white">
                조금 있으면 입장할 수 있어요!
              </div>
              <svg
                width="44"
                height="10"
                viewBox="0 0 44 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20 0H0L7.43139 7.21282C9.01714 8.75193 11.5505 8.71354 13.0889 7.12708L20 0Z"
                  fill="#F22020"
                />
              </svg>
            </div>

            {/* 진행 바 */}
            <div className="relative mt-2">
              <div className="h-[6px] w-full rounded-[24px] bg-gray-700" />
              <div className="bg-primary absolute top-0 h-[6px] w-[calc(100%*0.71)] rounded-[24px]">
                <div
                  className="bg-primary absolute -top-[2px] right-0 h-[10px] w-[10px] rounded-full outline-[5px]"
                  style={{ outlineColor: "rgba(242, 32, 32, 0.08)" }}
                />
              </div>
            </div>
          </div>
          <div className="mt-6 flex flex-col gap-2">
            <div className="flex h-[51px] w-full items-center justify-between rounded-[16px] bg-gray-700 px-4 text-[15px]">
              예상 대기시간
              <strong className="text-lg font-semibold">24분</strong>
            </div>
            <div className="flex h-[51px] w-full items-center justify-between rounded-[16px] bg-gray-700 px-4 text-[15px]">
              예상 대기시간
              <strong className="text-lg font-semibold">24분</strong>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-5 w-full px-5">
        <Button
          className="button-lg w-full"
          color="black"
          onClick={handleCancelModal}
        >
          대기 취소하기
        </Button>
      </div>
    </>
  );
}
