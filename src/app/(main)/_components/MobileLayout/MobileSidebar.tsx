"use client";

import { CloseIcon } from "@/components/common/Icon/index";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { useModalCloseTriggers } from "@/hooks/useModalCloseTriggers";
import { useStoreContext } from "@/providers/storeProvider";
import Image from "next/image";
import MobileSidebarSection from "./MobileSidebarSection";

interface IProps {
  onClose: () => void;
}

export default function MobileSidebar({ onClose }: IProps) {
  const navigate = useRouter();
  const ref = useRef<HTMLDivElement>(null);

  const { storeId } = useStoreContext();

  useModalCloseTriggers({ ref, onClose });

  return (
    <div className="bg-opacity-100 fixed inset-0 z-[9998] flex backdrop-blur-sm md:hidden">
      <aside
        ref={ref}
        className="relative flex h-screen w-[284px] flex-col overflow-auto rounded-tr-[10px] rounded-br-[10px] bg-white stroke-gray-600 px-4"
      >
        <div className="flex w-full items-center justify-between pt-5 pb-4">
          <button
            type="button"
            className="flex items-center gap-3"
            onClick={() => {
              navigate.push(`/${storeId}`);
              onClose();
            }}
          >
            <Image src="/logo/logo.svg" width={40} height={40} alt="로고" />
            <h1 className="font-hakgyo text-primary text-[16px] lg:text-2xl">
              모두의 웨이터
            </h1>
          </button>
          <button type="button" onClick={onClose}>
            <CloseIcon color="#222" width={24} height={24} strokeWidth="1.5" />
          </button>
        </div>
        <div className="mb-4 h-[1px] bg-gray-600" />
        <div className="flex flex-col gap-5">
          <MobileSidebarSection onClose={onClose} />
        </div>
      </aside>
    </div>
  );
}
