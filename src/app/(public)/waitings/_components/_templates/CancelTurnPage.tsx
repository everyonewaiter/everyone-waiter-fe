"use client";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/common/InputOtp";
import { useState } from "react";
import Button from "@/components/common/Button/Button";
import { useRouter } from "next/navigation";
import PublicComponent from "../PublicComponent";
import { publicQueries } from "../../../_queries/usePublic";

interface IProps {
  storeId: string;
  accessKey: string;
  number: string;
}

export default function CancelTurnPage({ storeId, accessKey, number }: IProps) {
  const navigate = useRouter();

  const cancelMyTurn = publicQueries.useCancelMyTurn();

  const [otpValue, setOtpValue] = useState("");

  const handleCancel = () => {
    if (number !== otpValue) {
      // eslint-disable-next-line
      alert("대기번호가 일치하지 않습니다.");
      return;
    }

    cancelMyTurn.mutate(
      {
        storeId,
        accessKey,
      },
      {
        onSuccess: () => navigate.push("/result?type=cancel"),
      }
    );
  };

  return (
    <div className="center h-dvh w-dvw">
      <PublicComponent
        title={`웨이팅 등록을\n취소하시겠습니까?`}
        subtitle={`웨이팅을 취소하면 다시 처음부터 대기해야 합니다.\n취소하시려면 아래 대기번호를 입력해주세요.`}
      >
        <div className="flex w-full justify-center">
          <InputOTP maxLength={2} value={otpValue} onChange={setOtpValue}>
            <InputOTPGroup className="flex items-center gap-3">
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
            </InputOTPGroup>
          </InputOTP>
        </div>
      </PublicComponent>
      <div className="absolute bottom-5 flex w-full gap-2 px-5">
        <Button
          color="grey"
          className="button-lg w-20"
          onClick={() => {
            window.location.href = "kakaotalk://inappbrowser/close";
          }}
        >
          닫기
        </Button>
        <Button
          color="primary"
          className="button-lg w-full"
          onClick={handleCancel}
        >
          웨이팅 취소
        </Button>
      </div>
    </div>
  );
}
