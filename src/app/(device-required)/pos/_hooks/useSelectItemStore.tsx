import { create } from "zustand";

type SelectedMenu = TableOrderMenu & { orderId: string };

interface State {
  // menu
  selectedMenu: SelectedMenu[];
  setSelectedMenu: (value: SelectedMenu[]) => void;
  addSelectedMenu: (value: SelectedMenu) => void;
  removeSelectedMenu: (orderMenuId: string) => void;
  hasSelectedMenu: (orderMenuId: string) => boolean;
  // order
  selectedOrder: TableOrder[];
  setSelectedOrder: (value: TableOrder[]) => void;
  addSelectedOrder: (value: TableOrder) => void;
  removeSelectedOrder: (value: string) => void;
  hasSelectedOrder: (value: string) => boolean;
}

export const useSelectItemStore = create<State>((set, get) => ({
  selectedMenu: [],
  setSelectedMenu: (value) => set({ selectedMenu: value }),
  removeSelectedMenu: (orderMenuId) =>
    set((state) => ({
      selectedMenu: state.selectedMenu.filter(
        (el) => el.orderMenuId !== orderMenuId
      ),
    })),
  addSelectedMenu: (menu) =>
    set((state) => ({ selectedMenu: [...state.selectedMenu, menu] })),
  hasSelectedMenu: (orderMenuId) =>
    get().selectedMenu.some((el) => el.orderMenuId === orderMenuId),

  selectedOrder: [],
  setSelectedOrder: (value) => set({ selectedOrder: value }),
  removeSelectedOrder: (orderId) =>
    set((state) => ({
      selectedOrder: state.selectedOrder.filter((el) => el.orderId !== orderId),
    })),
  addSelectedOrder: (order: TableOrder) =>
    set((state) => ({ selectedOrder: [...state.selectedOrder, order] })),
  hasSelectedOrder: (orderId: string) =>
    get().selectedOrder.some((el) => el.orderId === orderId),
}));
