"use client";

import QueryProviders from "@/app/query-providers";
import InfoPopup from "@/components/InfoPopup";
import useOverlay from "@/hooks/use-overlay";
import useEscapeKey from "@/hooks/useEscapeKey";
import useOutsideClick from "@/hooks/useOutSideClick";
import Image from "next/image";
import { useRef } from "react";

export default function PageTitle({ title }: { title: string }) {
  const ref = useRef<HTMLButtonElement>(null);

  const { open, close } = useOverlay();

  useOutsideClick({ ref, handler: close });
  useEscapeKey({ handler: close });

  const handleOpenPopup = () => {
    open(() => (
      <QueryProviders>
        <InfoPopup close={() => close} />
      </QueryProviders>
    ));
  };

  return (
    <div className="sticky top-0 z-100 hidden w-full items-center justify-between border-b border-gray-600 bg-white pb-3 md:flex lg:pt-8 lg:pb-[26px]">
      <h2 className="text-[18px] font-bold md:text-[16px] lg:text-[28px]">
        {title}
      </h2>
      <button
        type="button"
        ref={ref}
        className="center relative h-8 w-8 rounded-[12px] border border-gray-400 lg:h-12 lg:w-12 lg:rounded-[16px]"
        onClick={handleOpenPopup}
      >
        <Image
          src="/icons/user.svg"
          alt="사이드 메뉴"
          width={24}
          height={24}
          className="md:h-6 md:w-6 lg:h-8 lg:w-8"
        />
      </button>
    </div>
  );
}
