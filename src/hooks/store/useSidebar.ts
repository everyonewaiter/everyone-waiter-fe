/* eslint-disable import/prefer-default-export */
import { create } from "zustand";
import { ComponentType, SVGProps } from "react";

interface MENU {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  text: string;
}

interface StoreState {
  menu: MENU[] | null;
  activeMenu: string;
  setMenu: (value: MENU[]) => void;
  setActiveMenu: (value: string) => void;
}

export const useSidebar = create<StoreState>((set) => ({
  menu: null,
  activeMenu: "",

  setMenu: (menu) =>
    set(() => ({
      menu,
      activeMenu: menu[0]?.text ?? "",
    })),

  setActiveMenu: (value) => set({ activeMenu: value }),
}));
