import { instance } from "../axios/instance";
import API_PATH from "./paths";

type PropsWithStoreId<T extends object = {}> = T & { storeId: string };

// 카테고리

export const getCategories = async ({
  storeId,
}: PropsWithStoreId): Promise<{ categories: Category[] }> => {
  const response = await instance.get(
    `${API_PATH.stores}/${storeId}/categories`
  );
  return response.data;
};

export const makeCategory = async ({
  storeId,
  categoryName,
}: PropsWithStoreId<{ categoryName: string }>) => {
  const response = await instance.post(
    `${API_PATH.stores}/${storeId}/categories`,
    { name: categoryName }
  );
  return response.data;
};

export const moveCategory = async ({
  storeId,
  sourceId,
  targetId,
  where,
}: PropsWithStoreId<{ sourceId: string; targetId: string; where: string }>) => {
  const response = await instance.post(
    `${API_PATH.stores}/${storeId}/categories/${sourceId}/move/${targetId}`,
    {
      where,
    }
  );
  return response.data;
};

export const updateCategory = async ({
  storeId,
  categoryId,
  categoryName,
}: PropsWithStoreId<{
  categoryId: string;
  categoryName: string;
}>) => {
  const response = await instance.put(
    `${API_PATH.stores}/${storeId}/categories/${categoryId}`,
    {
      name: categoryName,
    }
  );
  return response.data;
};

export const deleteCategory = async ({
  storeId,
  categoryId,
}: PropsWithStoreId<{
  categoryId: string;
}>) => {
  const response = await instance.delete(
    `${API_PATH.stores}/${storeId}/categories/${categoryId}`
  );
  return response.data;
};

// 메뉴
export const getMenuList = async ({
  storeId,
  categoryId,
}: PropsWithStoreId<{ categoryId: string }>): Promise<{ menus: Menu[] }> => {
  const response = await instance.get(
    `${API_PATH.stores}/${storeId}/categories/${categoryId}/menus`
  );
  return response.data;
};

export const getMenuDetail = async ({
  storeId,
  categoryId,
  menuId,
}: PropsWithStoreId<{
  categoryId: string;
  menuId: string;
}>): Promise<MenuDetail> => {
  const response = await instance.get(
    `${API_PATH.stores}/${storeId}/categories/${categoryId}/menu/${menuId}`
  );
  return response.data;
};

export const postMenu = async ({
  body,
  storeId,
  categoryId,
}: PropsWithStoreId<{
  categoryId: string;
  body: {
    file: string;
    request: Omit<Menu, "menuId" | "categoryId" | "image"> & {
      printEnabled: boolean;
      menuOptionGroups: Omit<MenuOptionGroups, "menuOptionGroupId">[];
    };
  };
}>) => {
  const formData = new FormData();
  formData.append("file", body.file);
  formData.append("request", JSON.stringify(body.request));

  const response = await instance.post(
    `${API_PATH.stores}/${storeId}/categories/${categoryId}/menus`,
    formData
  );
  return response.data;
};

export const updateMenuWithoutImage = async ({
  storeId,
  menuId,
  body,
}: PropsWithStoreId<{
  menuId: string;
  body: Omit<Menu, "menuId" | "categoryId" | "image"> & {
    printEnabled: boolean;
    menuOptionGroups: Omit<MenuOptionGroups, "menuOptionGroupId">[];
  };
}>) => {
  const response = await instance.put(
    `${API_PATH.stores}/${storeId}/menus/${menuId}`,
    body
  );
  return response.data;
};

export const updateMenuWithImage = async ({
  storeId,
  menuId,
  body,
}: PropsWithStoreId<{
  storeId: string;
  menuId: string;
  body: {
    file: string;
    request: Omit<Menu, "menuId" | "categoryId" | "image"> & {
      printEnabled: boolean;
      menuOptionGroups: Omit<MenuOptionGroups, "menuOptionGroupId">[];
    };
  };
}>) => {
  const response = await instance.put(
    `${API_PATH.stores}/${storeId}/menus/${menuId}/with-image`,
    body
  );
  return response.data;
};

export const deleteMenu = async ({
  storeId,
  categoryId,
  menuId,
}: PropsWithStoreId<{ categoryId: string; menuId: string }>) => {
  const response = await instance.delete(
    `${API_PATH.stores}/${storeId}/categories/${categoryId}/menus/${menuId}`
  );
  return response.data;
};

export const deleteMultipleMenus = async ({
  storeId,
  body,
}: PropsWithStoreId<{ body: { menuIds: string[] } }>) => {
  const response = await instance.post(
    `${API_PATH.stores}/${storeId}/menus/delete`,
    body
  );
  return response.data;
};

export const moveMenus = async ({
  storeId,
  sourceId,
  targetId,
  where,
}: PropsWithStoreId<{ sourceId: string; targetId: string; where: string }>) => {
  const response = await instance.post(
    `${API_PATH.stores}/${storeId}/menus/${sourceId}/move/${targetId}`,
    { where }
  );
  return response.data;
};
