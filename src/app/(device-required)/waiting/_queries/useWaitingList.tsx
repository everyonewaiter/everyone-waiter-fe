import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useRef } from "react";
import { playNotificationSound } from "@/utils/audioNotification";
import { waitingKeys } from "./keys";
import { waitingList } from "../_api/waiting.api";

export const useWaitingList = (enabled?: boolean) => {
  const prevCountRef = useRef<number>(-1);

  const { data, isSuccess, ...rest } = useQuery({
    queryKey: waitingKeys.all(),
    queryFn: waitingList,
    enabled,
    placeholderData: keepPreviousData,
    retry: false,
  });

  const currentCount = data?.waitings?.length ?? 0;

  const playSound = useCallback(async () => {
    await playNotificationSound();
  }, []);

  useEffect(() => {
    const hasNewOrder = currentCount > prevCountRef.current;
    const hasOrderCountDecrease = currentCount < prevCountRef.current;

    const isNotInitialLoad = prevCountRef.current >= 0;

    const shouldPlay =
      isSuccess && isNotInitialLoad && hasNewOrder && !hasOrderCountDecrease;

    if (shouldPlay) {
      playSound();
    }

    prevCountRef.current = currentCount;
  }, [isSuccess, currentCount, playSound]);

  return { data, count: data?.waitings?.length ?? 0, isSuccess, ...rest };
};
