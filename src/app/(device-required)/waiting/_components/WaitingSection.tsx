"use client";

import Icon from "@/components/common/Icon";
import transformPhoneNumber from "@/lib/formatting/transformPhoneNumber";
import ActionButton from "./ActionButton";
import useElapsedMinutes from "../_hooks/useElapsedMinutes";

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

  return (
    <div className="flex flex-1 flex-row items-center justify-between rounded-[16px] bg-white px-10 py-8">
      <div>
        <div className="mb-4 flex h-10 w-fit flex-row items-center justify-center rounded-[24px] bg-gray-700 px-3 py-2">
          <div className="flex flex-row items-center">
            <Icon iconKey="smile" />
            <span>성인 {waiting.adult}</span>
          </div>
          {waiting.infant > 0 && (
            <>
              <div className="mx-3 h-[16px] w-[1px] bg-gray-100" />
              <div className="flex flex-row items-center">
                <Icon iconKey="baby" />
                <span className="mt-[1px]">아동 {waiting.infant}</span>
              </div>
            </>
          )}
        </div>
        <strong className="text-3xl font-bold">
          총 {waiting.adult + waiting.infant}명
        </strong>
        <div className="mt-6 flex flex-row items-center gap-6">
          <strong className="text-gray-0 decoration-gray-0 decoration-1.5 text-xl underline underline-offset-[8px]">
            {transformPhoneNumber(waiting.phoneNumber)}
          </strong>
          <div className="flex flex-row gap-2 rounded-[8px] bg-gray-700 px-4 py-[6px]">
            <span className="text-gray-0 text-lg font-semibold">
              {elapsedMinutes}분 경과
            </span>
            <span className="text-status-error text-lg font-semibold">
              {waiting.createdAt.split(" ")[1]}
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-5">
        <ActionButton
          type="button"
          iconKey="bell"
          className="text-white"
          text="호출"
          onClick={onCall}
        />
        <ActionButton
          type="button"
          iconKey="door-open"
          variant="outline"
          color="primary"
          className="text-primary"
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
