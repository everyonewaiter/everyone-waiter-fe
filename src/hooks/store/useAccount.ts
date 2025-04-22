/* eslint-disable import/prefer-default-export */
import { create } from "zustand";

interface Item {
  accountId: string;
  email: string;
  permission: TPermission | null;
}

interface StoreState extends Item {
  isLoggedIn: boolean;
  setProfile: (value: Item) => void;
  setIsLoggedIn: (value: boolean) => void;
  setPermission: (permission: TPermission | null) => void;
}

export const useAccount = create<StoreState>()((set) => ({
  accountId: "",
  email: "",
  permission: null,
  isLoggedIn: false,

  setProfile: (value) => set({ ...value }),
  setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
  setPermission: (permission) => set({ permission }),
}));
