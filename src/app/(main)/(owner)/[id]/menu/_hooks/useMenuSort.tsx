import { useRef, useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { arrayMove } from "@/components/dnd/index";
import getQueryClient from "@/app/get-query-client";
import { menuKeys } from "../_queries/keys";
import { menuQueries } from "../_queries/useMenu";
import { menuListSchema, TypeMenuList } from "../_schema/menu.schema";

export function useMenuSort(storeId: string, categoryId: string) {
  const queryClient = getQueryClient();
  const initialRef = useRef<TypeMenuList["menus"]>([]);
  const form = useForm<TypeMenuList>({
    mode: "onChange",
    resolver: zodResolver(menuListSchema),
    defaultValues: { menus: [] },
  });

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
    if (oldIndex === newIndex) return;

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

  const handleSortSave = async (successHandler: () => void) => {
    const finalList = form.watch("menus");
    if (!finalList || finalList.length === 0) return;

    const simulated = initialRef.current.map((m) => m.menuId!);

    const movesToApply: {
      sourceId: string;
      targetId: string;
      where: "NEXT";
    }[] = [];

    for (let i = 1; i < finalList.length; i += 1) {
      const sourceId = finalList[i].menuId!;
      const targetId = finalList[i - 1].menuId!;

      const srcIdx = simulated.indexOf(sourceId);
      const tgtIdx = simulated.indexOf(targetId);
      const shouldApply =
        srcIdx !== -1 && tgtIdx !== -1 && srcIdx !== tgtIdx + 1;
      if (shouldApply) {
        movesToApply.push({ sourceId, targetId, where: "NEXT" });
        simulated.splice(srcIdx, 1);
        const newIdx = simulated.indexOf(targetId) + 1;
        simulated.splice(newIdx, 0, sourceId);
      }
    }

    if (movesToApply.length === 0) return;

    for (let i = 0; i < movesToApply.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await move.mutateAsync({ storeId, ...movesToApply[i] });
    }

    initialRef.current = finalList;
    setPendingMoves([]);
    queryClient.invalidateQueries({
      queryKey: menuKeys.category(storeId, categoryId),
    });
    successHandler();
  };

  return {
    form,
    handleDragEnd,
    setInit,
    pendingMoves,
    handleSortSave,
  };
}
