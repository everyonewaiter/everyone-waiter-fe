import { useMutation } from "@tanstack/react-query";
import getQueryClient from "@/app/get-query-client";
import axios, { AxiosError } from "axios";
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
    onError: (error) => {
      if (!axios.isAxiosError(error)) {
        // eslint-disable-next-line
        alert("알 수 없는 오류가 발생했습니다.");
        return;
      }

      const axErr = error as AxiosError<any>;
      const code = (axErr?.response?.data as any)?.code as string | undefined;

      if (code === "NOT_EMPTY_ORDER_MENU") {
        // eslint-disable-next-line
        alert("주문 메뉴가 비어있습니다.");
        return;
      }

      if (code === "INCLUDE_SOLD_OUT_MENU") {
        // eslint-disable-next-line
        alert("주문하신 메뉴 중 품절된 메뉴가 있습니다.");
        return;
      }

      if (code === "ORDER_MENU_QUANTITY_POSITIVE") {
        // eslint-disable-next-line
        alert("메뉴의 수량은 1개 이상이어야 합니다.");
        return;
      }

      if (code === "STORE_IS_CLOSED") {
        // eslint-disable-next-line
        alert("매장이 영업중이 아니에요.");
        return;
      }

      // eslint-disable-next-line
      alert("알 수 없는 오류가 발생했습니다.");
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
