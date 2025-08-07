import { useEffect, useRef, useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { arrayMove } from "@/components/dnd/index";
import { menuQueries } from "../_queries/useMenu";
import { menuListSchema, TypeMenuList } from "../_schema/menu.schema";

export function useMenuSort(storeId: string, categoryId: string) {
  const initialRef = useRef<TypeMenuList["menus"]>([]);
  const form = useForm<TypeMenuList>({
    mode: "onChange",
    resolver: zodResolver(menuListSchema),
    defaultValues: { menus: [] },
  });

  const { data: menus } = menuQueries.useMenuList(storeId, categoryId);
  const move = menuQueries.useMove();

  const setInit = useCallback(
    (data: TypeMenuList["menus"]) => {
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
        sourceId: list[oldIndex].menuId!,
        targetId: list[newIndex].menuId!,
        where: oldIndex < newIndex ? "NEXT" : "PREVIOUS",
      },
    ]);
  };

  useEffect(() => {
    if (menus?.menus)
      setInit(
        menus.menus.map((el) => ({
          ...el,
          category: el.categoryId,
          label: el.label!,
        }))
      );
  }, [menus?.menus, setInit]);

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
