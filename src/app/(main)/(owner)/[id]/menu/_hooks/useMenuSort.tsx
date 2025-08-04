import { arrayMove } from "@dnd-kit/sortable";
import { useEffect, useRef, useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import useMenu from "../_queries/useMenu";

export function useMenuSort(storeId: string, categoryId: string) {
  const initialRef = useRef<Menu[]>([]);
  const form = useForm<{ menus: Menu[] }>({
    defaultValues: { menus: [] },
  });

  const { query: menuQuery, move } = useMenu(storeId);
  const menus = menuQuery(categoryId).data?.menus;

  const setInit = useCallback(
    (data: Menu[]) => {
      form.reset({ menus: data });
      initialRef.current = data;
    },
    [form]
  );

  const [pendingMoves, setPendingMoves] = useState<
    { sourceId: string; targetId: string; where: "NEXT" | "PREVIOUS" }[]
  >([]);

  const handleDragEnd = ({ active, over }: any) => {
    if (!over) return;
    const list = form.watch("menus");
    const oldIndex = list.findIndex((i) => i.menuId === active.id);
    const newIndex = list.findIndex((i) => i.menuId === over.id);
    if (oldIndex < 0 || newIndex < 0) return;

    const moved = arrayMove(list, oldIndex, newIndex);
    form.setValue("menus", moved);
    setPendingMoves((prev) => [
      ...prev,
      {
        sourceId: list[oldIndex].menuId,
        targetId: list[newIndex].menuId,
        where: oldIndex < newIndex ? "NEXT" : "PREVIOUS",
      },
    ]);
  };

  useEffect(() => {
    if (menus) setInit(menus);
  }, [menus, setInit]);

  const handleSortSave = async () => {
    await Promise.all(
      pendingMoves.map((moveData) => move.mutateAsync({ storeId, ...moveData }))
    );
  };

  return {
    form,
    handleDragEnd,
    setInit,
    pendingMoves,
    handleSortSave,
  };
}
