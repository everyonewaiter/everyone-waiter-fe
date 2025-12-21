"use client";

import Button from "@/components/common/Button/Button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/common/InputOtp";
import ModalWithTitle from "@/components/modal/largeModalLayout";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { publicQueries } from "../../_queries/usePublic";

interface IProps {
  close: () => void;
  storeId: string;
  key: string;
}

export default function WaitingCancelModal({ close, storeId, key }: IProps) {
  const navigate = useRouter();

  const [otpValue, setOtpValue] = useState("");
  const cancelMyTurn = publicQueries.useCancelMyTurn();

  const handleCancel = () => {
    // TODO: optValue를 안 보냄
    cancelMyTurn.mutate(
      {
        storeId,
        accessKey: key,
      },
      {
        onSuccess: () => {
          navigate.push(`/waitings/result?type=success&storeId=${storeId}`);
        },
      }
    );
  };

  return (
    <ModalWithTitle
      onClose={close}
      title=""
      className="flex flex-col items-center justify-between gap-12 rounded-[20px] px-4 py-5"
    >
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-3">
          <h1 className="text-gray-0 text-center text-xl font-semibold whitespace-pre-line">{`웨이팅 등록을\n취소하시겠습니까?`}</h1>
          <span className="font-regular text-center text-sm whitespace-pre-line text-gray-300">{`웨이팅을 취소하면 다시 처음부터 대기해야합니다.\n취소하시려면 아래 대기번호를 입력해주세요.`}</span>
        </div>
        <div className="flex w-full justify-center">
          <InputOTP maxLength={2} value={otpValue} onChange={setOtpValue}>
            <InputOTPGroup className="flex items-center gap-3">
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
            </InputOTPGroup>
          </InputOTP>
        </div>
      </div>
      <div className="flex w-full gap-2">
        <Button color="grey" className="button-sm h-10 w-25" onClick={close}>
          닫기
        </Button>
        <Button
          color="primary"
          className="button-sm h-10 w-full"
          onClick={handleCancel}
        >
          웨이팅 취소
        </Button>
      </div>
    </ModalWithTitle>
  );
}
