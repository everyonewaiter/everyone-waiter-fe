import getQueryClient from "@/app/get-query-client";
import {
  deleteCategory,
  getCategories,
  makeCategory,
  moveCategory,
  updateCategory,
} from "@/lib/api/menu.api";
import { useMutation, useQuery } from "@tanstack/react-query";

export default function useCategories(storeId: string) {
  const queryClient = getQueryClient();

  const query = useQuery({
    queryKey: ["categories", storeId],
    queryFn: () => getCategories({ storeId }),
  });

  const { mutate: add } = useMutation({
    mutationFn: makeCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories", storeId] });
    },
  });

  const { mutate: move } = useMutation({
    mutationFn: moveCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories", storeId] });
    },
  });

  const { mutate: update } = useMutation({
    mutationFn: updateCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories", storeId] });
    },
  });

  const { mutate: remove } = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories", storeId] });
    },
  });

  return { categoryListQuery: query, add, move, update, remove };
}
