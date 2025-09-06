import { useEffect } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useNotificationStore } from "../../_stores/useNotificationStore";
import { orderList } from "../_api/hall.api";

export const useOrderList = () => {
  const { data, isSuccess, ...rest } = useQuery({
    queryKey: ["order-list"],
    queryFn: orderList,
    placeholderData: keepPreviousData,
    retry: false,
  });

  const { setOrderCount } = useNotificationStore();

  useEffect(() => {
    if (isSuccess && data) {
      const lastVisit = localStorage.getItem("@lastHallVisit");
      const unreadCount = data.unserved.filter(
        (order) => !lastVisit || new Date(order.createdAt) > new Date(lastVisit)
      ).length;

      setOrderCount(unreadCount);
    }
  }, [isSuccess, data, setOrderCount]);

  return { data, isSuccess, ...rest };
};
