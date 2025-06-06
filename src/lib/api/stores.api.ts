import { TypeCategory } from "@/schema/store.schema";
import { formInstance, instance, signatureInstance } from "../axios/instance";
import API_PATH from "./paths";

export const registerStore = async (body: FormData) => {
  const response = await formInstance.post(
    `${API_PATH.stores}/registrations`,
    body
  );
  return response.data;
};

export const getRegisters = async (
  page: number = 1,
  size: number = 20
): Promise<ResWithPagination<StoreDetail[]>> => {
  const response = await instance.get(
    `${API_PATH.stores}/registrations?page=${page}&size=${size}`
  );
  return response.data;
};

export const registerDetails = async (registrationId: string) => {
  const response = await instance.get(
    `${API_PATH.stores}/registrations/${registrationId}`
  );
  return response.data;
};

export const reapplyRegistration = async ({
  registrationId,
  ...body
}: Omit<StoreForm, "file"> & { registrationId: string }) => {
  const response = await instance.put(
    `${API_PATH.stores}/registrations/${registrationId}`,
    body
  );
  return response.data;
};

export const reapplyRegistrationWithImage = async ({
  registrationId,
  ...body
}: {
  registrationId: string;
  body: FormData;
}) => {
  const response = await formInstance.put(
    `${API_PATH.stores}/registrations/${registrationId}/with-image`,
    body
  );
  return response.data;
};

// 매장 목록
export const getStoreList = async (): Promise<StoreList> => {
  const response = await instance.get(`${API_PATH.stores}`);
  return response.data;
};

// 매장 상세 정보
export const getStoreInfoDetail = async (
  storeId: string
): Promise<StoreInfoDetail> => {
  const response = await instance.get(`${API_PATH.stores}/${storeId}`);
  return response.data;
};

// 카테고리 목록
export const getStoreCategoryList = async (
  storeId: string
): Promise<CategoryList> => {
  const response = await instance.get(
    `${API_PATH.stores}/${storeId}/categories`
  );
  return response.data;
};

// 카테고리 생성
export const postCategory = async (storeId: string, data: TypeCategory) => {
  const response = await instance.post(
    `${API_PATH.stores}/${storeId}/categories`,
    data
  );
  return response.data;
};

// 카테고리 수정
export const putCategory = async (
  storeId: string,
  categoryId: string,
  data: TypeCategory
) => {
  const response = await instance.put(
    `${API_PATH.stores}/${storeId}/categories/${categoryId}`,
    data
  );
  return response.data;
};

// 카테고리별 메뉴 조회
export const getMenusByCategory = async (
  storeId: string,
  categoryId: string
): Promise<MenuList> => {
  const response = await instance.get(
    `${API_PATH.stores}/${storeId}/categories/${categoryId}/menus`
  );
  return response.data;
};

// 메뉴 전체 조회
export const getMenusWithCategory = async (
  storeId: string
): Promise<MenuListWithCategory> => {
  const response = await instance.get(`${API_PATH.stores}/${storeId}/menus`);
  return response.data;
};

// 스토어 오픈/클로즈
export const postStoreAction = async (type: "open" | "close") => {
  const response = await signatureInstance.post(`${API_PATH.stores}/${type}`);
  return response.data;
};
