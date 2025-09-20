import { useEffect, useRef, useCallback } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { playNotificationSound } from "@/utils/audioNotification";
import { getStaffCalls } from "../_api/hall.api";

export const useStaffCall = (enabled?: boolean) => {
  const prevCountRef = useRef<number>(-1);
  const prevTotalQuantityRef = useRef<number>(-1);

  const { data, isSuccess, ...rest } = useQuery({
    queryKey: ["staff-calls"],
    queryFn: getStaffCalls,
    placeholderData: keepPreviousData,
    retry: false,
    enabled,
  });

  const currentCount = data?.staffCalls?.length ?? 0;

  const playSound = useCallback(async () => {
    await playNotificationSound();
  }, []);

  useEffect(() => {
    const hasNewCalls = currentCount > prevCountRef.current;

    const isNotInitialLoad =
      prevCountRef.current >= 0 && prevTotalQuantityRef.current >= 0;

    const shouldPlay = isSuccess && isNotInitialLoad && hasNewCalls;

    if (shouldPlay) playSound();

    prevCountRef.current = currentCount;
  }, [isSuccess, currentCount, playSound]);

  return { data, count: currentCount, isSuccess, ...rest };
};
