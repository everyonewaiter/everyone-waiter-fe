import { useMutation, useQuery } from "@tanstack/react-query";
import getQueryClient from "@/app/get-query-client";
import {
  closeStore,
  getPosMenuList,
  getStoreStatus,
  getTableActivity,
  getTables,
  moveTables,
  openStore,
  resendReceiptKitchen,
} from "../_api/pos.api";

export default function usePos() {
  const queryClient = getQueryClient();

  const open = useMutation({
    mutationFn: openStore,
  });

  const close = useMutation({
    mutationFn: closeStore,
  });

  const storeStatus = useQuery({
    queryKey: ["store-status"],
    queryFn: getStoreStatus,
  });

  const menuList = (storeId: string, menuId?: string) =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useQuery({
      queryKey: ["pos-menu-list"],
      queryFn: () => getPosMenuList(storeId),
      enabled: menuId ? !!storeId && !!menuId : !!storeId,
    });

  const tableList = (enabled: boolean) =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useQuery({
      queryKey: ["table-list"],
      queryFn: getTables,
      enabled,
    });

  const activity = (tableNo: number) =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useQuery({
      queryKey: ["table", tableNo],
      queryFn: () => getTableActivity({ tableNo }),
      enabled: !!tableNo,
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

  return {
    store: { open, close },
    menuList,
    tableList,
    activity,
    storeStatus,
    move,
    resendReceipt,
  };
}
