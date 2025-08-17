"use client";

import Image from "next/image";
import ResponsiveButton from "@/components/common/Button/ResponsiveButton";
import Checkbox from "@/components/common/Checkbox";
import cn from "@/lib/utils";
import { getCdn } from "@/utils/getCdn";
import { useMenuSelection } from "../_stores/useMenuSelection";

interface IProps extends Menu {
  isSelected?: boolean;
  hideSelect?: boolean;
  onClick: () => void;
  className?: string;
}

export default function MenuCard({
  isSelected,
  hideSelect = false,
  onClick,
  className,
  ...menu
}: IProps) {
  const { toggle } = useMenuSelection();

  return (
    <div
      className={cn(
        "relative cursor-pointer overflow-hidden rounded-[12px] border lg:rounded-[24px]",
        isSelected ? "border-primary" : "border-gray-600",
        className
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
      <div className="relative aspect-[329/440]">
        {menu.image ? (
          <Image
            src={getCdn(menu.image)}
            alt={`${menu.image} 메뉴 이미지`}
            fill
            className="object-cover"
            loading="eager"
            unoptimized
            priority
            sizes="(max-width: 768px) 100vw, 300px"
          />
        ) : (
          <div className="center h-full w-full bg-gray-600 pb-20 opacity-50">
            <Image
              src="/logo/logo-medium-gray.svg"
              alt="매뉴 이미지 없음"
              width={100}
              height={100}
              className="opacity-50"
            />
          </div>
        )}
      </div>
      <div className="absolute top-0 flex h-full w-full flex-col justify-between p-1 lg:p-2">
        {!hideSelect && (
          <Checkbox
            className="mt-2 ml-2 h-6 w-6"
            checked={isSelected}
            onCheckedChange={() => toggle(menu.menuId)}
            onClick={(e) => {
              e.stopPropagation();
            }}
            aria-label={`${menu.name} 메뉴 선택`}
          />
        )}
        <div className="mt-auto flex flex-col gap-1 rounded-[12px] bg-white p-2 lg:gap-2 lg:rounded-[20px] lg:px-5 lg:py-4">
          {menu.label !== "DEFAULT" && (
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
