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

const queryClient = getQueryClient();

const useCategories = (storeId: string) =>
  useQuery({
    queryKey: categoryKeys.all(storeId),
    queryFn: () => getCategories({ storeId }),
    enabled: !!storeId,
    staleTime: 1000 * 60 * 5,
  });

const useAddCategory = () =>
  useMutation({
    mutationFn: makeCategory,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: categoryKeys.all(variables.storeId),
      });
    },
  });

const useMoveCategory = (storeId: string) =>
  useOptimisticReorderMutation(moveCategory, () => categoryKeys.all(storeId));

const useUpdateCategory = () =>
  useMutation({
    mutationFn: updateCategory,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: categoryKeys.all(variables.storeId),
      });
    },
  });

const useDeleteCategory = () =>
  useMutation({
    mutationFn: deleteCategory,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: categoryKeys.all(variables.storeId),
      });
    },
  });

export const categoryQueries = {
  useAddCategory,
  useCategories,
  useDeleteCategory,
  useMoveCategory,
  useOptimisticReorderMutation,
  useUpdateCategory,
};
