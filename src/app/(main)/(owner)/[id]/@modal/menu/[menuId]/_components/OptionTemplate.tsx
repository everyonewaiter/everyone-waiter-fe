"use client";

import ResponsiveButton from "@/components/common/Button/ResponsiveButton";
import { ScrollArea } from "@/components/common/ScrollArea";
import Icon from "@/components/common/Icon";
import { Plus } from "lucide-react";
import { useState } from "react";
import cn from "@/lib/utils";
import OptionComponent from "./OptionComponent";
import OptionBox from "./OptionBox";

interface IProps {
  title: string;
  onSetShowInfo: (value: boolean) => void;
  showInfo: boolean;
  onClick?: () => void;
  isOpen: boolean;
  className: string;
}

export default function OptionTemplate({
  onClick,
  className,
  ...props
}: IProps) {
  const [optionCount, setOptionCount] = useState(1);
  const [popupAction, setPopupAction] = useState("");

  return (
    <div
      className={cn(
        "flex cursor-pointer flex-col justify-between rounded-[12px] border border-gray-600 p-3 lg:rounded-[24px] lg:p-6",
        className
      )}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onClick?.();
        }
      }}
    >
      <OptionComponent
        {...props}
        onSetPopupAction={setPopupAction}
        popupAction={popupAction}
      />
      {props.isOpen && (
        <>
          {optionCount ? (
            <ScrollArea className="mt-3 h-[320px] md:mt-0 md:h-[220px] lg:h-[293px]">
              {Array.from({ length: optionCount })
                .fill(0)
                .map((_, i) => (
                  /* eslint-disable react/no-array-index-key */
                  <div
                    key={i + 1}
                    className={cn(
                      "flex items-center gap-3",
                      i > 0 ? "mt-3 lg:mt-4" : ""
                    )}
                  >
                    {/* eslint-disable react/no-array-index-key */}
                    <OptionBox />
                    {popupAction && (
                      <button
                        type="button"
                        className="center h-8 w-8 rounded-[8px] border border-gray-600"
                      >
                        <Icon
                          iconKey={
                            popupAction === "순서 변경" ? "move" : "trash"
                          }
                          size={18}
                          className={
                            popupAction === "순서 변경"
                              ? "text-gray-300"
                              : '"text-gray-0"'
                          }
                        />
                      </button>
                    )}
                  </div>
                ))}
            </ScrollArea>
          ) : (
            <div className="center font-regular flex-1 flex-col text-sm text-gray-300">
              현재 등록된 필수 옵션이 없습니다.
            </div>
          )}
          <ResponsiveButton
            variant="outline"
            color="black"
            responsiveButtons={{
              lg: { buttonSize: "sm", className: "w-full border-gray-600" },
              md: { buttonSize: "sm", className: "w-full border-gray-600" },
              sm: { buttonSize: "sm", className: "w-full border-gray-600" },
            }}
            commonClassName="lg:mt-6 md:mt-3"
            onClick={() => setOptionCount((prev) => prev + 1)}
          >
            <Plus size={16} className="text-gray-0" strokeWidth={2} />
          </ResponsiveButton>
        </>
      )}
    </div>
  );
}
