import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { orderList } from "../_api/hall.api";

export const useOrderList = (enabled?: boolean) => {
  const { data, isSuccess, ...rest } = useQuery({
    queryKey: ["order-list"],
    queryFn: orderList,
    enabled,
    placeholderData: keepPreviousData,
    retry: false,
  });

  const currentCount = data?.unserved.length ?? 0;

  return { data, count: currentCount, isSuccess, ...rest };
};
