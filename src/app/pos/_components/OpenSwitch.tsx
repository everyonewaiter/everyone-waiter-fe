"use client";

import cn from "@/lib/utils";
import useStoreOpenStore from "@/stores/useStoreOpenStore";

interface IProps {
  className?: string;
}

export default function OpenSwitch({ className }: IProps) {
  const { isStoreOpen } = useStoreOpenStore();

  return (
    <div
      className={cn(
        "flex gap-1 rounded-[80px] bg-[#ffffff16] px-4 py-[10px]",
        !isStoreOpen ? "text-white" : "text-gray-300",
        className
      )}
    >
      <div
        className={cn(
          "font-regular flex h-[44px] w-[83px] items-center justify-center rounded-full text-xl transition-colors",
          isStoreOpen ? "bg-red-600 text-white" : "text-gray-300"
        )}
      >
        오픈
      </div>
      <div
        className={cn(
          "font-regular flex h-[44px] w-[83px] items-center justify-center rounded-full text-xl transition-colors",
          !isStoreOpen ? "bg-red-600 text-white" : "text-gray-300"
        )}
      >
        마감
      </div>
    </div>
  );
}
