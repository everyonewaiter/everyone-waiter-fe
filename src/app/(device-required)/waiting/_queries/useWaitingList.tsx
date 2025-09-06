"use client";

import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { waitingKeys } from "./keys";
import { waitingList } from "../_api/waiting.api";
import { useNotificationStore } from "../../_stores/useNotificationStore";

export const useWaitingList = (enabled?: boolean) => {
  const { data, isSuccess, ...rest } = useQuery({
    queryKey: waitingKeys.all(),
    queryFn: waitingList,
    enabled,
  });

  const { setWaitingCount } = useNotificationStore();

  useEffect(() => {
    if (isSuccess && data) {
      const lastVisit = localStorage.getItem("@lastWaitingVisit");
      const unreadCount = data.waitings.filter(
        (waiting) =>
          !lastVisit || new Date(waiting.createdAt) > new Date(lastVisit)
      ).length;

      setWaitingCount(unreadCount);
    }
  }, [isSuccess, data, setWaitingCount]);

  return { data, isSuccess, ...rest };
};
