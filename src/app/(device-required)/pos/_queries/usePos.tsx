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

export default function usePos() {
  const queryClient = getQueryClient();

  const open = useMutation({
    mutationFn: openStore,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stores"] });
    },
  });

  const close = useMutation({
    mutationFn: closeStore,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stores"] });
    },
  });

  const store = (storeId: string) =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useQuery({
      queryKey: ["stores"],
      queryFn: () => getStoreInfo({ storeId }),
      enabled: !!storeId,
      staleTime: 1000 * 60 * 5,
    });

  const menuList = (storeId: string, menuId?: string) =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useQuery({
      queryKey: ["pos-menu-list"],
      queryFn: () => getPosMenuList(storeId),
      enabled: menuId ? !!storeId && !!menuId : !!storeId,
      staleTime: 1000 * 60 * 5,
    });

  const tableList = (enabled: boolean) =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useQuery({
      queryKey: ["table-list"],
      queryFn: getTables,
      enabled,
      staleTime: 1000 * 60 * 5,
    });

  const activity = (tableNo: number) =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useQuery({
      queryKey: ["table", tableNo],
      queryFn: () => getTableActivity({ tableNo }),
      enabled: !!tableNo,
      staleTime: 1000 * 60 * 5,
    });

  const activityById = (posTableActivityId: string) =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useQuery({
      queryKey: ["activity", posTableActivityId],
      queryFn: () => getDetailActivity({ posTableActivityId }),
      enabled: !!posTableActivityId,
      staleTime: 1000 * 60 * 5,
    });

  const move = useMutation({
    mutationFn: moveTables,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["table-list"] });
    },
  });

  const resendReceipt = useMutation({
    mutationFn: resendReceiptKitchen,
  });

  const updateOrder = useMutation({
    mutationFn: updateMenus,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["table", variables.tableNo] });
    },
  });

  return {
    store: { open, close },
    menuList,
    tableList,
    activity,
    storeInfo: store,
    move,
    resendReceipt,
    updateOrder,
    activityById,
  };
}
