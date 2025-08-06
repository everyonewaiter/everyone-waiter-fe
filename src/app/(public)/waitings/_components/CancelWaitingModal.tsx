"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Alert from "@/components/common/Alert/Alert";
import CancelWaiting from "./CancelWaiting";

interface IProps {
  close: () => void;
}

export default function CancelWaitingModal({ close }: IProps) {
  const navigate = useRouter();

  const [value, setValue] = useState("");

  const handleCancel = () => {
    // api
    navigate.push("/waitings/result");
  };

  return (
    <Alert
      onClose={close}
      onAction={handleCancel}
      buttonText="웨이팅 취소"
      buttonColor="primary"
      layoutClassName="!w-[320px]"
      customButtonStyle="!h-10"
    >
      <CancelWaiting value={value} onChange={setValue} />
    </Alert>
  );
}
