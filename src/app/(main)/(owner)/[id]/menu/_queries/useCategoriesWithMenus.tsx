import { useQueries } from "@tanstack/react-query";
import { categoryQueries } from "./useCategories";
import { menuKeys } from "./keys";
import { getMenuList } from "../_api/menu.api";

export const useCategoriesWithMenus = (storeId: string) => {
  const categories = categoryQueries.useCategories(storeId);
  const menuQueries = useQueries({
    queries:
      categories.data?.categories?.map((category: Category) => ({
        queryKey: menuKeys.category(storeId, category.categoryId),
        queryFn: () =>
          getMenuList({ storeId, categoryId: category.categoryId }),
        enabled:
          !!storeId && !!category.categoryId && category.categoryId !== "전체",
      })) || [],
  });

  const categoriesLoading = categories.isLoading;
  const categoriesError = categories.error;
  const menusLoading = menuQueries.some((query) => query.isLoading);
  const menusError = menuQueries.find((query) => query.error)?.error;

  const categoriesWithMenus: {
    menus: Menu[];
  } = {
    menus: menuQueries.flatMap((query) => query?.data?.menus || []),
  };

  return {
    data: categoriesWithMenus,
    isLoading: categoriesLoading || menusLoading,
    error: categoriesError || menusError,
    categories,
    menus: menuQueries,
  };
};
