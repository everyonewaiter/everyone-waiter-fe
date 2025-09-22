import { create } from "zustand";

type State = {
  selectedIds: { menuId: string; categoryId: string }[];
};

type Actions = {
  isSelected: (menuId: string, categoryId: string) => boolean;
  addId: (menuId: string, categoryId: string) => void;
  deleteId: (menuId: string, categoryId: string) => void;
  reset: () => void;
  setSelected: (ids: { menuId: string; categoryId: string }[]) => void;
  hasId: (menuId: string) => boolean;
};

export const useMenuSelection = create<State & Actions>((set, get) => ({
  selectedIds: [],
  addId: (menuId, categoryId) =>
    set((state) => ({
      selectedIds: [...state.selectedIds, { menuId, categoryId }],
    })),
  deleteId: (menuId, categoryId) =>
    set((state) => ({
      selectedIds: state.selectedIds.filter(
        (el) => !(el.menuId === menuId && el.categoryId === categoryId)
      ),
    })),
  isSelected: (menuId, categoryId) =>
    get().selectedIds.some(
      (item) => item.menuId === menuId && item.categoryId === categoryId
    ),
  reset: () => set({ selectedIds: [] }),
  setSelected: (ids) => set({ selectedIds: ids }),
  hasId: (menuId) => get().selectedIds.some((item) => item.menuId === menuId),
}));
