import Icon from "@/components/common/Icon";
import ResponsiveButton from "@/components/common/Button/ResponsiveButton";
import ModalWithTitle from "@/components/modal/largeModalLayout";
import transformPhoneNumber from "@/lib/formatting/transformPhoneNumber";
import getQueryClient from "@/app/get-query-client";
import useWaiting from "../_hooks/useWaiting";
import useElapsedMinutes from "../_hooks/useElapsedMinutes";

interface IProps extends Waiting {
  close: () => void;
  type: "call" | "complete" | "cancel";
}

const queryClient = getQueryClient();

export default function WaitingModal({ close, type, ...waiting }: IProps) {
  const { mutateAction } = useWaiting();
  const elapsedCreatedAt = useElapsedMinutes(waiting.createdAt);
  const elapsedLastCall = useElapsedMinutes(waiting.lastCallTime);

  const handleTitle = () => {
    if (type === "call") return "호출";
    if (type === "complete") return "입장";
    if (type === "cancel") return "취소";
    return "";
  };

  const handleCall = () => {
    mutateAction(
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
        <div className="flex h-[275px] flex-row items-center gap-4 rounded-[24px] bg-gray-700 p-5">
          <div className="flex flex-1 flex-col items-center gap-4">
            <span className="text-lg font-medium">대기 번호</span>
            <strong className="text-4xl font-bold">
              {String(waiting.number).padStart(3, "0")}
            </strong>
          </div>
          <div className="flex h-full w-[308px] flex-col rounded-[24px] bg-white p-5">
            <div className="flex h-10 w-fit flex-row items-center justify-center rounded-[24px] bg-gray-700 px-3 py-2">
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
            <strong className="mt-3 text-[28px] font-bold">
              총 {waiting.adult + waiting.infant}명
            </strong>
            <div className="mt-6 flex flex-col gap-3">
              <strong className="text-gray-0 decoration-gray-0 text-xl font-semibold underline decoration-1 underline-offset-[8px]">
                {transformPhoneNumber(waiting.phoneNumber)}
              </strong>
              <div className="flex w-fit flex-row gap-3 rounded-[8px] bg-gray-700 px-4 py-[6px]">
                <span className="text-gray-0 text-lg font-semibold">
                  {elapsedCreatedAt}분 경과
                </span>
                <span className="text-status-error text-lg font-semibold">
                  {waiting.createdAt.split(" ")[1]}
                </span>
              </div>
            </div>
          </div>
        </div>
        {type === "call" && (
          <div className="mt-2 flex flex-row gap-2">
            <ResponsiveButton
              responsiveButtons={{
                lg: {
                  buttonSize: "xl",
                  className:
                    "!border-gray-700 bg-gray-700 rounded-[12px] px-5 py-3 flex items-center justify-between !text-gray-0 w-full",
                },
              }}
            >
              <span className="text-base">총 호출한 횟수</span>
              <span className="text-lg">{waiting.callCount}회</span>
            </ResponsiveButton>
            {elapsedLastCall <= 100 && (
              <ResponsiveButton
                variant="outline"
                color="primary"
                responsiveButtons={{
                  lg: {
                    buttonSize: "xl",
                    className:
                      "rounded-[12px] px-[20px] py-[12px] flex items-center justify-between !text-status-error w-full !border-status-error",
                  },
                }}
              >
                <span className="text-base">마지막 호출 시간</span>
                <span className="text-lg">{elapsedLastCall}분 전</span>
              </ResponsiveButton>
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
        }}
        cancelBtn={{ text: "닫기", onClick: close, disabled: false }}
      />
    </ModalWithTitle>
  );
}
