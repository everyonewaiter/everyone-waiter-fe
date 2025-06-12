"use client";

import ResponsiveButton from "@/components/common/Button/ResponsiveButton";
import Checkbox from "@/components/common/Checkbox";
import cn from "@/lib/utils";
import Image from "next/image";

interface IProps extends Menu {
  onToggle: (value: Menu) => void;
  isSelected: boolean;
  hideSelect?: boolean;
}

export default function MenuCard({
  onToggle,
  isSelected,
  hideSelect = false,
  ...menu
}: IProps) {
  return (
    <div
      className={cn(
        "relative h-[440px] overflow-hidden rounded-[24px] border",
        isSelected ? "border-primary" : "border-gray-600"
      )}
    >
      <Image
        src={`${process.env.NEXT_PUBLIC_DEV_CDN}/${menu.image}`}
        alt="menu image"
        width={329}
        height={440}
        className="w-full object-cover"
      />
      <div className="absolute top-0 flex h-full w-full flex-col justify-between bg-red-50 p-2">
        {!hideSelect && (
          <Checkbox
            className="mt-2 ml-2 h-6 w-6"
            checked={isSelected}
            onCheckedChange={() => onToggle(menu)}
          />
        )}
        <div className="mt-auto flex flex-col gap-2 rounded-[20px] bg-white px-5 py-4">
          {menu.label && (
            <ResponsiveButton
              responsiveButtons={{
                lg: {
                  buttonSize: "custom",
                  className:
                    "w-fit px-4 py-1 rounded-[24px] bg-[#3900B508] !text-[#3900B5] border-none text-ms font-regular",
                },
              }}
            >
              {menu.label}
            </ResponsiveButton>
          )}
          <div className="flex items-center justify-between">
            <span className="text-gray-0 text-lg font-semibold">
              {menu.name}
            </span>
            <strong className="text-gray-0 text-[28px]">
              {menu.price.toLocaleString()}원
            </strong>
          </div>
        </div>
      </div>
    </div>
  );
}
