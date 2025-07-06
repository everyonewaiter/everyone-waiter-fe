"use client";

import { useState } from "react";
import Image from "next/image";
import Button from "@/components/common/Button/Button";
import CancelWaiting from "../_components/CancelWaiting";

export default function Page() {
  const [value, setValue] = useState("");

  const handleCancel = () => {};

  return (
    <>
      <div className="flex w-full flex-col items-center gap-8 px-5">
        <Image
          src="/logo/logo-medium.svg"
          alt="로고"
          width={100}
          height={100}
        />
        <CancelWaiting value={value} onChange={setValue} />
      </div>
      <div className="absolute bottom-5 flex w-full gap-2 px-5">
        <Button
          className="button-lg !w-[80px]"
          color="grey"
          onClick={() => {
            // window.close();
            window.location.href = "kakaotalk://inappbrowser/close";
          }}
        >
          닫기
        </Button>
        <Button
          className="button-lg flex-1"
          color="primary"
          onClick={handleCancel}
        >
          웨이팅 취소
        </Button>
      </div>
    </>
  );
}
