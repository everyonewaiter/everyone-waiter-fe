import { useMutation } from "@tanstack/react-query";
import getQueryClient from "@/app/get-query-client";
import {
  callStaff,
  cancelOrder,
  completeOrder,
  discountOrder,
  orderMenus,
} from "../_api/order.api";

export default function useOrder() {
  const queryClient = getQueryClient();

  const order = useMutation({
    mutationFn: orderMenus,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["table", variables.tableNo] });
    },
  });

  const cancel = useMutation({
    mutationFn: cancelOrder,
  });

  const addDiscount = useMutation({
    mutationFn: discountOrder,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["table", variables.tableNo] });
    },
  });

  const complete = useMutation({
    mutationFn: completeOrder,
  });

  const staffCalling = useMutation({
    mutationFn: callStaff,
  });

  return { order, cancel, addDiscount, complete, staffCalling };
}
