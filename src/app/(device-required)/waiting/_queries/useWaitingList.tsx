import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { waitingKeys } from "./keys";
import { waitingList } from "../_api/waiting.api";

export const useWaitingList = (enabled?: boolean) => {
  const { data, isSuccess, ...rest } = useQuery({
    queryKey: waitingKeys.all(),
    queryFn: waitingList,
    enabled,
    placeholderData: keepPreviousData,
    retry: false,
  });

  return { data, count: data?.waitings?.length, isSuccess, ...rest };
};
