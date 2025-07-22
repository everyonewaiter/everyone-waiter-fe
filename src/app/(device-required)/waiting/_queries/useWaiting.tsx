import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addWaiting,
  waitingAction,
  waitingList,
} from "@/app/(device-required)/waiting/_api/waiting.api";
import getQueryClient from "@/app/get-query-client";
import { waitingKeys } from "./keys";

const queryClient = getQueryClient();

const useWaitingList = (enabled: boolean) =>
  useQuery({
    queryKey: waitingKeys.all(),
    queryFn: waitingList,
    enabled,
  });

const useAddWaiting = () =>
  useMutation({
    mutationFn: addWaiting,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: waitingKeys.all() });
    },
  });

const useControlWaiting = () =>
  useMutation({
    mutationFn: waitingAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: waitingKeys.all() });
    },
  });

export const waitingQueries = {
  useWaitingList,
  useAddWaiting,
  useControlWaiting,
};
