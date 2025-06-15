"use client";

import ResponsiveButton from "@/components/common/Button/ResponsiveButton";
import Checkbox from "@/components/common/Checkbox";
import cn from "@/lib/utils";
import Image from "next/image";

interface IProps extends Menu {
  onToggle: (value: Menu) => void;
  isSelected: boolean;
  hideSelect?: boolean;
  onClick: () => void;
}

export default function MenuCard({
  onToggle,
  isSelected,
  hideSelect = false,
  onClick,
  ...menu
}: IProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[12px] border md:h-[220px] lg:h-[440px] lg:rounded-[24px]",
        isSelected ? "border-primary" : "border-gray-600"
      )}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onClick();
        }
      }}
      role="button"
      tabIndex={0}
    >
      <Image
        src={`${process.env.NEXT_PUBLIC_DEV_CDN}/${menu.image}`}
        alt="menu image"
        width={329}
        height={440}
        className="w-full object-cover"
      />
      <div className="absolute top-0 flex h-full w-full flex-col justify-between bg-red-50 p-1 lg:p-2">
        {!hideSelect && (
          <Checkbox
            className="mt-2 ml-2 h-6 w-6"
            checked={isSelected}
            onCheckedChange={() => onToggle(menu)}
            onClick={(e) => {
              e.stopPropagation();
            }}
          />
        )}
        <div className="mt-auto flex flex-col gap-1 rounded-[12px] bg-white p-2 lg:gap-2 lg:rounded-[20px] lg:px-5 lg:py-4">
          {menu.label && (
            <ResponsiveButton
              responsiveButtons={{
                lg: {
                  buttonSize: "custom",
                  className:
                    "w-fit px-4 py-1 bg-[#3900B508] !text-[#3900B5] border-none text-sm font-regular  rounded-[24px]",
                },
                md: {
                  buttonSize: "custom",
                  className: "w-fit h-6 px-3 py-1 rounded-[24px] text-xs",
                },
                sm: {
                  buttonSize: "custom",
                  className: "w-fit h-6 px-3 py-1 rounded-[24px] text-xs",
                },
              }}
            >
              {menu.label}
            </ResponsiveButton>
          )}
          <div className="flex flex-col items-start justify-between gap-1 lg:flex-row lg:items-center">
            <span className="text-gray-0 text-s font-medium lg:text-lg lg:font-semibold">
              {menu.name}
            </span>
            <strong className="text-gray-0 text-xl lg:text-[28px]">
              {menu.price.toLocaleString()}원
            </strong>
          </div>
        </div>
      </div>
    </div>
  );
}
