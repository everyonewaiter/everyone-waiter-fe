import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import getQueryClient from "@/app/get-query-client";
import {
  completeStaffCall,
  getStaffCalls,
  getWaitingsList,
  orderList,
  serveMenu,
  serveOrder,
} from "../_api/hall.api";

const queryClient = getQueryClient();

const useWaitingList = () =>
  useQuery({
    queryKey: ["waitings-list"],
    queryFn: getWaitingsList,
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

const useOrderList = (served: boolean) =>
  useQuery({
    queryKey: ["order-list", served],
    queryFn: () => orderList(served),
    placeholderData: keepPreviousData,
    retry: false,
  });

const useServeOrder = () =>
  useMutation({
    mutationFn: serveOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["order-list"] });
    },
  });

const useServeMenu = () =>
  useMutation({
    mutationFn: serveMenu,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["order-list", true] });
      queryClient.invalidateQueries({ queryKey: ["order-list", false] });
    },
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
  useWaitingList,
  useServeOrder,
  useServeMenu,
  useComompleteStaffCall,
  useOrderList,
};
