import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addWaiting,
  waitingAction,
  waitingList,
} from "@/app/(device-required)/waiting/_api/waiting.api";
import getQueryClient from "@/app/get-query-client";
import { waitingKeys } from "./keys";

const queryClient = getQueryClient();

export default function useWaiting(enabled = true) {
  const { data: list } = useQuery({
    queryKey: waitingKeys.all(),
    queryFn: waitingList,
    enabled,
  });

  const add = useMutation({
    mutationFn: addWaiting,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: waitingKeys.all() });
    },
  });

  const action = useMutation({
    mutationFn: waitingAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: waitingKeys.all() });
    },
  });

  return {
    list,
    add,
    action,
  };
}
