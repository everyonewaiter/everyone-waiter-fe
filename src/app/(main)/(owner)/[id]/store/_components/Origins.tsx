import Icon from "@/components/common/Icon/Icon";
import { PropsWithChildren } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { useMediaQuery } from "react-responsive";
import type {} from "./FormComponent";
import { FormType } from "../_hooks/useStoreForm";

function TableRow({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <div className={`center h-full w-full text-center ${className}`}>
      {children}
    </div>
  );
}

interface IProps {
  isEditing: boolean;
}

export default function Origins({ isEditing }: IProps) {
  const isLargeScreen = useMediaQuery({ query: "(min-width: 961px)" });

  const form = useFormContext<FormType>();
  const { fields, remove } = useFieldArray({
    control: form.control,
    name: "origins",
  });

  return (
    <div className="text-s flex flex-col overflow-hidden rounded-[12px] border border-gray-600 font-medium">
      <div className="flex h-10 w-full bg-gray-700">
        <TableRow className="w-full">품목</TableRow>
        <TableRow className="w-full">원산지</TableRow>
        {isEditing && (
          <TableRow className="text-primary w-full text-center lg:w-20 lg:flex-shrink-0">
            삭제
          </TableRow>
        )}
      </div>
      {fields?.map((item, idx) => (
        <div
          key={item.id}
          className={`flex h-10 w-full ${
            idx !== fields.length - 1 && "border-b border-b-gray-600"
          }`}
        >
          <TableRow className="w-full">
            {isEditing ? (
              <input
                placeholder={
                  isLargeScreen ? "품목을 입력해주세요" : "품목 입력"
                }
                {...form.register(`origins.${idx}.item`)}
                className="w-full text-center outline-none"
              />
            ) : (
              item.item
            )}
          </TableRow>
          <TableRow className="w-full">
            {isEditing ? (
              <input
                placeholder={
                  isLargeScreen ? "원산지를 입력해주세요" : "원산지 입력"
                }
                {...form.register(`origins.${idx}.origin`)}
                className="w-full text-center outline-none"
              />
            ) : (
              item.origin
            )}
          </TableRow>
          {isEditing && (
            <TableRow className="w-full text-center lg:w-20 lg:flex-shrink-0">
              <button type="button" onClick={() => remove(idx)}>
                <Icon iconKey="trash" size={16} className="text-primary" />
              </button>
            </TableRow>
          )}
        </div>
      ))}
    </div>
  );
}
