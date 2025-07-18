"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import ResponsiveButton from "@/components/common/Button/ResponsiveButton";
import Icon from "@/components/common/Icon";
import cn from "@/lib/utils";
import { MenuFormType } from "../_types/menuForm.type";
import OptionBox from "./OptionBox";
import OptionComponent from "./OptionComponent";

interface IProps {
  title: string;
  onSetShowInfo: (value: boolean) => void;
  showInfo: boolean;
  onClick?: () => void;
  isOpen: boolean;
  className?: string;
  type: "requiredOptions" | "optionalOptions";
  isEditing: boolean;
}

export default function OptionTemplate({
  onClick,
  className,
  type,
  isEditing,
  ...props
}: IProps) {
  const form = useFormContext<
    Omit<MenuFormType, "image"> & { image: File | null }
  >();

  const [popupAction, setPopupAction] = useState("");

  return (
    <div
      className={cn(
        "relative flex cursor-pointer flex-col gap-4 rounded-[12px] border border-gray-600 p-3 lg:rounded-[24px] lg:p-6",
        props.isOpen ? "h-[calc(100%-57px-40px)]" : "",
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
        isEditing={isEditing}
      />
      {props.isOpen ? (
        <div className="flex h-full flex-col gap-4">
          <div
            className={cn(
              "flex flex-col gap-3 overflow-y-auto",
              form.watch(type)?.length > 1
                ? "lg:h-[calc(100%-95px)]"
                : "lg:h-[calc(100%-40px)]"
            )}
          >
            {form.watch(type)?.length > 0 ? (
              form.watch(type)?.map((option, i) => (
                <div
                  key={option.name}
                  className={cn(
                    "flex gap-3",
                    i > 0 ? "mt-3 lg:mt-4" : "",
                    popupAction ? "items-center" : "item-start"
                  )}
                >
                  <OptionBox type={type} index={i} isEditing={isEditing} />
                  {popupAction && (
                    <button
                      type="button"
                      className="center h-8 w-8 rounded-[8px] border border-gray-600"
                    >
                      <Icon
                        iconKey={popupAction === "순서 변경" ? "move" : "trash"}
                        size={18}
                        className={
                          popupAction === "순서 변경"
                            ? "text-gray-300"
                            : "text-gray-0"
                        }
                      />
                    </button>
                  )}
                </div>
              ))
            ) : (
              <div className="center flex-1 text-sm text-gray-300">
                현재 등록된 필수 옵션이 없습니다.
              </div>
            )}
          </div>

          {/* 하단 버튼 고정 */}
          {isEditing && (
            <ResponsiveButton
              variant="outline"
              color="black"
              responsiveButtons={{
                lg: { buttonSize: "sm", className: "w-full border-gray-600" },
                md: { buttonSize: "sm", className: "w-full border-gray-600" },
                sm: { buttonSize: "sm", className: "w-full border-gray-600" },
              }}
              onClick={() =>
                form.setValue(type, [
                  ...(form.watch(type) ?? []),
                  { name: "", menuOptions: [{ name: "", price: 0 }] },
                ])
              }
            >
              <Plus size={16} className="text-gray-0" strokeWidth={2} />
            </ResponsiveButton>
          )}
        </div>
      ) : null}
    </div>
  );
}
