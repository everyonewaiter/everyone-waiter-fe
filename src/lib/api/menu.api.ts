import { instance } from "../axios/instance";
import API_PATH from "./paths";

type PropsWithStoreId<T extends object = {}> = T & { storeId: string };

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
