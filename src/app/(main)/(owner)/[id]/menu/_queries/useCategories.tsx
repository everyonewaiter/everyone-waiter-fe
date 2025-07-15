import { useMutation, useQuery } from "@tanstack/react-query";
import {
  deleteCategory,
  getCategories,
  makeCategory,
  moveCategory,
  updateCategory,
} from "@/app/(main)/(owner)/[id]/menu/_api/menu.api";
import getQueryClient from "@/app/get-query-client";
import { useOptimisticReorderMutation } from "@/hooks/useOptimisticReorder";
import { categoryKeys } from "./keys";

export default function useCategories(storeId: string) {
  const queryClient = getQueryClient();

  const categories = (_storeId: string) =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useQuery({
      queryKey: categoryKeys.all(_storeId),
      queryFn: () => getCategories({ storeId: _storeId }),
      enabled: !!_storeId,
      staleTime: 1000 * 60 * 5,
    });

  const add = useMutation({
    mutationFn: makeCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoryKeys.all(storeId) });
    },
  });

  const move = useOptimisticReorderMutation(moveCategory, (_storeId) =>
    categoryKeys.all(_storeId)
  );

  const update = useMutation({
    mutationFn: updateCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoryKeys.all(storeId) });
    },
  });

  const remove = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoryKeys.all(storeId) });
    },
  });

  return { categories, add, move, update, remove };
}
