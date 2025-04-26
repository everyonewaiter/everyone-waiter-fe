"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { ChevronDown, ChevronUp } from "lucide-react";
import { PropsWithChildren, useState } from "react";
import cn from "@/lib/utils";

interface IProps {
  data: any[];
  defaultText: string;
  setActive: (value: string) => void;
  active: string;
  className?: string;
}

export default function Dropdown({
  data,
  defaultText,
  active,
  setActive,
  className,
}: PropsWithChildren<IProps>) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        onClick={() => setIsOpen((prev) => !prev)}
        className="outline-none"
      >
        <div className="text-s font-regular text-gray-0 flex !h-[38px] w-fit flex-row items-center justify-center gap-[6px] rounded-[40px] border border-gray-600 pr-3 pl-4">
          {active || defaultText}
          {isOpen ? (
            <ChevronUp size={16} strokeWidth={1} className="mt-1" />
          ) : (
            <ChevronDown size={16} strokeWidth={1} className="mt-1" />
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className={cn(
          "z-100 mt-1 ml-3 w-[113px] rounded-[16px] bg-white px-2 py-3 shadow-[0px_2px_10px_rgba(0,0,0,0.08)]",
          className
        )}
      >
        {data.map((item) => (
          <DropdownMenuItem
            key={item}
            className={cn(
              "font-regular text-gray-0 rounded-[12px] px-3 py-2 text-sm",
              active === item ? "bg-gray-700" : ""
            )}
            onClick={() => setActive(item)}
          >
            {item}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
