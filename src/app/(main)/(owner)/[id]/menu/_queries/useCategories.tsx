import getQueryClient from "@/app/get-query-client";
import {
  deleteCategory,
  getCategories,
  makeCategory,
  moveCategory,
  updateCategory,
} from "@/lib/api/menu.api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { categoryKeys } from "./queryKeys";

export default function useCategories(storeId: string) {
  const queryClient = getQueryClient();

  const query = useQuery({
    queryKey: categoryKeys.all(storeId),
    queryFn: () => getCategories({ storeId }),
  });

  const add = useMutation({
    mutationFn: makeCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoryKeys.all(storeId) });
    },
  });

  const move = useMutation({
    mutationFn: moveCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoryKeys.all(storeId) });
    },
  });

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

  return { query, add, move, update, remove };
}
