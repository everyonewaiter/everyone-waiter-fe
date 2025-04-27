"use client";

/* eslint-disable jsx-a11y/no-static-element-interactions */
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
  triggerClassName?: string;
  disabled?: boolean;
}

export default function Dropdown({
  data,
  defaultText,
  active,
  setActive,
  className,
  triggerClassName,
  disabled,
}: PropsWithChildren<IProps>) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownMenu
      onOpenChange={(open) => {
        if (open) {
          document.body.classList.add("disable-modal-close");
        } else {
          document.body.classList.remove("disable-modal-close");
        }
      }}
    >
      <DropdownMenuTrigger
        disabled={disabled}
        className="outline-none"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div
          className={cn(
            "text-s font-regular text-gray-0 flex h-[32px] w-fit flex-row items-center justify-center gap-[6px] rounded-[40px] border border-gray-600 pr-3 pl-3 lg:h-[38px] lg:pl-4",
            triggerClassName
          )}
          onClick={() => setIsOpen((prev) => !prev)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              setIsOpen((prev) => !prev);
            }
          }}
        >
          {active || defaultText}
          {isOpen ? (
            <ChevronUp
              size={16}
              strokeWidth={1}
              className="mt-1 h-3 w-3 lg:h-4 lg:w-4"
            />
          ) : (
            <ChevronDown
              size={16}
              strokeWidth={1}
              className="mt-1 h-3 w-3 lg:h-4 lg:w-4"
            />
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className={cn(
          "z-100 mt-1 ml-3 rounded-[16px] bg-white px-2 py-3 shadow-[0px_2px_10px_rgba(0,0,0,0.08)]",
          className
        )}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {data.map((item) => (
          <DropdownMenuItem
            key={item}
            className={cn(
              "font-regular text-gray-0 w-full cursor-pointer rounded-[12px] px-3 py-2 text-sm",
              active === item ? "bg-gray-700" : ""
            )}
            onClick={(e) => {
              e.stopPropagation();
              setActive(item);
            }}
          >
            {item}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
