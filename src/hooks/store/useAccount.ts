/* eslint-disable import/prefer-default-export */
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { produce } from "immer";

type Item = Omit<TProfile, "accountId"> & { accountId: string };

interface StoreState extends Item {
  isLoggedIn: boolean;
  hasAcceptedStore: boolean;

  setProfile: (value: Item) => void;
  setIsLoggedIn: (value: boolean) => void;
  setPermission: (permission: TPermission) => void;
  setHasAcceptedStore: (value: boolean) => void;
}

export const useAccount = create<StoreState>()(
  persist(
    (set) => ({
      accountId: "",
      email: "",
      permission: "USER",
      isLoggedIn: false,
      hasAcceptedStore: false,

      setProfile: (value) => set(produce((state) => ({ ...state, ...value }))),
      setIsLoggedIn: (isLoggedIn) =>
        set(produce((state) => ({ ...state, isLoggedIn }))),
      setPermission: (permission) =>
        set(produce((state) => ({ ...state, permission }))),
      setHasAcceptedStore: (hasAcceptedStore) =>
        set(produce((state) => ({ ...state, hasAcceptedStore }))),
    }),
    {
      name: "account-storage",
      partialize: (state) => ({ permission: state.permission }),
    }
  )
);
