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

  const add = useMutation({
    mutationFn: postMenu,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: menuKeys.category(storeId, variables.categoryId),
      });
    },
    // eslint-disable-next-line no-alert
    onError: (e) => alert((e as any).response.data.message),
  });

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

  const move = useOptimisticReorderMutation(moveMenus, (_storeId) =>
    menuKeys.all(_storeId)
  );

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
