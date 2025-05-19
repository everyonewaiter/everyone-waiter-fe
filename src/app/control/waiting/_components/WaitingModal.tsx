import Icon from "@/components/common/Icon";
import ResponsiveButton from "@/components/common/ResponsiveButton";
import ModalWithTitle from "@/components/modal/largeModalLayout";
import transformPhoneNumber from "@/lib/formatting/transformPhoneNumber";

interface IProps {
  close: () => void;
  type: "call" | "enter" | "cancel";
  // waitingId: bigint;
}

export default function WaitingModal({ close, type }: IProps) {
  const [adult, infant] = [2, 1];

  const handleTitle = () => {
    if (type === "call") {
      return "호출";
    }
    if (type === "enter") {
      return "입장";
    }
    if (type === "cancel") {
      return "취소";
    }
    return "";
  };

  const handleCall = () => {};

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
            <strong className="text-4xl font-bold">001</strong>
          </div>
          <div className="flex h-full w-[308px] flex-col rounded-[24px] bg-white p-5">
            <div className="flex h-10 w-fit flex-row items-center justify-center rounded-[24px] bg-gray-700 px-3 py-2">
              <div className="flex flex-row items-center">
                <Icon iconKey="smile" className="mt-[7px]" />
                <span>성인 {adult}</span>
              </div>
              {infant > 0 && (
                <>
                  <div className="mx-3 h-[16px] w-[1px] bg-gray-100" />
                  <div className="flex flex-row items-center">
                    <Icon iconKey="baby" className="mt-2" />
                    <span className="mt-[1px]">아동 {infant}</span>
                  </div>
                </>
              )}
            </div>
            <strong className="mt-3 text-[28px] font-bold">
              총 {adult + infant}명
            </strong>
            <div className="mt-6 flex flex-col gap-3">
              <strong className="text-gray-0 decoration-gray-0 text-xl font-semibold underline decoration-1 underline-offset-[8px]">
                {transformPhoneNumber("01012345678")}
              </strong>
              <div className="flex w-fit flex-row gap-3 rounded-[8px] bg-gray-700 px-4 py-[6px]">
                <span className="text-gray-0 text-lg font-semibold">
                  24분 경과
                </span>
                <span className="text-status-error text-lg font-semibold">
                  15:14:24
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
                    "bg-gray-700 rounded-[12px] px-5 py-3 flex items-center justify-between !text-gray-0 w-full",
                },
              }}
            >
              <span className="text-base">총 호출한 횟수</span>
              <span className="text-lg">6회</span>
            </ResponsiveButton>
            <ResponsiveButton
              variant="outline"
              color="outline-primary"
              responsiveButtons={{
                lg: {
                  buttonSize: "xl",
                  className:
                    "rounded-[12px] px-[20px] py-[12px] flex items-center justify-between !text-status-error w-full !border-status-error",
                },
              }}
            >
              <span className="text-base">마지막 호출 시간</span>
              <span className="text-lg">15분 전</span>
            </ResponsiveButton>
          </div>
        )}
        <div className="font-regular text-gray-0 my-10 text-center text-lg">
          {type === "enter" ? (
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
          onClick: handleCall,
          disabled: false,
        }}
        cancelBtn={{ text: "닫기", onClick: close, disabled: false }}
      />
    </ModalWithTitle>
  );
}
