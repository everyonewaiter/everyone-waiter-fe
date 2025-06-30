import { create } from "zustand";

interface State {
  selectedMenu: TableOrderMenu | null;
  setSelectedMenu: (value: TableOrderMenu | null) => void;
  selectedOrder: TableOrder | null;
  setSelectedOrder: (value: TableOrder | null) => void;
}

export const useSelectItemStore = create<State>((set) => ({
  selectedMenu: null,
  setSelectedMenu: (value) => set({ selectedMenu: value }),
  selectedOrder: null,
  setSelectedOrder: (value) => set({ selectedOrder: value }),
}));
