"use client";

import { useSidebar } from "@/hooks/store/useSidebar";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Icon from "../../../components/common/Icon";

interface IProps {
  onClose: () => void;
  name: string;
}

export default function MobileSidebarSection({ onClose, name }: IProps) {
  const navigate = useRouter();
  const [isOpen, setIsOpen] = useState(true);

  const { setActiveMenu, activeMenu, menu } = useSidebar();

  const checkActive = (text: string) => activeMenu === `${name}-${text}`;

  return (
    <div>
      <div>
        <button
          type="button"
          className="text-gray-0 flex w-full items-center justify-between py-3 text-base font-semibold"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {name}
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
            className={`flex items-center gap-[10px] py-[10px] ${checkActive(item.text) ? "pl-0" : "pl-[12px]"}`}
            onClick={() => {
              setActiveMenu(item.text);
              navigate.push(item.url);
              onClose();
            }}
          >
            <div
              className={`h-5 w-0.5 ${checkActive(item.text) ? "bg-primary" : "hidden"}`}
            />
            <Icon iconKey={item.icon} isActive={checkActive(item.text)} />
            <span
              className={`text-[15px] font-medium ${checkActive(item.text) ? "text-primary" : "text-gray-300"}`}
            >
              {item.text}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
