import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { arrayMove } from "@/components/dnd/index";
import getQueryClient from "@/app/get-query-client";
import { menuQueries } from "../_queries/useMenu";
import { menuListSchema, TypeMenuList } from "../_schema/menu.schema";

export function useMenuSort(storeId: string) {
  const queryClient = getQueryClient();
  const form = useForm<TypeMenuList>({
    mode: "onChange",
    resolver: zodResolver(menuListSchema),
    defaultValues: { menus: [] },
  });

  const move = menuQueries.useMove();

  const handleDragEnd = ({ active, over }: any) => {
    if (!over) return;
    const list = form.watch("menus");
    const oldIndex = list.findIndex((i) => i.menuId === active.id);
    const newIndex = list.findIndex((i) => i.menuId === over.id);
    if (oldIndex < 0 || newIndex < 0) return;
    if (oldIndex === newIndex) return;

    const moved = arrayMove(list, oldIndex, newIndex);

    form.setValue("menus", moved);

    move.mutate(
      {
        storeId,
        sourceId: list[oldIndex].menuId!,
        targetId: list[newIndex].menuId!,
        where: oldIndex < newIndex ? "NEXT" : "PREV",
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            predicate: (query) => {
              const { queryKey } = query;
              return (
                Array.isArray(queryKey) &&
                queryKey.length >= 2 &&
                queryKey[0] === "menus" &&
                queryKey[1] === storeId
              );
            },
          });
        },
        onError: () => {
          form.setValue("menus", list);
        },
      }
    );
  };

  return {
    form,
    handleDragEnd,
  };
}
