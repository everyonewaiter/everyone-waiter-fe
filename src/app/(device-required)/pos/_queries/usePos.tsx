import { useMutation, useQuery } from "@tanstack/react-query";
import getQueryClient from "@/app/get-query-client";
import axios, { AxiosError } from "axios";
import { isNumber } from "@/utils/validate";
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
    onError: (error) => {
      if (!axios.isAxiosError(error)) {
        // eslint-disable-next-line
        alert("알 수 없는 오류가 발생했습니다.");
        return;
      }

      const axErr = error as AxiosError<any>;
      const code = (axErr?.response?.data as any)?.code as string | undefined;

      if (code === "ALREADY_STORE_OPENED") {
        // eslint-disable-next-line
        alert("이미 영업중인 매장입니다.");
      }
    },
  });

const useCloseStore = () =>
  useMutation({
    mutationFn: closeStore,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: posKeys.stores });
    },
    onError: (error) => {
      if (!axios.isAxiosError(error)) {
        // eslint-disable-next-line
        alert("알 수 없는 오류가 발생했습니다.");
        return;
      }

      const axErr = error as AxiosError<any>;
      const code = (axErr?.response?.data as any)?.code as string | undefined;

      if (code === "INCOMPLETE_POS_TABLE_ACTIVITY") {
        // eslint-disable-next-line
        alert("완료되지 않은 주문이 있습니다. 주문을 완료해주세요.");
        return;
      }

      if (code === "INCOMPLETE_WAITING") {
        // eslint-disable-next-line
        alert("대기 중인 웨이팅이 있습니다. 웨이팅을 완료해주세요.");
        return;
      }

      if (code === "ALREADY_STORE_OPENED") {
        // eslint-disable-next-line
        alert("이미 마감된 매장입니다.");
      }
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
    enabled: !!tableNo && isNumber(tableNo),
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
