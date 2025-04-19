/* eslint-disable import/prefer-default-export */
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";

interface StoreState {
  menu: Menu[] | null;
  activeMenu: string;
  setMenu: (value: Menu[]) => void;
  setActiveMenu: (value: string) => void;
}

export const useSidebar = create<StoreState>()(
  persist(
    immer((set) => ({
      menu: null,
      activeMenu: "",
      setMenu: (menu) => set(() => ({ menu })),
      setActiveMenu: (activeMenu) => set(() => ({ activeMenu })),
    })),
    {
      name: "@sidebar",
      partialize: (state) => ({
        menu: state.menu,
        activeMenu: state.activeMenu,
      }),
    }
  )
);
