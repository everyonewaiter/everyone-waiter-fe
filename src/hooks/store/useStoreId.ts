import { create } from "zustand";

interface StoreState {
  storeId: bigint;
  setStoreId: (value: bigint) => void;
}

const useStoreId = create<StoreState>()((set) => ({
  storeId: BigInt(0),
  setStoreId: (storeId) => set({ storeId }),
}));

export default useStoreId;
