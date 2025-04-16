"use client";

/* eslint-disable react-hooks/exhaustive-deps */
import ResponsiveButton from "@/components/common/ResponsiveButton";
import { ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSidebar } from "@/hooks/store/useSidebar";
import renderIcon from "./renderIcons";

interface IProps {
  activeMenu: string;
  setActiveMenu: (value: string) => void;
  data: {
    icon: any;
    text: string;
  }[];
}

export default function Sidebar({ activeMenu, setActiveMenu, data }: IProps) {
  const storeName = "상호명";
  const [isStoreOpen, setIsStoreOpen] = useState(true);
  const { openSidebar } = useSidebar();

  useEffect(() => {
    setActiveMenu(data[0].text);
    openSidebar();
  }, []);

  return (
    <section className="hidden flex-col rounded-[28px] bg-white md:flex md:h-[calc(100%-40px)] md:w-[186px] md:px-3 lg:h-[calc(100%-64px)] lg:w-[318px] lg:px-5">
      <div className="flex items-center md:gap-[10px] md:pt-4 lg:gap-5 lg:pt-8">
        <Image
          src="/icons/logo/logo-medium.svg"
          alt="모두의 웨이터 로고"
          width={60}
          height={60}
          className="md:h-10 md:w-10 lg:h-15 lg:w-15"
        />
        <Image
          src="/icons/logo/logo-text.svg"
          alt="모두의 웨이터 텍스트"
          width={141}
          height={25}
          className="lg:h[25px] md:h-[16.67px] md:w-[94px] lg:w-[141px]"
        />
      </div>
      <div className="mt-7">
        <ResponsiveButton
          responsiveButtons={{
            md: { buttonSize: "md", className: "!flex" },
            lg: {
              buttonSize: "lg",
              className: "h-16 rounded-[16px] text-white font-bold text-lg",
            },
          }}
          onClick={() => setIsStoreOpen((prev) => !prev)}
          commonClassName="w-full flex flex-row items-center justify-between"
        >
          {storeName}
          <div className="center h-6 w-6">
            {isStoreOpen ? (
              <ChevronUp strokeWidth="1.3" width={20} height={20} />
            ) : (
              <ChevronDown strokeWidth="1.3" width={20} height={20} />
            )}
          </div>
        </ResponsiveButton>
        {isStoreOpen && (
          <div className="relative mt-2 flex flex-row">
            <div className="absolute top-0 left-0 z-0 my-7 flex h-full w-[6px] justify-center">
              <div className="h-[calc(100%-55px)] w-[1px] bg-gray-600" />
            </div>
            <div className="z-10">
              {data.map((item) => (
                <button
                  type="button"
                  key={item.text}
                  className="flex items-center md:py-[9px] lg:py-3"
                  onClick={() => setActiveMenu(item.text)}
                >
                  <div
                    className={`mr-3 h-[6px] w-[6px] rounded-full ${activeMenu === item.text ? "bg-primary" : "bg-gray-600"}`}
                  />
                  <div className="hidden lg:block">
                    {renderIcon(item.icon, activeMenu === item.text)}
                  </div>
                  <div className="md:block lg:hidden">
                    {renderIcon(item.icon, activeMenu === item.text, 24)}
                  </div>
                  <span
                    className={`md:text-s ml-[6px] md:font-medium lg:text-base lg:font-medium ${activeMenu === item.text ? "text-primary" : "text-gray-300"}`}
                  >
                    {item.text}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
