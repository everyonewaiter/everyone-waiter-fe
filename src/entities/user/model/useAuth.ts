/* eslint-disable import/prefer-default-export */
import { create } from "zustand";

type Item = Omit<TProfile, "accountId"> & { accountId: string };

interface StoreState extends Item {
  isLoggedIn: boolean;
  setProfile: (value: Item) => void;
  setIsLoggedIn: (value: boolean) => void;
  setPermission: (permission: TPermission) => void;
}

export const useAuth = create<StoreState>()((set) => ({
  accountId: "",
  email: "",
  permission: "USER",
  isLoggedIn: false,

  setProfile: (value) => set({ ...value }),
  setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
  setPermission: (permission) => set({ permission }),
}));
