"use client";

import Button from "@/components/common/Button/Button";
import cn from "@/lib/utils";
import PublicComponent from "../PublicComponent";
import { publicQueries } from "../../../_queries/usePublic";

interface IProps {
  storeId: string;
  publicAccessKey: string;
}

export default function MyTurnPage({ storeId, publicAccessKey }: IProps) {
  const { data } = publicQueries.useCheckWaiting(storeId, publicAccessKey);

  const initNumber = data?.initWaitingTeamCount!;
  const currentNumber = data?.currentWaitingTeamCount!;
  const barWidth = 320;
  const progress = (initNumber - currentNumber) / initNumber;
  const positionPx = progress * barWidth;

  return (
    <div className="center h-dvh w-dvw">
      <PublicComponent
        title={
          <span>
            고객님 앞에
            <br />
            <span className="text-primary">
              {data?.currentWaitingTeamCount}팀이
            </span>{" "}
            대기 중입니다.
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
                  "bg-primary -mb-[1px] w-fit rounded-3xl px-3 py-2 text-xs font-semibold text-white",
                  currentNumber <= 1 ? "-mr-4" : "-mr-2"
                )}
              >
                매장 앞으로 와주세요!
              </div>
            )}
            {currentNumber > 2 && (
              <div
                className="bg-primary -mb-[1px] w-fit rounded-3xl px-3 py-2 text-xs font-semibold text-white"
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
          <div
            className="mb-1.5"
            style={{
              marginLeft: currentNumber <= 1 ? barWidth - 15 : positionPx,
            }}
          >
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
            <div className="h-[6px] w-full rounded-3xl bg-gray-700" />
            <div
              className="bg-primary absolute top-0 left-0 h-[6px] max-w-full rounded-3xl"
              style={{ width: currentNumber <= 1 ? barWidth : positionPx }}
            >
              <div className="bg-primary absolute -top-[2px] right-0 h-[10px] w-[10px] rounded-full ring-[5px] ring-[#F2202014]" />
            </div>
          </div>
        </div>
        <div
          className="mx-auto flex flex-col gap-2"
          style={{ width: barWidth }}
        >
          <div className="flex w-full items-center justify-between rounded-2xl bg-gray-700 px-4 py-3 text-[15px] font-medium">
            내 대기번호
            <strong className="text-lg font-semibold">{data?.number}번</strong>
          </div>
        </div>
      </PublicComponent>
      <div className="absolute bottom-5 flex w-full gap-2 px-5">
        <Button
          color="grey"
          className="button-lg w-full"
          onClick={() => {
            window.location.href = "kakaotalk://inappbrowser/close";
          }}
        >
          닫기
        </Button>
      </div>
    </div>
  );
}
