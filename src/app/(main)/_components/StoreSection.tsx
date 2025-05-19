"use client";

import ResponsiveButton from "@/components/common/ResponsiveButton";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSidebar } from "@/hooks/store/useSidebar";
import useStoreId from "@/hooks/store/useStoreId";
import Icon from "../../../components/common/Icon";

interface IProps {
  name: string;
  storeId?: bigint;
}

export default function StoreSection({ name, storeId }: IProps) {
  const navigate = useRouter();
  const [isStoreOpen, setIsStoreOpen] = useState(true);

  const { setActiveMenu, activeMenu, menu } = useSidebar();
  const { setStoreId } = useStoreId();

  const checkActive = (text: string) => activeMenu === `${name}-${text}`;

  return (
    <div className="mt-7">
      <ResponsiveButton
        responsiveButtons={{
          sm: { buttonSize: "sm", className: "hidden" },
          md: { buttonSize: "md", className: "md:!flex lg:!hidden" },
          lg: {
            buttonSize: "lg",
            className:
              "md:!hidden lg:!flex h-16 rounded-[16px] text-white font-bold text-lg",
          },
        }}
        onClick={() => setIsStoreOpen((prev) => !prev)}
        commonClassName="w-full flex flex-row items-center justify-between"
      >
        {name}
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
            {menu?.map((item) => (
              <button
                type="button"
                key={item.text}
                className="flex items-center md:py-[9px] lg:py-3"
                onClick={() => {
                  setActiveMenu(`${name}-${item.text}`);
                  setStoreId(storeId!);
                  navigate.push(item.url);
                }}
              >
                <div
                  className={`mr-3 h-[6px] w-[6px] rounded-full ${checkActive(item.text) ? "bg-primary" : "bg-gray-600"}`}
                />
                <div className="hidden lg:block">
                  <Icon iconKey={item.icon} isActive={checkActive(item.text)} />
                </div>
                <div className="md:block lg:hidden">
                  <Icon
                    iconKey={item.icon}
                    isActive={checkActive(item.text)}
                    size={24}
                  />
                </div>
                <span
                  className={`md:text-s ml-[6px] md:font-medium lg:text-base lg:font-medium ${checkActive(item.text) ? "text-primary" : "text-gray-300"}`}
                >
                  {item.text}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
