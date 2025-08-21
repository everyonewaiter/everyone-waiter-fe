import { RefObject } from "react";
import { useFormContext } from "react-hook-form";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { DndContext } from "@dnd-kit/core";
import CategoryFormItem from "./CategoryFormItem";
import { TypeCategoryForm } from "../_schema/category.schema";
import { categoryQueries } from "../_queries/useCategories";

interface IProps {
  optionState: "move" | "delete" | null;
  initialCategoriesRef: RefObject<Category[]>;
  storeId: string;
  items: TypeCategoryForm["categories"];
  setItems: (items: TypeCategoryForm["categories"]) => void;
}

export default function CategoryForm({
  optionState,
  initialCategoriesRef,
  storeId,
  items,
  setItems,
}: IProps) {
  const form = useFormContext<TypeCategoryForm>();

  const move = categoryQueries.useMoveCategory();

  return (
    <div className="scrollbar-hide overflow-y-auto md:h-[270px] lg:h-[424px]">
      {optionState === "move" ? (
        <DndContext
          onDragEnd={(event) => {
            const categories = form.watch("categories");
            const activeId = event?.active?.id as string | undefined;
            const overId = event?.over?.id as string | undefined;

            if (!activeId || !overId || activeId === overId) return;

            const dragIndex = categories.findIndex(
              (v) => v.categoryId === activeId
            );
            const hoverIndex = categories.findIndex(
              (v) => v.categoryId === overId
            );
            if (dragIndex === -1 || hoverIndex === -1) return;

            const where = dragIndex < hoverIndex ? "NEXT" : "PREVIOUS";

            const nextCategories = arrayMove(categories, dragIndex, hoverIndex);
            setItems(nextCategories);

            move.mutate(
              {
                sourceId: activeId,
                targetId: overId,
                where,
                storeId,
              },
              {
                onSuccess: () => {
                  form.setValue("categories", nextCategories);
                },
              }
            );
          }}
        >
          <SortableContext
            strategy={verticalListSortingStrategy}
            items={items.map((category) => ({
              ...category,
              id: category.categoryId,
            }))}
          >
            <div className="mb-2 flex flex-col gap-2 md:gap-4">
              {items?.map((category, index) => (
                <CategoryFormItem
                  key={category.name || `temp-${index}`}
                  index={index}
                  categoryId={category.categoryId}
                  optionState={optionState}
                  initialCategoriesRef={initialCategoriesRef}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
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
