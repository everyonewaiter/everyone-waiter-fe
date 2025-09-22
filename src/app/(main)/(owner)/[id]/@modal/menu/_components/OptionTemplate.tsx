"use client";

import { DndContext, DragEndEvent, UniqueIdentifier } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { Plus } from "@/components/common/Icon/index";
import { useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import ResponsiveButton from "@/components/common/Button/ResponsiveButton";
import cn from "@/lib/utils";
import OptionHeader from "./OptionHeader";
import { TypeMenuForm } from "../../../menu/_schema/menu.schema";
import OptionItem from "./OptionItem";

interface IProps {
  title: string;
  onSetShowInfo: (value: boolean) => void;
  showInfo: boolean;
  onClick?: () => void;
  isOpen: boolean;
  className?: string;
  type: "requiredOptions" | "optionalOptions";
  isEditing: boolean;
  isUpdate?: boolean;
}

export default function OptionTemplate({
  onClick,
  className,
  type,
  isEditing,
  isUpdate,
  ...props
}: IProps) {
  const form = useFormContext<TypeMenuForm>();
  const {
    fields: groups,
    move: moveGroup,
    append: appendGroup,
    remove: removeGroup,
  } = useFieldArray({
    control: form.control,
    name: type as any,
  });

  const [popupAction, setPopupAction] = useState("");

  const restrictToVerticalAxis = ({ transform }: any) => ({
    ...transform,
    x: 0,
  });

  const restrictToParentElement = ({
    transform,
    draggingNodeRect,
    containerNodeRect,
  }: any) => {
    if (!draggingNodeRect || !containerNodeRect) return transform;
    const value = { ...transform } as { x: number; y: number };

    const left = draggingNodeRect.left + value.x;
    const right = left + draggingNodeRect.width;
    const minX = containerNodeRect.left;
    const maxX = containerNodeRect.right;
    if (left < minX) value.x += minX - left;
    else if (right > maxX) value.x -= right - maxX;

    const top = draggingNodeRect.top + value.y;
    const bottom = top + draggingNodeRect.height;
    const minY = containerNodeRect.top;
    const maxY = containerNodeRect.bottom;
    if (top < minY) value.y += minY - top;
    else if (bottom > maxY) value.y -= bottom - maxY;

    return value;
  };

  const handleContainerClick = (e: React.MouseEvent) => {
    if (e.target !== e.currentTarget) return;

    if (!form.watch(type).length && onClick) {
      onClick();
    }
  };

  const handleHeaderClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <div
      className={cn(
        "relative flex flex-col gap-4 overflow-visible rounded-xl border border-gray-600 p-4 md:p-3 lg:rounded-3xl lg:p-6",
        props.isOpen
          ? "h-[388px] cursor-default md:h-[calc(100%-57px-40px)]"
          : "cursor-pointer",
        className
      )}
      onClick={handleContainerClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if ((e.key === "Enter" || e.key === " ") && !form.watch(type).length) {
          if (e.target === e.currentTarget) {
            onClick?.();
          }
        }
      }}
    >
      <OptionHeader
        {...props}
        onSetPopupAction={setPopupAction}
        popupAction={popupAction}
        isEditing={isEditing}
        hasOption={groups.length > 0}
        onComplete={() => {
          setPopupAction("");
          form.trigger(type);
        }}
        onHeaderClick={handleHeaderClick}
      />
      {props.isOpen ? (
        <div className="flex h-full flex-col gap-4">
          {/* 순서 변경 모드 */}
          {popupAction === "순서 변경" && (
            <DndContext
              modifiers={[restrictToParentElement, restrictToVerticalAxis]}
              onDragEnd={({ active, over }: DragEndEvent) => {
                if (!over || active.id === over.id) return;
                const oldIndex = groups.findIndex(
                  (g: any) => (g.id as UniqueIdentifier) === active.id
                );
                const newIndex = groups.findIndex(
                  (g: any) => (g.id as UniqueIdentifier) === over.id
                );
                if (oldIndex < 0 || newIndex < 0) return;
                moveGroup(oldIndex, newIndex);
              }}
            >
              <SortableContext
                items={
                  (groups?.map((el: any) => ({
                    ...el,
                    id: el.id as UniqueIdentifier,
                  })) as any) || []
                }
              >
                <div
                  className={cn(
                    "scrollbar-hide flex h-[266px] flex-col gap-3 overflow-y-auto md:h-auto",
                    groups.length > 1
                      ? "md:h-[calc(100%-95px)]"
                      : "md:h-[calc(100%-40px)]"
                  )}
                >
                  {groups?.map((el: any, i: number) => (
                    <OptionItem
                      key={el.id as string}
                      type={type}
                      index={i}
                      isEditing={isEditing}
                      popupAction={popupAction}
                      id={el.id as string}
                      onDelete={() => {
                        if (groups.length === 1) {
                          form.trigger(type);
                          setPopupAction("");
                        }
                        removeGroup(i);
                      }}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          )}

          {/* 일반 모드 (편집 중이고 순서 변경이 아닐 때) */}
          {popupAction !== "순서 변경" && (
            <div
              className={cn(
                "scrollbar-hide flex h-[266px] flex-col gap-3 overflow-y-auto md:h-auto",
                groups.length > 1
                  ? "md:h-[calc(100%-95px)]"
                  : "md:h-[calc(100%-40px)]"
              )}
            >
              {groups?.map((el: any, i: number) => (
                <OptionItem
                  key={el.id as string}
                  type={type}
                  index={i}
                  isEditing={isEditing}
                  popupAction={popupAction}
                  id={el.id as string}
                  onDelete={() => {
                    if (groups.length === 1) {
                      form.trigger(type);
                      setPopupAction("");
                    }
                    removeGroup(i);
                  }}
                />
              ))}
            </div>
          )}

          {/* 편집 모드가 아닐 때 빈 상태 메시지 */}
          {!groups.length && !isEditing && (
            <div className="center h-full w-full text-xs text-gray-300">
              현재 등록된 {type.startsWith("required") ? "필수" : "선택"} 옵션이
              없습니다.
            </div>
          )}

          {/* 하단 추가 버튼 - 편집 중이고 순서 변경 모드가 아닐 때만 표시 */}
          {isEditing && popupAction !== "순서 변경" && (
            <ResponsiveButton
              type="button"
              variant="outline"
              color="black"
              responsiveButtons={{
                lg: { buttonSize: "sm", className: "w-full border-gray-600" },
                md: { buttonSize: "sm", className: "w-full border-gray-600" },
                sm: { buttonSize: "sm", className: "w-full border-gray-600" },
              }}
              onClick={() =>
                appendGroup({
                  name: "",
                  printEnabled: true,
                  menuOptions: [{ name: "", price: 0 }],
                } as any)
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
