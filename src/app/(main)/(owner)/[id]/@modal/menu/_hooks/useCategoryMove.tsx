import { arrayMove } from "@/components/dnd/index";
import { useState } from "react";
import { categoryQueries } from "../../../menu/_queries/useCategories";

export default function useCategoryMove(storeId: string) {
  const [pendingMoves, setPendingMoves] = useState<
    { sourceId: string; targetId: string; where: "NEXT" | "PREVIOUS" }[]
  >([]);

  const move = categoryQueries.useMoveCategory(storeId);

  const handleDrag = ({
    active,
    over,
    categories,
    setCategories,
  }: {
    active: any;
    over: any;
    categories: Category[];
    setCategories: (val: Category[]) => void;
  }) => {
    if (!over) return;

    const oldIndex = categories?.findIndex((c) => c.categoryId === active.id);
    const newIndex = categories?.findIndex((c) => c.categoryId === over.id);

    if (oldIndex === -1 || newIndex === -1) return;

    const sorted = arrayMove(categories, oldIndex, newIndex);

    setCategories(sorted);
    setPendingMoves((prev) => [
      ...prev,
      {
        sourceId: categories[oldIndex].categoryId!,
        targetId: categories[newIndex].categoryId!,
        where: oldIndex < newIndex ? "NEXT" : "PREVIOUS",
      },
    ]);
  };

  const handleSortSave = (successHandler: () => void) => {
    Promise.all(
      pendingMoves.map((moveData) =>
        move.mutate({ storeId, ...moveData }, { onSuccess: successHandler })
      )
    );
  };

  return {
    handleDrag,
    handleSortSave,
  };
}
