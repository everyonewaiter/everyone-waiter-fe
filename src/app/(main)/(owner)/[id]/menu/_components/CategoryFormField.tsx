import { useSortable, CSS } from "@/components/dnd/index";
import { Controller, useFormContext } from "react-hook-form";
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
import { useStoreContext } from "@/providers/storeProvider";
import { categoryQueries } from "../_queries/useCategories";
import { TypeCategoryForm } from "../_schema/category.schema";
import useCategoryForm from "../../@modal/menu/_hooks/useCategoryForm";

interface IProps extends Category {
  changeMove: boolean;
}

export default function CategoryFormField({ changeMove, ...fields }: IProps) {
  const { storeId } = useStoreContext();

  const form = useFormContext<TypeCategoryForm>();
  const { initialCategoriesRef } = useCategoryForm(storeId);

  const index = form
    .watch("categories")
    .findIndex((f) => f.categoryId === fields.categoryId);

  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
  } = useSortable({ id: fields.categoryId });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const { data } = categoryQueries.useCategories(storeId);
  const update = categoryQueries.useUpdateCategory();
  const add = categoryQueries.useAddCategory();
  const remove = categoryQueries.useDeleteCategory();

  const handleUpdate = async () => {
    const category = form.getValues(`categories.${index}`);
    const prevCategory = initialCategoriesRef.current[index];

    if (!category.name.trim()) return;
    if (prevCategory && prevCategory.name === category.name) return;

    if (category.categoryId) {
      update.mutate({
        storeId,
        categoryId: category.categoryId,
        categoryName: category.name,
      });
    } else {
      add.mutate({
        storeId,
        categoryName: category.name,
      });
    }
  };

  return (
    <div className="mb-2 flex gap-2">
      <Controller
        control={form.control}
        name={`categories.${index}.name`}
        render={({ field }) => (
          <FormItem className="w-full" ref={setNodeRef} style={style}>
            <FormLabel>카테고리 {index + 1}</FormLabel>
            <div className="flex items-center gap-2">
              <FormControl className="flex flex-1 gap-2">
                <Input
                  placeholder="카테고리 이름"
                  className={cn(
                    "placeholder:text-gray-500",
                    changeMove ? "cursor-default" : ""
                  )}
                  readOnly={changeMove}
                  {...field}
                  value={field.value}
                  onBlur={() => handleUpdate()}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.nativeEvent.isComposing) {
                      handleUpdate();
                    }
                  }}
                />
              </FormControl>
              <ResponsiveButton
                variant="outline"
                responsiveButtons={{
                  lg: {
                    buttonSize: "custom",
                    className: cn(
                      "h-10 w-10 rounded-[12px] border justify-center items-center bg-white",
                      changeMove ? "border-gray-600" : "border-status-error "
                    ),
                  },
                  md: {
                    buttonSize: "custom",
                    className: "w-7 h-7 rounded-[8px] border-gray-600 border",
                  },
                }}
                onClick={() =>
                  changeMove
                    ? null
                    : (() => {
                        // 기존 데이터에서 존재하는지 확인
                        const isInitial = data?.categories.find(
                          (el) => el.categoryId === fields.categoryId
                        );
                        if (isInitial) {
                          // 존재한다면 백엔드에 삭제 요청
                          remove.mutate({
                            categoryId: fields.categoryId,
                            storeId,
                          });
                        } else {
                          // 새로 추가된거라면 필드에서 바로 삭제
                          form.setValue(
                            "categories",
                            data?.categories.filter(
                              (el) => el.categoryId !== fields.categoryId
                            ) as Category[]
                          );
                        }
                      })()
                }
                commonClassName="hover:!bg-white"
                ref={changeMove ? setActivatorNodeRef : undefined}
                {...(changeMove ? { ...attributes, ...listeners } : {})}
              >
                <Icon
                  iconKey={changeMove ? "move" : "trash"}
                  className={cn(
                    changeMove ? "text-black" : "text-status-error",
                    "md:h-4 md:w-4 lg:h-5 lg:w-5"
                  )}
                  size={20}
                />
              </ResponsiveButton>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
