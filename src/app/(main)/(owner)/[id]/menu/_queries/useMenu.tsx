/* eslint-disable react-hooks/rules-of-hooks */
import getQueryClient from "@/app/get-query-client";
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
import { useMutation, useQuery } from "@tanstack/react-query";
import { menuKeys } from "./keys";

export default function useMenu(storeId: string) {
  const queryClient = getQueryClient();

  const query = (categoryId: string) =>
    useQuery({
      queryKey: menuKeys.category(storeId, categoryId),
      queryFn: () => getMenuList({ storeId, categoryId }),
      enabled: !!categoryId,
    });

  const detailQuery = (categoryId: string, menuId: string, enabled?: boolean) =>
    useQuery({
      queryKey: menuKeys.menuInCategory(storeId, categoryId, menuId),
      queryFn: () => getMenuDetail({ storeId, categoryId, menuId }),
      enabled,
    });

  // TODO: API 연결하기
  const add = useMutation({
    mutationFn: postMenu,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: menuKeys.category(storeId, variables.categoryId),
      });
    },
  });

  // TODO: API 연결하기
  const update = useMutation({
    mutationFn: updateMenuWithoutImage,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: menuKeys.menu(storeId, variables.menuId),
      });
    },
  });

  const updateWithImg = useMutation({
    mutationFn: updateMenuWithImage,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: menuKeys.menu(storeId, variables.menuId),
      });
    },
  });

  const remove = useMutation({
    mutationFn: deleteMenu,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: menuKeys.all(storeId),
      });
    },
  });

  const multiRemove = useMutation({
    mutationFn: deleteMultipleMenus,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: menuKeys.all(storeId),
      });
    },
  });

  const move = useMutation({
    mutationFn: moveMenus,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: menuKeys.all(storeId),
      });
    },
  });

  return {
    query,
    detailQuery,
    add,
    update,
    updateWithImg,
    remove,
    multiRemove,
    move,
  };
}
