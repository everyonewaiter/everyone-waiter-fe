"use client";

import Button from "@/components/common/Button/Button";
import PublicComponent from "../PublicComponent";
import { publicQueries } from "../../../_queries/usePublic";

interface IProps {
  storeId: string;
  key: string;
}

export default function MyTurnPage({ storeId, key }: IProps) {
  const { data } = publicQueries.useCheckWaiting(storeId, key);

  const barWidth = 320;

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
