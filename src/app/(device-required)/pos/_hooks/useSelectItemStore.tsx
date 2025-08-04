import { create } from "zustand";

interface State {
  selectedMenu: (TableOrderMenu & { orderId: string }) | null;
  setSelectedMenu: (
    value: (TableOrderMenu & { orderId: string }) | null
  ) => void;
  updatedMenus: { menuId: string | null; quantity: number | null };
  updateSelectedMenu: (menuId: string, quantity: number) => void;
  selectedOrder: TableOrder | null;
  setSelectedOrder: (value: TableOrder | null) => void;
}

export const useSelectItemStore = create<State>((set) => ({
  selectedMenu: null,
  setSelectedMenu: (value) => set({ selectedMenu: value }),
  updatedMenus: { menuId: null, quantity: null },
  updateSelectedMenu: (menuId, quantity) =>
    set({ updatedMenus: { menuId, quantity } }),
  selectedOrder: null,
  setSelectedOrder: (value) => set({ selectedOrder: value }),
}));
