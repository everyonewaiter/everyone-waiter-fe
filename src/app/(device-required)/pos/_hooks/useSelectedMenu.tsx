import { create } from "zustand";

interface State {
  selectedMenus: { id: string }[];
  setSelectedMenus: (value: { id: string }[]) => void;
  addSelectedMenus: (id: string) => void;
  deleteSelectedMenus: (id: string) => void;
}

const useSelectedMenuStore = create<State>((set) => ({
  selectedMenus: [],
  setSelectedMenus: (value) => set({ selectedMenus: value }),
  addSelectedMenus: (id) => {
    set((state) => ({ selectedMenus: [...state.selectedMenus, { id }] }));
  },
  deleteSelectedMenus: (id) => {
    set((state) => ({
      selectedMenus: state.selectedMenus.filter((el) => el.id !== id),
    }));
  },
}));

export default useSelectedMenuStore;
