/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  deleteMenu,
  deleteMultipleMenus,
  getMenuDetail,
  getMenuList,
  moveMenus,
  postMenu,
  updateMenuWithImage,
  updateMenuWithoutImage,
} from "@/app/(main)/(owner)/[id]/menu/_api/menu.api";
import getQueryClient from "@/app/get-query-client";
import { useOptimisticReorderMutation } from "@/hooks/useOptimisticReorder";
import { menuKeys } from "./keys";

const queryClient = getQueryClient();

const useMenuList = (storeId: string, categoryId: string) =>
  useQuery({
    queryKey: menuKeys.category(storeId, categoryId),
    queryFn: () => getMenuList({ storeId, categoryId }),
    enabled: !!categoryId,
    staleTime: 1000 * 60 * 5,
  });

const useMenuDetail = (storeId: string, categoryId: string, menuId: string) =>
  useQuery({
    queryKey: menuKeys.menuInCategory(storeId, categoryId, menuId),
    queryFn: () => getMenuDetail({ storeId, categoryId, menuId }),
    enabled: !!categoryId && !!menuId && !!storeId,
    staleTime: 1000 * 60 * 5,
  });

const useAddMenu = (storeId: string) =>
  useMutation({
    mutationFn: postMenu,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: menuKeys.category(storeId, variables.categoryId),
      });
    },
    // eslint-disable-next-line no-alert
    onError: (e) => alert((e as any).response.data.message),
  });

const useUpdateWithoutImage = (storeId: string) =>
  useMutation({
    mutationFn: updateMenuWithoutImage,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: menuKeys.menu(storeId, variables.menuId),
      });
    },
  });

const useUpdateWithImage = (storeId: string) =>
  useMutation({
    mutationFn: updateMenuWithImage,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: menuKeys.menu(storeId, variables.menuId),
      });
    },
  });

const useDeleteMenu = (storeId: string) =>
  useMutation({
    mutationFn: deleteMenu,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: menuKeys.all(storeId),
      });
    },
  });

const useMultiDelete = (storeId: string) =>
  useMutation({
    mutationFn: deleteMultipleMenus,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: menuKeys.all(storeId),
      });
    },
  });

const useMove = () =>
  useOptimisticReorderMutation(moveMenus, (_storeId) => menuKeys.all(_storeId));

export const menuQueries = {
  useAddMenu,
  useDeleteMenu,
  useMenuDetail,
  useMenuList,
  useMove,
  useMultiDelete,
  useOptimisticReorderMutation,
  useUpdateWithImage,
  useUpdateWithoutImage,
};
