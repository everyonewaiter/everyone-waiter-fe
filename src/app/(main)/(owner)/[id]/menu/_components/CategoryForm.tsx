import { RefObject, useRef } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { SortableContext } from "@dnd-kit/sortable";
import { DndContext } from "@dnd-kit/core";
import CategoryFormItem from "./CategoryFormItem";
import { TypeCategoryForm } from "../_schema/category.schema";
import { categoryQueries } from "../_queries/useCategories";

interface IProps {
  optionState: "move" | "delete" | null;
  initialCategoriesRef: RefObject<Category[]>;
  storeId: string;
}

export default function CategoryForm({
  optionState,
  initialCategoriesRef,
  storeId,
}: IProps) {
  const form = useFormContext<TypeCategoryForm>();
  const { fields, move } = useFieldArray({
    control: form.control,
    name: "categories",
  });
  const moveMutation = categoryQueries.useMoveCategory();
  const scrollRef = useRef<HTMLDivElement>(null);

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

  const isTempOrAdded = (item: any) => {
    const id = String(item?.categoryId ?? "");
    return item?.isAdded || id.startsWith("temp-");
  };

  return (
    <div
      className="scrollbar-hide overflow-y-auto md:h-[270px] lg:h-[424px]"
      ref={scrollRef}
    >
      {optionState === "move" ? (
        <DndContext
          modifiers={[restrictToParentElement, restrictToVerticalAxis]}
          onDragEnd={(event) => {
            const activeId = event?.active?.id as string | undefined;
            const overId = event?.over?.id as string | undefined;
            if (!activeId || !overId || activeId === overId) return;

            const from = fields.findIndex(
              (f: any) => f.categoryId === activeId
            );
            const to = fields.findIndex((f: any) => f.categoryId === overId);
            if (from === -1 || to === -1) return;

            const where = from < to ? "NEXT" : "PREV";
            const source = fields[from] as any;
            const target = fields[to] as any;
            const sourceId = source?.categoryId as string;
            const targetId = target?.categoryId as string;

            const prevScrollTop = scrollRef.current?.scrollTop ?? 0;
            move(from, to);
            requestAnimationFrame(() => {
              if (scrollRef.current) {
                scrollRef.current.scrollTop = prevScrollTop;
              }
            });

            if (!isTempOrAdded(source) && !isTempOrAdded(target)) {
              moveMutation.mutate({ storeId, sourceId, targetId, where });
            }
          }}
        >
          <SortableContext
            items={fields.map((f: any) => ({ ...f, id: f.categoryId }))}
          >
            <div className="mb-2 flex flex-col gap-3 lg:gap-4">
              {fields?.map((field: any, index) => (
                <CategoryFormItem
                  key={field.id}
                  index={index}
                  categoryId={field.categoryId}
                  optionState={optionState}
                  initialCategoriesRef={initialCategoriesRef}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      ) : (
        <div className="flex flex-col gap-3 lg:gap-4">
          {form.watch("categories")?.map((category, index) => (
            <CategoryFormItem
              key={category.categoryId}
              index={index}
              categoryId={category.categoryId}
              optionState={optionState}
              initialCategoriesRef={initialCategoriesRef}
            />
          ))}
        </div>
      )}
    </div>
  );
}
