import { create } from "zustand";

interface State {
  needLoading: boolean;
  setNeedLoading: (value: boolean) => void;
}

export const useLoadingStore = create<State>((set) => ({
  needLoading: false,
  setNeedLoading: (value) => set({ needLoading: value }),
}));
