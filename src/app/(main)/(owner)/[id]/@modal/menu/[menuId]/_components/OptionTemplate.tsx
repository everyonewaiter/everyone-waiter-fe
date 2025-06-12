"use client";

import ResponsiveButton from "@/components/common/Button/ResponsiveButton";
import { ScrollArea } from "@/components/common/ScrollArea";
import Icon from "@/components/common/Icon";
import { Plus } from "lucide-react";
import { useState } from "react";
import OptionComponent from "./OptionComponent";
import OptionBox from "./OptionBox";

interface IProps {
  title: string;
  onSetShowInfo: (value: boolean) => void;
  showInfo: boolean;
  onClick?: () => void;
  isOpen: boolean;
}

export default function OptionTemplate({ onClick, ...props }: IProps) {
  const [optionCount, setOptionCount] = useState(1);
  const [popupAction, setPopupAction] = useState("");

  return (
    <div
      className="flex flex-1 cursor-pointer flex-col rounded-[24px] border border-gray-600 p-6"
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
            <ScrollArea className="h-[373px]">
              {Array.from({ length: optionCount })
                .fill(0)
                .map((_, i) => (
                  <div className="flex items-center gap-3">
                    {/* eslint-disable react/no-array-index-key */}
                    <OptionBox key={i + 1} />
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
            }}
            commonClassName="mt-4"
            onClick={() => setOptionCount((prev) => prev + 1)}
          >
            <Plus size={16} className="text-gray-0" strokeWidth={2} />
          </ResponsiveButton>
        </>
      )}
    </div>
  );
}
