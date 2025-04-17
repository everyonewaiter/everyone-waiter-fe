import useEscapeKey from "@/hooks/useEscapeKey";
import useOutsideClick from "@/hooks/useOutSideClick";
import Image from "next/image";
import { useRef } from "react";

const popupList = [
  {
    text: "매장 등록 신청 현황",
    event: () => {},
  },
  {
    text: "구독",
    event: () => {},
  },
  {
    text: "로그아웃",
    event: () => {},
  },
];

export default function InfoPopup({ close }: { close: () => void }) {
  const ref = useRef<HTMLDivElement>(null);

  useOutsideClick({ ref, handler: close });
  useEscapeKey({ handler: close });

  return (
    <div
      className="absolute top-9 right-0 flex w-[160px] flex-col gap-1 rounded-[16px] bg-white p-3 shadow-[0_2px_10px_0_rgba(0,0,0,0.08)] md:top-9 md:right-0 md:w-[170px] lg:top-13 lg:right-0 lg:w-[220px]"
      ref={ref}
    >
      <div className="flex h-9 w-full items-center gap-1 rounded-[8px] bg-gray-700 px-2 md:gap-2 lg:h-12 lg:px-4">
        <div className="center flex h-5 w-5 rounded-[16px] border border-gray-500 bg-white lg:h-7 lg:w-7">
          <Image
            src="/icons/user.svg"
            alt="유저 정보 표시 아이콘"
            width={16}
            height={16}
            className="h-4 w-4 lg:h-6 lg:w-6"
          />
        </div>
        <span className="md:text-s font-regular text-xs text-gray-100 lg:text-[15px]">
          asdf@gmail.com
        </span>
      </div>
      {popupList.map((item) => (
        <div
          role="button"
          tabIndex={0}
          key={item.text}
          className="flex h-9 w-full items-center gap-2 rounded-[8px] px-3 lg:px-5"
          onClick={item.event}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              item.event();
            }
          }}
        >
          <span className="text-s font-regular text-gray-300 lg:text-sm">
            {item.text}
          </span>
        </div>
      ))}
    </div>
  );
}
