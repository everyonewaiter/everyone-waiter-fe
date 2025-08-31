/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQuery, useSuspenseQuery } from "@tanstack/react-query";
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
import { notFound, redirect } from "next/navigation";
import { UseFormReturn } from "react-hook-form";
import { menuKeys } from "./keys";
import { TypeMenuForm } from "../_schema/menu.schema";

const queryClient = getQueryClient();

const useMenuList = (storeId: string, categoryId: string) =>
  useSuspenseQuery({
    queryKey: menuKeys.category(storeId, categoryId),
    queryFn: () => getMenuList({ storeId, categoryId }),
    staleTime: 1000 * 60 * 5,
  });

const useMenuDetail = (storeId: string, categoryId: string, menuId: string) =>
  useQuery({
    queryKey: menuKeys.menuInCategory(storeId, categoryId, menuId),
    queryFn: () => getMenuDetail({ storeId, categoryId, menuId }),
    enabled: !!categoryId && !!menuId && !!storeId,
    staleTime: 1000 * 60 * 5,
  });

const useAddMenu = (storeId: string, form: UseFormReturn<TypeMenuForm>) =>
  useMutation({
    mutationFn: postMenu,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: menuKeys.category(storeId, variables.categoryId),
      });
    },
    onError: (e) => {
      const code = (e as any)?.response?.data?.code;
      const status = (e as any)?.response?.status;

      if (status === 400) {
        if (code === "EXCEED_MAXIMUM_MENU_COUNT") {
          // eslint-disable-next-line no-alert
          alert("카테고리당 메뉴 생성 개수를 초과했습니다. (50개)");
          form.setFocus("category");
        } else if (code === "INVALID_DISCOUNT_OPTION_PRICE") {
          // eslint-disable-next-line no-alert
          alert("할인 옵션 가격은 메뉴 가격보다 높을 수 없습니다.");
        }
      } else if (status === 404) {
        if (code === "CATEGORY_NOT_FOUND") {
          form.setError("category", {
            message: "카테고리를 찾을 수 없습니다.",
          });
        } else if (code === "STORE_NOT_FOUND") {
          // eslint-disable-next-line no-alert
          alert("매장을 찾을 수 없습니다.");
          notFound();
        }
      } else {
        // eslint-disable-next-line no-alert
        alert("문제가 발생했습니다.");
      }
    },
  });

const useUpdateWithoutImage = (storeId: string, categoryId: string) =>
  useMutation({
    mutationFn: updateMenuWithoutImage,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: menuKeys.category(storeId, categoryId),
      });
      queryClient.invalidateQueries({
        queryKey: menuKeys.menuInCategory(
          storeId,
          categoryId,
          variables.menuId
        ),
      });
      queryClient.invalidateQueries({
        predicate: (query) =>
          Array.isArray(query.queryKey) &&
          query.queryKey[0] === "menus" &&
          query.queryKey[1] === storeId &&
          query.queryKey.includes(variables.menuId),
      });
    },
    onError: (e) => {
      const code = (e as any)?.response?.data?.code;
      const status = (e as any)?.response?.status;

      if (status === 400) {
        if (code === "INVALID_DISCOUNT_OPTION_PRICE") {
          // eslint-disable-next-line no-alert
          alert("할인 옵션 가격은 메뉴 가격보다 높을 수 없습니다.");
        }
      } else if (status === 404) {
        if (code === "STORE_NOT_FOUND") {
          // eslint-disable-next-line no-alert
          alert("매장을 찾을 수 없습니다.");
          notFound();
        } else if (code === "MENU_NOT_FOUND") {
          // eslint-disable-next-line no-alert
          alert("메뉴를 찾을 수 없습니다.");
          redirect(`/${storeId}/menu`);
        }
      } else {
        // eslint-disable-next-line no-alert
        alert("문제가 발생했습니다.");
      }
    },
  });

const useUpdateWithImage = (storeId: string, categoryId: string) =>
  useMutation({
    mutationFn: updateMenuWithImage,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: menuKeys.category(storeId, categoryId),
      });
      queryClient.invalidateQueries({
        predicate: (query) =>
          Array.isArray(query.queryKey) &&
          query.queryKey[0] === "menus" &&
          query.queryKey[1] === storeId &&
          query.queryKey.includes(variables.menuId),
      });
    },
    onError: (e) => {
      const code = (e as any)?.response?.data?.code;
      const status = (e as any)?.response?.status;

      if (status === 400) {
        if (code === "INVALID_DISCOUNT_OPTION_PRICE") {
          // eslint-disable-next-line no-alert
          alert("할인 옵션 가격은 메뉴 가격보다 높을 수 없습니다.");
        }
      } else if (status === 404) {
        if (code === "STORE_NOT_FOUND") {
          // eslint-disable-next-line no-alert
          alert("매장을 찾을 수 없습니다.");
          notFound();
        } else if (code === "MENU_NOT_FOUND") {
          // eslint-disable-next-line no-alert
          alert("메뉴를 찾을 수 없습니다.");
          redirect(`/${storeId}/menu`);
        }
      } else {
        // eslint-disable-next-line no-alert
        alert("문제가 발생했습니다.");
      }
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
    onError: (e) => {
      const code = (e as any)?.response?.data?.code;
      const status = (e as any)?.response?.status;

      if (status === 404) {
        if (code === "STORE_NOT_FOUND") {
          // eslint-disable-next-line no-alert
          alert("매장을 찾을 수 없습니다.");
          notFound();
        } else if (code === "MENU_NOT_FOUND") {
          // eslint-disable-next-line no-alert
          alert("메뉴를 찾을 수 없습니다.");
          redirect(`/${storeId}/menu`);
        }
      } else {
        // eslint-disable-next-line no-alert
        alert("문제가 발생했습니다.");
      }
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
    onError: (e) => {
      const code = (e as any)?.response?.data?.code;
      const status = (e as any)?.response?.status;

      if (status === 404) {
        if (code === "STORE_NOT_FOUND") {
          // eslint-disable-next-line no-alert
          alert("매장을 찾을 수 없습니다.");
          notFound();
        } else if (code === "MENU_NOT_FOUND") {
          // eslint-disable-next-line no-alert
          alert("메뉴를 찾을 수 없습니다.");
          redirect(`/${storeId}/menu`);
        }
      } else {
        // eslint-disable-next-line no-alert
        alert("문제가 발생했습니다.");
      }
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
