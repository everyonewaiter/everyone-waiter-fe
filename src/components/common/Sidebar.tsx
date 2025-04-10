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
        className="relative flex h-screen w-[312px] flex-col overflow-auto rounded-tr-[10px] rounded-br-[10px] bg-white px-4 py-5"
      >
        <div className="flex items-center justify-between border-b border-gray-600 pb-4">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.svg"
              alt="모두의 웨이터 로고"
              width={40}
              height={40}
            />
            <h2 className="text-primary font-hakgyo text-xl font-semibold">
              모두의 웨이터
            </h2>
          </div>
          <button
            type="button"
            className="absolute top-[29px] left-[272px] cursor-pointer"
            onClick={onClose}
          >
            <CloseIcon color="#222" width={24} height={24} />
          </button>
        </div>
      </aside>
    </div>
  );
}
