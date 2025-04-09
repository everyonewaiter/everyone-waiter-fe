"use client";

import useEscapeKey from "@/hooks/useEscapeKey";
import useOutsideClick from "@/hooks/useOutSideClick";
import { useRef } from "react";
import { X as CloseIcon } from "lucide-react";
import Image from "next/image";

interface SideBarProps {
  onClose: () => void;
}

export default function Sidebar({ onClose }: SideBarProps) {
  const ref = useRef<HTMLDivElement>(null);

  useOutsideClick({ ref, handler: onClose });
  useEscapeKey({ handler: onClose });

  return (
    <div className="bg-opacity-100 fixed inset-0 z-[9999] flex backdrop-blur-sm md:hidden">
      <aside
        ref={ref}
        className="relative flex h-screen w-[312px] flex-col overflow-auto rounded-tr-[10px] rounded-br-[10px] bg-white px-4 py-[28px]"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex size-9 items-center justify-center rounded-2xl bg-[#F4F4F4]">
              <Image
                src="/images/logo-cloche.svg"
                alt="모두의 웨이터 로고"
                width={26}
                height={14}
              />
            </div>
            <h2 className="text-primary text-xl font-semibold">
              모두의 웨이터
            </h2>
          </div>
          <button type="button" className="absolute top-[34px] left-[272px]">
            <CloseIcon color="#222" width={24} height={24} />
          </button>
        </div>
      </aside>
    </div>
  );
}
