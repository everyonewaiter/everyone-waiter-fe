import { useMutation, useQuery } from "@tanstack/react-query";
import {
  closeStore,
  getPosMenuList,
  getStoreStatus,
  getTableActivity,
  getTables,
  openStore,
} from "../_api/pos.api";

export default function usePos() {
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

  const list = (enabled: boolean) =>
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

  return {
    store: { open, close },
    menuList,
    list,
    activity,
    storeStatus,
  };
}
