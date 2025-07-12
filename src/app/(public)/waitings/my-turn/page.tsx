"use client";

import cn from "@/lib/utils";
import Button from "@/components/common/Button/Button";
import useOverlay from "@/hooks/use-overlay";
import PublicComponent from "../_components/PublicComponent";
import WaitingCancelModal from "../_components/WaitingCancelModal";

export default function Page() {
  const initNumber = 32;
  const currentNumber = 1;
  const barWidth = 320;
  const progress = (initNumber - currentNumber) / initNumber;
  const positionPx = progress * barWidth;

  const { open, close } = useOverlay();

  const handleCancel = () => {
    open(() => <WaitingCancelModal close={close} />);
  };

  return (
    <div className="center h-screen w-screen">
      <PublicComponent
        title={
          <span>
            고객님 앞에
            <br />
            <span className="text-primary">{currentNumber}팀이</span> 대기
            중입니다.
          </span>
        }
      >
        <div
          className="relative mx-auto -mt-3 flex flex-col"
          style={{ width: barWidth }}
        >
          <div
            className={cn(
              "flex w-full flex-col",
              currentNumber <= 2 ? "items-end" : ""
            )}
          >
            {currentNumber <= 2 && (
              <div
                className={cn(
                  "bg-primary -mb-[1px] w-fit rounded-[24px] px-3 py-2 text-xs font-semibold text-white",
                  currentNumber === 1 ? "-mr-4" : "-mr-2"
                )}
              >
                매장 앞으로 와주세요!
              </div>
            )}
            {currentNumber > 2 && (
              <div
                className="bg-primary -mb-[1px] w-fit rounded-[24px] px-3 py-2 text-xs font-semibold text-white"
                style={{
                  marginLeft:
                    currentNumber <= 5 ? positionPx - 98 : positionPx - 134,
                }}
              >
                {currentNumber <= 5
                  ? "매장 앞으로 와주세요!"
                  : "조금 있으면 입장할 수 있어요!"}
              </div>
            )}
          </div>
          <div className="mb-1.5" style={{ marginLeft: positionPx - 15 }}>
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
          <div className="relative mx-auto" style={{ width: barWidth }}>
            <div className="h-[6px] w-full rounded-[24px] bg-gray-700" />
            <div
              className="bg-primary absolute top-0 left-0 h-[6px] w-[60px] max-w-full rounded-[24px]"
              style={{ width: positionPx }}
            >
              <div className="bg-primary absolute -top-[2px] right-0 h-[10px] w-[10px] rounded-full ring-[5px] ring-[#F2202014]" />
            </div>
          </div>
        </div>
        <div
          className="mx-auto flex flex-col gap-2"
          style={{ width: barWidth }}
        >
          <div className="flex w-full items-center justify-between rounded-[16px] bg-gray-700 px-4 py-3 text-[15px] font-medium">
            예상 대기시간
            <strong className="text-lg font-semibold">24분</strong>
          </div>
          <div className="flex w-full items-center justify-between rounded-[16px] bg-gray-700 px-4 py-3 text-[15px] font-medium">
            내 대기번호
            <strong className="text-lg font-semibold">78번</strong>
          </div>
        </div>
      </PublicComponent>
      <div className="absolute bottom-5 flex w-full gap-2 px-5">
        <Button
          color="black"
          className="button-lg w-full"
          onClick={handleCancel}
        >
          대기 취소하기
        </Button>
      </div>
    </div>
  );
}
