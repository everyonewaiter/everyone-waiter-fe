import { useMutation, useQuery } from "@tanstack/react-query";
import getQueryClient from "@/app/get-query-client";
import {
  closeStore,
  getDetailActivity,
  getPosMenuList,
  getStoreInfo,
  getTableActivity,
  getTables,
  moveTables,
  openStore,
  resendReceiptKitchen,
  updateMenus,
} from "../_api/pos.api";
import { posKeys } from "./keys";

const queryClient = getQueryClient();

const useOpenStore = () =>
  useMutation({
    mutationFn: openStore,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: posKeys.stores });
    },
  });

const useCloseStore = () =>
  useMutation({
    mutationFn: closeStore,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: posKeys.stores });
    },
  });

const useStoreInfo = (storeId: string) =>
  useQuery({
    queryKey: posKeys.stores,
    queryFn: () => getStoreInfo({ storeId }),
    enabled: !!storeId,
    staleTime: 1000 * 60 * 5,
  });

const useMenuList = (storeId: string, menuId?: string) =>
  useQuery({
    queryKey: posKeys.menus,
    queryFn: () => getPosMenuList(storeId),
    enabled: menuId ? !!storeId && !!menuId : !!storeId,
    staleTime: 1000 * 60 * 5,
  });

const useTableList = (enabled: boolean) =>
  useQuery({
    queryKey: posKeys.tables,
    queryFn: getTables,
    enabled,
    staleTime: 1000 * 60 * 5,
  });

const useActivity = (tableNo: number) =>
  useQuery({
    queryKey: posKeys.activity(tableNo),
    queryFn: () => getTableActivity({ tableNo }),
    enabled: !!tableNo,
    staleTime: 1000 * 60 * 5,
  });

const useActivityById = (posTableActivityId: string) =>
  useQuery({
    queryKey: posKeys.activityById(posTableActivityId),
    queryFn: () => getDetailActivity({ posTableActivityId }),
    enabled: !!posTableActivityId,
    staleTime: 1000 * 60 * 5,
  });

const useMoveTable = () =>
  useMutation({
    mutationFn: moveTables,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: posKeys.tables });
    },
  });

const useResendReceipt = () =>
  useMutation({
    mutationFn: resendReceiptKitchen,
  });

const useUpdateOrder = () =>
  useMutation({
    mutationFn: updateMenus,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: posKeys.activity(variables.tableNo),
      });
    },
  });

export const posQueries = {
  useOpenStore,
  useCloseStore,
  useActivity,
  useActivityById,
  useMenuList,
  useMoveTable,
  useResendReceipt,
  useStoreInfo,
  useTableList,
  useUpdateOrder,
};
