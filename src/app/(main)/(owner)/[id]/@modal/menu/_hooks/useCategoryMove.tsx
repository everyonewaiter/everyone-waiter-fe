import { arrayMove } from "@dnd-kit/sortable";
import { useCallback, useEffect, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import getQueryClient from "@/app/get-query-client";
import {
  categoryFormSchema,
  TypeCategoryForm,
} from "../../../menu/_schema/category.schema";
import { categoryQueries } from "../../../menu/_queries/useCategories";
import { categoryKeys } from "../../../menu/_queries/keys";

export default function useCategoryMove(storeId: string) {
  const queryClient = getQueryClient();
  const initialRef = useRef<TypeCategoryForm["categories"]>([]);

  const form = useForm<TypeCategoryForm>({
    mode: "onChange",
    resolver: zodResolver(categoryFormSchema),
    defaultValues: { categories: [] },
  });

  const { data: categories } = categoryQueries.useCategories(storeId);
  const move = categoryQueries.useMoveCategory(storeId);

  const [isSortSubmitting, setIsSortSubmitting] = useState(false);
  const [moves, setMoves] = useState<
    {
      sourceId: string;
      targetId: string;
      where: "NEXT" | "PREVIOUS";
    }[]
  >([]);

  const setInit = useCallback(
    (data: TypeCategoryForm["categories"]) => {
      form.reset({ categories: data });
      initialRef.current = data;
    },
    [form]
  );

  useEffect(() => {
    if (categories) {
      setInit(
        categories?.categories.map((el) => ({
          ...el,
          isAdded: false,
          isUpdated: false,
        }))
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categories]);

  const handleDrag = ({ active, over }: any) => {
    if (!over) return;
    const list = form.watch("categories");
    const oldIndex = list.findIndex((i) => (i.name || "") === active.id);
    const newIndex = list.findIndex((i) => (i.name || "") === over.id);
    if (oldIndex < 0 || newIndex < 0) return;

    const moved = arrayMove(list, oldIndex, newIndex);
    form.setValue("categories", moved);
    setMoves((prev) => [
      ...prev,
      {
        sourceId: list[oldIndex].categoryId!,
        targetId: list[newIndex].categoryId!,
        where: oldIndex < newIndex ? "NEXT" : "PREVIOUS",
      },
    ]);
  };

  const handleSortSave = async (successHandler: () => void) => {
    const lastMove = moves.at(-1);
    if (lastMove) {
      setIsSortSubmitting(true);
      move.mutate(
        {
          storeId,
          sourceId: lastMove.sourceId!,
          targetId: lastMove.targetId!,
          where: lastMove.where,
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: categoryKeys.all(storeId),
            });
            successHandler();
          },
          onError: () => setIsSortSubmitting(false),
        }
      );
    }
  };

  const resetMoves = () => setMoves([]);

  return {
    form,
    handleDrag,
    handleSortSave,
    setInit,
    resetMoves,
    initialRef,
    isSortSubmitting,
    categories,
  };
}
