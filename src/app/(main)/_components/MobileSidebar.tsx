"use client";

import { useRouter } from "next/navigation";
import useEscapeKey from "@/hooks/useEscapeKey";
import useOutsideClick from "@/hooks/useOutSideClick";
import { useRef, useState } from "react";
import { ChevronDown, ChevronUp, X as CloseIcon } from "lucide-react";
import Image from "next/image";
import { USER_MENU_NAV } from "@/constants/sidebarMenus";
import { useSidebar } from "@/hooks/store/useSidebar";
import renderIcon from "./renderIcons";

interface IProps {
  onClose: () => void;
}

export default function MobileSidebar({ onClose }: IProps) {
  const navigate = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(true);
  const storename = "모두의웨이터";

  const { setActiveMenu, activeMenu, menu } = useSidebar();

  useOutsideClick({ ref, handler: onClose });
  useEscapeKey({ handler: onClose });

  return (
    <div className="bg-opacity-100 fixed inset-0 z-[9999] flex backdrop-blur-sm md:hidden">
      <aside
        ref={ref}
        className="relative flex h-screen w-[284px] flex-col overflow-auto rounded-tr-[10px] rounded-br-[10px] bg-white stroke-gray-600 px-4"
      >
        <div className="flex w-full items-center justify-between pt-5 pb-4">
          <div className="flex items-center gap-3">
            <Image
              src="/icons/logo/logo-medium.svg"
              alt="모두의 웨이터 로고"
              width={40}
              height={40}
            />
            <Image
              src="/icons/logo/logo-text.svg"
              alt="모두의 웨이터 텍스트"
              width={106}
              height={19}
            />
          </div>
          <button type="button" onClick={onClose}>
            <CloseIcon color="#222" width={24} height={24} strokeWidth="1.5" />
          </button>
        </div>
        <div className="h-[1px] bg-gray-600" />
        <div className="mt-4">
          <button
            type="button"
            className="text-gray-0 flex w-full items-center justify-between py-3 text-base font-semibold"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            {storename}
            <div className="center h-6 w-6">
              {isOpen ? (
                <ChevronUp strokeWidth="1.3" width={20} height={20} />
              ) : (
                <ChevronDown strokeWidth="1.3" width={20} height={20} />
              )}
            </div>
          </button>
        </div>
        <div className={isOpen ? "block" : "hidden"}>
          {menu?.map((item) => (
            <button
              type="button"
              key={item.text}
              className={`flex items-center gap-[10px] py-[10px] ${activeMenu === item.text ? "pl-0" : "pl-[12px]"}`}
              onClick={() => {
                setActiveMenu(item.text);
                const navPath =
                  USER_MENU_NAV[item.text as keyof typeof USER_MENU_NAV];
                navigate.push(navPath);
                onClose();
              }}
            >
              <div
                className={`h-5 w-0.5 ${activeMenu === item.text ? "bg-primary" : "hidden"}`}
              />
              {renderIcon(item.icon, activeMenu === item.text)}
              <span
                className={`text-[15px] font-medium ${activeMenu === item.text ? "text-primary" : "text-gray-300"}`}
              >
                {item.text}
              </span>
            </button>
          ))}
        </div>
      </aside>
    </div>
  );
}
