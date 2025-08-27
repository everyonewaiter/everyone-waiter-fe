import getQueryClient from "@/app/get-query-client";
import Icon from "@/components/common/Icon/Icon";
import ModalWithTitle from "@/components/modal/largeModalLayout";
import transformPhoneNumber from "@/lib/formatting/transformPhoneNumber";
import useElapsedMinutes from "../_hooks/useElapsedMinutes";
import { waitingQueries } from "../_queries/useWaiting";
import { formatCreatedTime } from "../_utils/formatCreatedTime";
import { getFormattedLastCallTime } from "../_utils/getFormattedLastCallTime";
import { isInitialValue } from "../_utils/isInitialValue";

interface IProps extends Waiting {
  close: () => void;
  type: "call" | "complete" | "cancel";
}

const queryClient = getQueryClient();

export default function WaitingModal({ close, type, ...waiting }: IProps) {
  const action = waitingQueries.useControlWaiting();
  const elapsedCreatedAt = useElapsedMinutes(waiting.createdAt);

  const handleTitle = () => {
    if (type === "call") return "호출";
    if (type === "complete") return "입장";
    if (type === "cancel") return "취소";
    return "";
  };

  const handleCall = () => {
    action.mutate(
      { waitingId: String(waiting.waitingId), type },
      {
        onSuccess: () => {
          close();
          queryClient.invalidateQueries({ queryKey: ["waiting-list"] });
        },
      }
    );
  };

  return (
    <ModalWithTitle
      onClose={close}
      title={`웨이팅 손님 ${handleTitle()}`}
      topRightComponent={<div />}
    >
      <ModalWithTitle.Layout>
        <div className="flex flex-row items-center gap-4 rounded-3xl bg-gray-700 p-5">
          <div className="flex flex-1 flex-col items-center gap-4">
            <span className="text-lg font-medium">대기 번호</span>
            <strong className="text-4xl font-bold">
              {String(waiting.number).padStart(3, "0")}
            </strong>
          </div>
          <div className="flex h-full w-[308px] flex-col rounded-3xl bg-white p-5">
            <div className="flex h-10 w-fit flex-row items-center justify-center rounded-3xl border border-gray-600 bg-gray-700 px-3 py-2">
              <div className="flex flex-row items-center">
                <Icon iconKey="smile" className="h-6 w-6" />
                <span>성인 {waiting.adult}</span>
              </div>
              {waiting.infant > 0 && (
                <>
                  <div className="mx-3 h-4 w-[1px] bg-gray-100" />
                  <div className="flex flex-row items-center">
                    <Icon iconKey="baby" />
                    <span className="mt-[1px]">아동 {waiting.infant}</span>
                  </div>
                </>
              )}
            </div>
            <strong className="mt-3 text-[28px] font-bold">
              총 {waiting.adult + waiting.infant}명
            </strong>
            <div className="mt-4 flex flex-col gap-3">
              <strong className="text-gray-0 decoration-gray-0 w-full text-xl font-semibold underline decoration-1 underline-offset-[8px]">
                {transformPhoneNumber(waiting.phoneNumber)}
              </strong>
              <div className="flex w-full flex-row gap-3 rounded-lg bg-gray-700 px-4 py-[6px]">
                <span className="text-gray-0 text-lg font-semibold">
                  {elapsedCreatedAt.split(":")[0]
                    ? `${elapsedCreatedAt.split(":")[0]}시간 ${elapsedCreatedAt.split(":")[1]}분 경과`
                    : `${elapsedCreatedAt.split(":")[1]}분 경과`}
                </span>
                <span className="text-status-error text-lg font-semibold">
                  {formatCreatedTime(waiting.createdAt)}
                </span>
              </div>
            </div>
          </div>
        </div>
        {type === "call" && (
          <div className="mt-2 flex flex-row gap-2">
            <div className="button-xl !text-gray-0 flex w-[320px] items-center justify-between rounded-xl !border-gray-700 bg-gray-700 !px-5">
              <span className="text-base font-medium">총 호출한 횟수</span>
              <span className="text-xl">{waiting.callCount}회</span>
            </div>
            {!isInitialValue(waiting.lastCallTime) && (
              <div className="button-xl border-status-error flex w-full flex-row items-center justify-between rounded-xl border !px-5">
                <span className="text-status-error text-base font-medium">
                  마지막 호출 시간
                </span>
                <span className="text-status-error text-xl">
                  {getFormattedLastCallTime(new Date(), waiting.lastCallTime)}전
                </span>
              </div>
            )}
          </div>
        )}
        <div className="font-regular text-gray-0 my-10 text-center text-lg">
          {type === "complete" ? (
            <div className="flex flex-col gap-[1px]">
              <span>위 손님이 입장하셨나요?</span>
              <span>입장하셨다면 입장 버튼을 눌러 상태를 바꿔주세요.</span>
            </div>
          ) : (
            <span>{handleTitle()}하시겠습니까?</span>
          )}
        </div>
      </ModalWithTitle.Layout>
      <ModalWithTitle.ButtonGroup
        saveBtn={{
          text: handleTitle(),
          onClick: () => handleCall(),
          disabled: false,
          color: "black",
        }}
        cancelBtn={{ text: "닫기", onClick: close, disabled: false }}
      />
    </ModalWithTitle>
  );
}
