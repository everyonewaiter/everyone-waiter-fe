"use client";

import { useEffect, useState } from "react";
import Icon from "@/components/common/Icon/Icon";
import transformPhoneNumber from "@/lib/formatting/transformPhoneNumber";
import useElapsedMinutes from "../_hooks/useElapsedMinutes";
import ActionButton from "./ActionButton";
import { formatCreatedTime } from "../_utils/formatCreatedTime";
import { getFormattedLastCallTime } from "../_utils/getFormattedLastCallTime";

interface IProps extends Waiting {
  onCall: () => void;
  onEnterance: () => void;
  onCancel: () => void;
}

export default function WaitingSection({
  onCall,
  onEnterance,
  onCancel,
  ...waiting
}: IProps) {
  const elapsedMinutes = useElapsedMinutes(waiting.createdAt);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-1 flex-row items-center justify-between rounded-2xl bg-white px-10 py-8">
      <div>
        <div className="mb-4 flex flex-row items-center gap-4">
          <div className="flex h-10 w-fit flex-row items-center justify-center rounded-3xl bg-gray-700 px-3 py-2">
            <div className="flex flex-row items-center gap-1">
              <Icon iconKey="smile" className="h-6 w-6" />
              <span>성인 {waiting.adult}</span>
            </div>
            {waiting.infant > 0 && (
              <>
                <div className="mx-3 h-4 w-[1px] bg-gray-100" />
                <div className="flex flex-row items-center">
                  <Icon iconKey="baby" className="h-6 w-6" />
                  <span className="mt-[1px]">아동 {waiting.infant}</span>
                </div>
              </>
            )}
          </div>
        </div>
        <strong className="text-3xl font-bold">
          총 {waiting.adult + waiting.infant}명
        </strong>
        <div className="mt-6 flex flex-row items-center gap-6">
          <strong className="text-gray-0 decoration-gray-0 decoration-1.5 text-xl underline underline-offset-[8px]">
            {transformPhoneNumber(waiting.phoneNumber)}
          </strong>
          <div className="flex flex-row gap-2 rounded-lg bg-gray-700 px-4 py-[6px]">
            <span className="text-gray-0 text-lg font-semibold">
              {elapsedMinutes.split(":")[0]
                ? `${elapsedMinutes.split(":")[0]}시간 ${elapsedMinutes.split(":")[1]}분 경과`
                : `${elapsedMinutes.split(":")[1]}분 경과`}
            </span>
            <span className="text-status-error text-lg font-semibold">
              {formatCreatedTime(waiting.createdAt)}
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-5">
        <ActionButton
          type="button"
          iconKey="bell"
          iconClassName="text-white"
          text="호출"
          onClick={onCall}
        >
          <span className="text-sm font-medium text-white">
            총 {waiting.callCount}회 ·{" "}
            {getFormattedLastCallTime(
              currentTime,
              waiting.lastCallTime,
              "minutes"
            )}
            전
          </span>
        </ActionButton>
        <ActionButton
          type="button"
          iconKey="door-open"
          variant="outline"
          color="primary"
          iconClassName="text-primary"
          className="hover:!text-primary hover:bg-transparent"
          text="입장"
          onClick={onEnterance}
        />
        <ActionButton
          type="button"
          iconKey="xcircle"
          color="grey"
          text="취소"
          onClick={onCancel}
        />
      </div>
    </div>
  );
}
