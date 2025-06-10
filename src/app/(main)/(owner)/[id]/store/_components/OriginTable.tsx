/* eslint-disable react/no-array-index-key */
import { originSchema, TypeStoreInfo } from "@/schema/store.schema";
import { UseFormReturn } from "react-hook-form";
import Icon from "@/components/common/Icon";
import TableRow from "./TableRow";

interface IProps {
  isEditing: boolean;
  form: UseFormReturn<TypeStoreInfo>;
}

export default function OriginTable({ isEditing, form }: IProps) {
  const handleDeleteItem = (index: number) => {
    const currentOrigins = form.watch("origins");
    const newOrigins = currentOrigins.filter((_, i) => i !== index);
    form.setValue("origins", newOrigins);
  };

  const handleChangeItem = (
    index: number,
    field: Exclude<keyof typeof originSchema.shape, "isAdded"> & string,
    value: string
  ) => {
    const test = form.watch("origins");
    test[index][field] = value;
    form.setValue("origins", test, {
      shouldDirty: true,
    });
  };

  const commonStyle = isEditing ? "flex flex-[0.4]" : "flex flex-1";

  return (
    <div className="text-s flex flex-col overflow-hidden rounded-[12px] border border-gray-600 font-medium">
      <div className="flex h-10 w-full bg-gray-700">
        <TableRow className={commonStyle}>품목</TableRow>
        <TableRow className={commonStyle}>원산지</TableRow>
        {isEditing && (
          <TableRow className="text-primary flex w-full flex-[0.2]">
            삭제
          </TableRow>
        )}
      </div>
      {form.watch("origins")?.map((item, idx) => (
        <div
          key={idx}
          className={`flex h-10 w-full ${
            idx !== form.watch("origins").length - 1 &&
            "border-b border-b-gray-600"
          }`}
        >
          {item.isAdded ? (
            <>
              <TableRow className={commonStyle}>
                <input
                  className="h-full text-center outline-none"
                  placeholder="품목 입력"
                  value={item.item}
                  onChange={(e) =>
                    handleChangeItem(idx, "item", e.target.value)
                  }
                />
              </TableRow>
              <TableRow className={commonStyle}>
                <input
                  className="h-full text-center outline-none"
                  placeholder="원산지 입력"
                  value={item.origin}
                  onChange={(e) =>
                    handleChangeItem(idx, "origin", e.target.value)
                  }
                />
              </TableRow>
            </>
          ) : (
            <>
              <TableRow className={commonStyle}>{item.item}</TableRow>
              <TableRow className={commonStyle}>{item.origin}</TableRow>
            </>
          )}
          {isEditing && (
            <button
              type="button"
              className="flex h-full flex-[0.2] items-center justify-center"
              onClick={() => handleDeleteItem(idx)}
            >
              <Icon
                iconKey="trash"
                className="text-primary h-[18px] w-[16px]"
              />
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
