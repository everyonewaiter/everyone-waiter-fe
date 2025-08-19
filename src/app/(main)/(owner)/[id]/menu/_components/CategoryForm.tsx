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

interface IProps {
  optionState: "move" | "delete" | null;
  initialCategoriesRef: RefObject<Category[]>;
  items: TypeCategoryForm["categories"];
  onSetItems: (
    items:
      | TypeCategoryForm["categories"]
      | ((
          prev: TypeCategoryForm["categories"]
        ) => TypeCategoryForm["categories"])
  ) => void;
  onSetPendingMoves: (
    value:
      | {
          sourceId: string;
          targetId: string;
          where: "NEXT" | "PREVIOUS";
        }
      | ((
          prev: {
            sourceId: string;
            targetId: string;
            where: "NEXT" | "PREVIOUS";
          }[]
        ) => {
          sourceId: string;
          targetId: string;
          where: "NEXT" | "PREVIOUS";
        }[])
  ) => void;
}

export default function CategoryForm({
  optionState,
  initialCategoriesRef,
  items,
  onSetItems,
  onSetPendingMoves,
}: IProps) {
  const form = useFormContext<TypeCategoryForm>();

  return (
    <div className="scrollbar-hide overflow-y-auto md:h-[270px] lg:h-[424px]">
      {optionState === "move" ? (
        <DndContext
          onDragEnd={(event) => {
            onSetItems((prev: TypeCategoryForm["categories"]) => {
              if (event?.active?.id !== event?.over?.id) {
                const dragIndex = prev.findIndex(
                  (value) => value.categoryId === event?.active?.id
                );
                const hoverIndex = prev.findIndex(
                  (value) => value.categoryId === event?.over?.id
                );

                if (dragIndex !== -1 && hoverIndex !== -1) {
                  const sourceId = prev[dragIndex].categoryId;
                  const targetId = prev[hoverIndex].categoryId;
                  const where = dragIndex < hoverIndex ? "NEXT" : "PREVIOUS";

                  // Prevent duplicate moves by checking if this move already exists
                  onSetPendingMoves((prevMoves) => {
                    const existingMove = prevMoves.find(
                      (move) => move.sourceId === sourceId
                    );
                    if (
                      existingMove &&
                      existingMove.targetId === targetId &&
                      existingMove.where === where
                    ) {
                      return prevMoves; // Return unchanged if same move already exists
                    }

                    // Remove any existing move for this sourceId and add the new one
                    return [
                      ...prevMoves.filter((move) => move.sourceId !== sourceId),
                      { sourceId, targetId, where },
                    ];
                  });
                }

                return arrayMove(prev, dragIndex, hoverIndex);
              }

              return prev;
            });
          }}
        >
          <SortableContext
            strategy={verticalListSortingStrategy}
            items={items.map((category) => ({
              ...category,
              id: category.categoryId,
            }))}
          >
            {items?.map((category, index) => (
              <div
                className="mb-2 flex gap-2"
                key={category.name || `temp-${index}`}
              >
                <CategoryFormItem
                  index={index}
                  categoryId={category.categoryId}
                  optionState={optionState}
                  initialCategoriesRef={initialCategoriesRef}
                />
              </div>
            ))}
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
