import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getStaffCalls } from "../_api/hall.api";

export const useStaffCall = (enabled?: boolean) => {
  const { data, isSuccess, ...rest } = useQuery({
    queryKey: ["staff-calls"],
    queryFn: getStaffCalls,
    placeholderData: keepPreviousData,
    retry: false,
    enabled,
  });

  const currentCount = data?.staffCalls?.length ?? 0;

  return { data, count: currentCount, isSuccess, ...rest };
};
