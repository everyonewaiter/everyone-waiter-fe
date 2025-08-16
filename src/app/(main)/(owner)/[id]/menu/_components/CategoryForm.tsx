import { RefObject } from "react";
import { useFormContext } from "react-hook-form";
import { verticalListSortingStrategy } from "@dnd-kit/sortable";
import Sortable from "@/components/Sortable";
import CategoryFormItem from "./CategoryFormItem";
import { TypeCategoryForm } from "../_schema/category.schema";

interface IProps {
  optionState: "move" | "delete" | null;
  initialCategoriesRef: RefObject<Category[]>;
  handleDrag: ({ active, over }: any) => void;
}

export default function CategoryForm({
  optionState,
  initialCategoriesRef,
  handleDrag,
}: IProps) {
  const form = useFormContext<TypeCategoryForm>();

  return (
    <div className="overflow-y-auto md:h-[270px] lg:h-[424px]">
      {optionState === "move" ? (
        <Sortable
          sortingStrategy={verticalListSortingStrategy}
          items={
            form
              .watch("categories")
              ?.map((c, i) => (c.name ? c.name : `temp-${i}`)) || []
          }
          onDragEnd={handleDrag}
        >
          {form.watch("categories")?.map((category, index) => (
            <div
              className="mb-2 flex gap-2"
              key={category.name || `temp-${index}`}
            >
              <CategoryFormItem
                index={index}
                categoryId={category.categoryId}
                optionState={optionState}
                initialCategoriesRef={initialCategoriesRef}
                sortableId={category.name || `temp-${index}`}
              />
            </div>
          ))}
        </Sortable>
      ) : (
        <div className="flex flex-col md:gap-3 lg:gap-4">
          {form.watch("categories")?.map((category, index) => (
            <div className="mb-2 flex gap-2" key={category.categoryId}>
              <CategoryFormItem
                index={index}
                categoryId={category.categoryId}
                optionState={optionState}
                initialCategoriesRef={initialCategoriesRef}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
