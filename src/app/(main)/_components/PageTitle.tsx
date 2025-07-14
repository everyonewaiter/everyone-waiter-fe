"use client";

import { useRef } from "react";
import QueryProviders from "@/app/query-providers";
import InfoPopup from "@/components/InfoPopup";
import Icon from "@/components/common/Icon";
import useOverlay from "@/hooks/use-overlay";
import { useModalCloseTriggers } from "@/hooks/useModalCloseTriggers";

export default function PageTitle({ title }: { title: string }) {
  const ref = useRef<HTMLButtonElement>(null);

  const { open, close } = useOverlay();

  useModalCloseTriggers({ ref, onClose: close });

  const handleOpenPopup = () => {
    open(() => (
      <QueryProviders>
        <InfoPopup close={() => close} />
      </QueryProviders>
    ));
  };

  return (
    <div className="z-50 flex w-full flex-col bg-white md:gap-2 lg:gap-5">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-[18px] font-bold md:text-[16px] lg:text-[28px]">
          {title}
        </h1>
        <button
          type="button"
          ref={ref}
          className="center relative h-8 w-8 rounded-[12px] border border-gray-400 lg:h-12 lg:w-12 lg:rounded-[16px]"
          onClick={handleOpenPopup}
          aria-label="프로필 메뉴 열기"
        >
          <Icon
            iconKey="user"
            size={24}
            className="md:h-6 md:w-6 lg:h-8 lg:w-8"
          />
        </button>
      </div>
      <div className="h-[1px] w-full bg-gray-600" />
    </div>
  );
}
