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
      <div className="relative w-full">
        <DropdownMenuTrigger
          disabled={disabled}
          className="w-full outline-none"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div
            className={cn(
              "font-regular text-gray-0 !text-s flex h-9 w-full flex-row items-center justify-between gap-[6px] rounded-[8px] border border-gray-600 px-3 md:pr-4 md:pl-4 lg:h-[48px] lg:rounded-[12px] lg:py-3 lg:pr-3 lg:pl-4 lg:text-sm",
              disabled
                ? "pointer-events-none cursor-not-allowed bg-[#F5F5F5] text-gray-300 placeholder:text-gray-400"
                : "",
              triggerClassName
            )}
            onClick={() => (disabled ? null : setIsOpen((prev) => !prev))}
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
          style={{ minWidth: "var(--radix-dropdown-menu-trigger-width)" }}
          className={cn(
            "z-100 mt-1 w-full rounded-[16px] bg-white px-2 py-3 text-left shadow-[0px_2px_10px_rgba(0,0,0,0.08)]",
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
                "font-regular text-gray-0 block w-full cursor-pointer rounded-[12px] px-3 py-2 text-sm lg:text-base",
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
      </div>
    </DropdownMenu>
  );
}
