"use client";

import Icon from "@/components/common/Icon/Icon";
import Image from "next/image";
import { useState } from "react";

export default function NotFound() {
  const [isRefreshing, setIsRefreshing] = useState(false);

  return (
    <div className="center h-dvh w-dvw flex-col gap-8">
      <Image
        src="/images/error.svg"
        alt="페이지 오류 발생"
        width={588.88}
        height={182}
        priority
      />
      <span className="font-regular text-lg text-[#9C9FA2]">
        문제가 발생했습니다.
      </span>
      <div className="mt-3 flex gap-2">
        <button
          type="button"
          disabled={isRefreshing}
          className={`group flex gap-2 rounded-lg border px-6 py-3 transition-colors ${
            isRefreshing
              ? "cursor-not-allowed border-gray-500 text-gray-400"
              : "border-gray-400 text-gray-200 hover:border-gray-300"
          }`}
          onClick={() => {
            setIsRefreshing(true);

            setTimeout(() => {
              window.location.reload();
            }, 3000);
          }}
        >
          <div
            className={`transition-transform duration-500 ${
              isRefreshing ? "animate-spin-reverse" : ""
            }`}
          >
            <Icon
              iconKey="rotate"
              size={18}
              className={`mt-[2.5px] ${isRefreshing ? "text-gray-400" : "text-gray-200"}`}
            />
          </div>
          {isRefreshing ? "새로고침 중..." : "새로고침"}
        </button>
      </div>
    </div>
  );
}
