import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import getQueryClient from "@/app/get-query-client";
import {
  completeStaffCall,
  getStaffCalls,
  getHallWaitingsList,
  serveMenu,
  serveOrder,
} from "../_api/hall.api";

const queryClient = getQueryClient();

const useHallWaitingList = () =>
  useQuery({
    queryKey: ["hall-waitings-list"],
    queryFn: getHallWaitingsList,
    placeholderData: keepPreviousData,
    retry: false,
  });

const useStaffCallList = () =>
  useQuery({
    queryKey: ["staff-calls"],
    queryFn: getStaffCalls,
    placeholderData: keepPreviousData,
    retry: false,
  });

const useServeOrder = () =>
  useMutation({
    mutationFn: serveOrder,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["order-list"] }),
  });

const useServeMenu = () =>
  useMutation({
    mutationFn: serveMenu,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["order-list"] }),
  });

const useComompleteStaffCall = () =>
  useMutation({
    mutationFn: completeStaffCall,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["waitings-list"] });
    },
  });

export const hallQueries = {
  useStaffCallList,
  useHallWaitingList,
  useServeOrder,
  useServeMenu,
  useComompleteStaffCall,
};
