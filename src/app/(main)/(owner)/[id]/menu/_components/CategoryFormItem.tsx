import { RefObject } from "react";
import ResponsiveButton from "@/components/common/Button/ResponsiveButton";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/common/Form";
import Icon from "@/components/common/Icon/Icon";
import Input from "@/components/common/Input";
import cn from "@/lib/utils";
import { CSS, useSortable } from "@/components/dnd/index";
import { useFormContext, Controller } from "react-hook-form";
import { useStoreContext } from "@/providers/storeProvider";
import { categoryQueries } from "../_queries/useCategories";
import { TypeCategoryForm } from "../_schema/category.schema";

interface IProps {
  categoryId: string;
  index: number;
  optionState: "move" | "delete" | null;
  initialCategoriesRef: RefObject<Category[]>;
}

export default function CategoryFormItem({
  index,
  optionState,
  categoryId,
}: IProps) {
  const { storeId } = useStoreContext();
  const form = useFormContext<TypeCategoryForm>();

  const { data } = categoryQueries.useCategories(storeId);
  const remove = categoryQueries.useDeleteCategory();

  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
  } = useSortable({ id: categoryId });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleDelete = () => {
    const isInitial = data?.categories.find(
      (el) => el.categoryId === categoryId
    );
    if (isInitial) {
      remove.mutate({
        categoryId,
        storeId,
      });
    } else {
      form.setValue(
        "categories",
        (form.getValues("categories") || []).filter(
          (el) => el.categoryId !== categoryId
        )
      );
    }
  };

  const handleUpdate = () => {
    // NOTE 카테고리 아이디가 없으면 (새로 추가됨) -> isUpdated로 변경하지 않음
    if (form.getValues(`categories.${index}.categoryId`)) {
      form.setValue(`categories.${index}.isUpdated`, true);
    }
  };

  return (
    <FormItem className="w-full" ref={setNodeRef} style={style}>
      <FormLabel>카테고리 {index + 1}</FormLabel>
      <div className="flex items-center gap-2">
        <FormControl className="flex flex-1 gap-2">
          <Controller
            control={form.control}
            name={`categories.${index}.name`}
            render={({ field }) => (
              <Input
                placeholder="카테고리 이름"
                className={cn(
                  "placeholder:text-gray-500",
                  optionState === "move" ? "cursor-default" : ""
                )}
                readOnly={!!optionState}
                {...field}
                value={field.value ?? ""}
                onBlur={handleUpdate}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.nativeEvent.isComposing) {
                    handleUpdate();
                  }
                }}
              />
            )}
          />
        </FormControl>
        {optionState && (
          <ResponsiveButton
            variant="outline"
            responsiveButtons={{
              lg: {
                buttonSize: "custom",
                className: cn(
                  "h-10 w-10 rounded-[12px] border justify-center items-center bg-white",
                  optionState === "move" && "border-gray-600",
                  optionState === "delete" && "border-status-error"
                ),
              },
              md: {
                buttonSize: "custom",
                className: "w-7 h-7 rounded-[8px] border-gray-600 border",
              },
            }}
            onClick={() => (optionState === "delete" ? handleDelete() : null)}
            commonClassName="hover:!bg-white"
            ref={optionState === "move" ? setActivatorNodeRef : undefined}
            {...(optionState === "move" ? { ...attributes, ...listeners } : {})}
          >
            <Icon
              iconKey={optionState === "move" ? "move" : "trash"}
              className={cn(
                optionState === "move" ? "text-black" : "text-status-error",
                "md:h-4 md:w-4 lg:h-5 lg:w-5"
              )}
              size={20}
            />
          </ResponsiveButton>
        )}
      </div>
      <FormMessage />
    </FormItem>
  );
}
