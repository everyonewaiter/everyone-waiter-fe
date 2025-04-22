/* eslint-disable import/prefer-default-export */
import { create } from "zustand";

type Item = Omit<TProfile, "accountId"> & { accountId: string };

interface StoreState extends Item {
  isLoggedIn: boolean;
  hasAcceptedStore: boolean;

  setProfile: (value: Item) => void;
  setIsLoggedIn: (value: boolean) => void;
  setPermission: (permission: TPermission) => void;
  setHasAcceptedStore: (value: boolean) => void;
}

export const useAccount = create<StoreState>()((set) => ({
  accountId: "",
  email: "",
  permission: "USER",
  isLoggedIn: false,
  hasAcceptedStore: false,

  setProfile: (value) => set({ ...value }),
  setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
  setPermission: (permission) => set({ permission }),
  setHasAcceptedStore: (hasAcceptedStore) => set({ hasAcceptedStore }),
}));
