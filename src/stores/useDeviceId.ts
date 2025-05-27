import { create } from "zustand";

interface StoreState {
  deviceId: bigint;
  setDeviceId: (value: bigint) => void;
}

const useDeviceId = create<StoreState>()((set) => ({
  deviceId: BigInt(0),
  setDeviceId: (deviceId) => set({ deviceId }),
}));

export default useDeviceId;
