"use client";

import useEscapeKey from "@/hooks/useEscapeKey";
import useOutsideClick from "@/hooks/useOutSideClick";
import { useParams, useRouter } from "next/navigation";
import { useRef } from "react";
import Icon from "./common/Icon";

const popupList = [
  {
    text: "매장 등록 신청 현황",
    url: "/stores",
  },
  {
    text: "구독",
    url: "/subscription",
  },
];

export default function InfoPopup({ close }: { close: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useRouter();
  const params = useParams();
  const { id } = params;

  useOutsideClick({ ref, handler: close });
  useEscapeKey({ handler: close });

  return (
    <div
      className="absolute top-9 right-0 z-[9999] flex w-[160px] flex-col gap-1 rounded-[16px] bg-white p-3 shadow-[0_2px_10px_0_rgba(0,0,0,0.08)] md:top-9 md:right-0 md:w-[170px] lg:top-30 lg:right-16 lg:w-[220px]"
      ref={ref}
    >
      <div className="flex h-9 w-full items-center gap-1 rounded-[8px] bg-gray-700 px-2 md:gap-2 lg:h-12 lg:px-4">
        <div className="center flex h-5 w-5 rounded-[16px] border border-gray-500 bg-white lg:h-7 lg:w-7">
          <Icon iconKey="user" size={16} className="h-4 w-4 lg:h-6 lg:w-6" />
        </div>
        <span className="md:text-s font-regular text-xs text-gray-100 lg:text-[15px]">
          asdf@gmail.com
        </span>
      </div>
      {id &&
        popupList.map((item) => (
          <div
            key={item.text}
            role="button"
            tabIndex={0}
            className="flex h-9 w-full items-center gap-2 rounded-[8px] px-3 lg:px-5"
            onClick={() => navigate.push(item.url)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                navigate.push(item.url);
              }
            }}
          >
            <span className="text-s font-regular text-gray-300 lg:text-sm">
              {item.text}
            </span>
          </div>
        ))}
      <div
        role="button"
        tabIndex={0}
        className="flex h-9 w-full items-center gap-2 rounded-[8px] px-3 lg:px-5"
        onClick={() => {}}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            // event
          }
        }}
      >
        <span className="text-s font-regular text-gray-300 lg:text-sm">
          로그아웃
        </span>
      </div>
    </div>
  );
}
