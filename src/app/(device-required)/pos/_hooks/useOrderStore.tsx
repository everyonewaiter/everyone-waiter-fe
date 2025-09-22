import { create } from "zustand";
import getOrderKey from "../_utils/get-order-key";

interface State {
  orders: CustomOrder[];
  addOrders: (value: CustomOrder) => void;
  deleteOrders: (value: CustomOrder) => void;
  resetOrders: () => void;
  updateQuantity: (menuId: string, key: string, type: "add" | "sub") => void;
}

export const useOrderStore = create<State>((set) => ({
  orders: [],
  addOrders: (order) => set((state) => ({ orders: [...state.orders, order] })),
  deleteOrders: (order) =>
    set((state) => ({
      orders: state.orders.filter((el) => el.menuId !== order.menuId),
    })),
  resetOrders: () => set({ orders: [] }),
  updateQuantity: (menuId, key, type) =>
    set((state) => ({
      orders: state.orders
        .map((order) => {
          if (order.menuId !== menuId || getOrderKey(order) !== key)
            return order;

          const newQuantity =
            type === "add"
              ? order.quantity + 1
              : Math.max(0, order.quantity - 1);

          if (newQuantity === 0) return null;

          const unitPrice = order.totalPrice / order.quantity;

          return {
            ...order,
            quantity: newQuantity,
            totalPrice: unitPrice * newQuantity,
          };
        })
        .filter((order): order is CustomOrder => order !== null),
    })),
}));
