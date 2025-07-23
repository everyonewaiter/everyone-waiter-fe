"use client";

/* eslint-disable jsx-a11y/no-static-element-interactions */
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { PropsWithChildren, useLayoutEffect, useState } from "react";
import cn from "@/lib/utils";
import Icon from "./Icon";

interface IProps {
  data: any[];
  defaultText: string;
  setActive: (value: string) => void;
  active: string | null;
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
  const [menuWidth, setMenuWidth] = useState<number | undefined>(undefined);

  useLayoutEffect(() => {
    if (data) {
      setMenuWidth(Math.max(...data.map((el) => el.length * 12)));
    }
  }, [data]);

  return (
    <DropdownMenu
      modal={false}
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
          asChild
          disabled={disabled}
          className="w-full cursor-pointer outline-none"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div
            className={cn(
              "flex h-8 w-fit items-center justify-center gap-[6px] rounded-[40px] border border-gray-600 hover:border-gray-400 md:h-[38px] md:pr-3 md:pl-4",
              "font-regular text-gray-0 text-xs lg:text-sm",
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
            <span className="text-s text-gray-0 whitespace-nowrap md:text-sm">
              {active || defaultText}
            </span>
            {isOpen ? (
              <Icon
                iconKey="chevron-up"
                size={24}
                className="h-4 w-4 text-gray-200 lg:h-6 lg:w-6"
              />
            ) : (
              <Icon
                iconKey="chevron-down"
                size={24}
                className="h-4 w-4 text-gray-200 lg:h-6 lg:w-6"
              />
            )}
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          sideOffset={4}
          style={{
            minWidth: menuWidth
              ? `max(${menuWidth + 40}px, var(--radix-dropdown-menu-trigger-width))`
              : "var(--radix-dropdown-menu-trigger-width)",
          }}
          className={cn(
            "z-100 mt-1 w-fit rounded-[16px] bg-white px-2 py-3 text-left shadow-[0px_2px_10px_rgba(0,0,0,0.08)]",
            className
          )}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {data?.map((item) => (
            <DropdownMenuItem
              key={item}
              className={cn(
                "font-regular text-gray-0 block w-full cursor-pointer rounded-[12px] py-2 pl-3 text-sm hover:bg-gray-700 hover:outline-none lg:text-base",
                triggerClassName
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
