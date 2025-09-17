"use client";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/common/InputOtp";
import { useRef, useState } from "react";
import Button from "@/components/common/Button/Button";
import { useRouter } from "next/navigation";
import Spinner from "@/components/common/Spinner";
import PublicComponent from "../PublicComponent";
import { publicQueries } from "../../../_queries/usePublic";

interface IProps {
  storeId: string;
  publicAccessKey: string;
  phone: string; // 01012341234
}

export default function CancelTurnPage({
  storeId,
  publicAccessKey,
  phone,
}: IProps) {
  const inputOTPRef = useRef<HTMLInputElement>(null);
  const navigate = useRouter();

  const cancelMyTurn = publicQueries.useCancelMyTurn();
  const [otpValue, setOtpValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCancel = () => {
    if (phone.slice(-4) !== otpValue) {
      // eslint-disable-next-line
      alert("전화번호가 일치하지 않습니다.");
      setOtpValue("");

      setTimeout(() => {
        const firstInput = inputOTPRef.current?.querySelector("input");
        firstInput?.focus();
      }, 0);

      return;
    }

    setIsSubmitting(true);
    cancelMyTurn.mutate(
      {
        storeId,
        accessKey: publicAccessKey,
      },
      {
        onSuccess: () => navigate.push("/result?type=cancel"),
        onSettled: () => setIsSubmitting(false),
      }
    );
  };

  const handleClose = () => {
    window.location.href = "kakaotalk://inappbrowser/close";
    setOtpValue("");
  };

  return (
    <div className="center h-dvh w-dvw">
      <PublicComponent
        title={`웨이팅 등록을\n취소하시겠습니까?`}
        subtitle={`웨이팅을 취소하면 다시 처음부터 대기해야 합니다.\n취소하시려면 전화번호 끝자리를 입력해주세요.`}
      >
        <div className="flex w-full justify-center">
          <InputOTP
            ref={inputOTPRef}
            maxLength={4}
            value={otpValue}
            onChange={setOtpValue}
          >
            <InputOTPGroup className="flex items-center gap-3">
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
            </InputOTPGroup>
          </InputOTP>
        </div>
      </PublicComponent>
      <div className="absolute bottom-5 flex w-full gap-2 px-5">
        <Button
          color="grey"
          className="button-lg w-20"
          onClick={handleClose}
          disabled={isSubmitting}
        >
          닫기
        </Button>
        <Button
          color="primary"
          className="button-lg w-full"
          onClick={handleCancel}
          disabled={isSubmitting}
        >
          {isSubmitting ? <Spinner /> : "웨이팅 취소"}
        </Button>
      </div>
    </div>
  );
}
