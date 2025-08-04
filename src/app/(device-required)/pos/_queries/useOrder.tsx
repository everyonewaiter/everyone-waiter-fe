import { useMutation } from "@tanstack/react-query";
import getQueryClient from "@/app/get-query-client";
import {
  callStaff,
  cancelOrder,
  completeOrder,
  discountOrder,
  orderMenus,
  updateMemo,
} from "../_api/order.api";
import { posKeys } from "./keys";

const queryClient = getQueryClient();

const useOrderMenu = () =>
  useMutation({
    mutationFn: orderMenus,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: posKeys.activity(variables.tableNo),
      });
    },
  });

const useCancelOrder = () =>
  useMutation({
    mutationFn: cancelOrder,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: posKeys.activity(variables.tableNo),
      });
    },
  });

const useAddDiscount = () =>
  useMutation({
    mutationFn: discountOrder,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: posKeys.activity(variables.tableNo),
      });
    },
  });

const useCompleteOrder = () =>
  useMutation({
    mutationFn: completeOrder,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: posKeys.activity(variables.tableNo),
      });
    },
  });

const useCallStaff = () =>
  useMutation({
    mutationFn: callStaff,
  });

const useUpdateMemo = () =>
  useMutation({
    mutationFn: updateMemo,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["table", variables.tableNo] });
    },
  });

export const orderQueries = {
  useAddDiscount,
  useCallStaff,
  useCancelOrder,
  useCompleteOrder,
  useOrderMenu,
  useUpdateMemo,
};
