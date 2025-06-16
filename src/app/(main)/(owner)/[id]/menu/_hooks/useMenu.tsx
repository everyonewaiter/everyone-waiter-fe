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
} from "@/lib/api/menu.api";
import { useMutation, useQuery } from "@tanstack/react-query";
import menuKeys from "./queryKeys";

export default function useMenu(storeId: string) {
  const queryClient = getQueryClient();

  const menuListQuery = (categoryId: string) =>
    useQuery({
      queryKey: menuKeys.category(storeId, categoryId),
      queryFn: () => getMenuList({ storeId, categoryId }),
      enabled: !!categoryId,
    });

  const menuDetailQuery = (categoryId: string, menuId: string) =>
    useQuery({
      queryKey: menuKeys.menuInCategory(storeId, categoryId, menuId),
      queryFn: () => getMenuDetail({ storeId, categoryId, menuId }),
    });

  const { mutate: add } = useMutation({
    mutationFn: postMenu,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: menuKeys.category(storeId, variables.categoryId),
      });
    },
  });

  const { mutate: update } = useMutation({
    mutationFn: updateMenuWithoutImage,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: menuKeys.menu(storeId, variables.menuId),
      });
    },
  });

  const { mutate: updateWithImg } = useMutation({
    mutationFn: updateMenuWithImage,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: menuKeys.menu(storeId, variables.menuId),
      });
    },
  });

  const { mutate: remove } = useMutation({
    mutationFn: deleteMenu,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: menuKeys.menuInCategory(
          storeId,
          variables.categoryId,
          variables.menuId
        ),
      });
    },
  });

  const { mutate: multiRemove } = useMutation({
    mutationFn: deleteMultipleMenus,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: menuKeys.all(storeId),
      });
    },
  });

  const { mutate: move } = useMutation({
    mutationFn: moveMenus,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: menuKeys.all(storeId),
      });
    },
  });

  return {
    menuListQuery,
    menuDetailQuery,
    add,
    update,
    updateWithImg,
    remove,
    multiRemove,
    move,
  };
}
