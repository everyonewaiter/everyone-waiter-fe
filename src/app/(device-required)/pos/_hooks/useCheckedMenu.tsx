import { create } from "zustand";

interface State {
  checkedMenu: { menuId: string; key: string };
  changeCheckedMenu: (menuId: string, key: string) => void;
  resetCheckedMenu: () => void;
}

const useCheckedMenuStore = create<State>((set) => ({
  checkedMenu: { menuId: "", key: "" },
  changeCheckedMenu: (menuId, key) => {
    set(() => ({ checkedMenu: { menuId, key } }));
  },
  resetCheckedMenu: () => {
    set({ checkedMenu: { menuId: "", key: "" } });
  },
}));

export default useCheckedMenuStore;
