import { useEffect, useRef, useCallback } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { playNotificationSound } from "@/utils/audioNotification";
import { orderList } from "../_api/hall.api";

export const useOrderList = (enabled?: boolean) => {
  const prevCountRef = useRef<number>(-1);
  const prevTotalQuantityRef = useRef<number>(-1);

  const { data, isSuccess, ...rest } = useQuery({
    queryKey: ["order-list"],
    queryFn: orderList,
    enabled,
    placeholderData: keepPreviousData,
    retry: false,
  });

  const currentCount = data?.unserved.length ?? 0;

  const currentTotalQuantity =
    data?.unserved.reduce(
      (total, order) =>
        total +
        (order.orderMenus?.reduce(
          (menuTotal, menu) => menuTotal + menu.quantity,
          0
        ) ?? 0),
      0
    ) ?? 0;

  const playSound = useCallback(async () => {
    await playNotificationSound();
  }, []);

  useEffect(() => {
    const hasNewOrder = currentCount > prevCountRef.current;
    const hasQuantityIncrease =
      currentTotalQuantity > prevTotalQuantityRef.current;
    const hasQuantityDecrease =
      currentTotalQuantity < prevTotalQuantityRef.current;
    const hasOrderCountDecrease = currentCount < prevCountRef.current;

    const isNotInitialLoad =
      prevCountRef.current >= 0 && prevTotalQuantityRef.current >= 0;

    const shouldPlay =
      isSuccess &&
      isNotInitialLoad &&
      (hasNewOrder || hasQuantityIncrease) &&
      !hasQuantityDecrease &&
      !hasOrderCountDecrease;

    if (shouldPlay) {
      playSound();
    }

    prevCountRef.current = currentCount;
    prevTotalQuantityRef.current = currentTotalQuantity;
  }, [isSuccess, currentCount, currentTotalQuantity, playSound]);

  return { data, count: currentCount, isSuccess, ...rest };
};
