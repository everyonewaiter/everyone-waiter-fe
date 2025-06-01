import { create } from "zustand";

type State = {
  isStoreOpen: boolean;
  storeOpen: () => void;
  storeClose: () => void;
};

const useStoreOpenStore = create<State>()((set) => ({
  isStoreOpen: false,
  storeOpen: () => set({ isStoreOpen: true }),
  storeClose: () => set({ isStoreOpen: false }),
}));

export default useStoreOpenStore;
