import { create } from "zustand";

interface State {
  memo: string;
  setMemo: (val: string) => void;
  resetMemo: () => void;
  originMemo: string;
  setOriginMemo: (val: string) => void;
}

export const useMemoStore = create<State>((set) => ({
  memo: "",
  setMemo: (val) => set({ memo: val }),
  resetMemo: () => set({ originMemo: "", memo: "" }),

  originMemo: "",
  setOriginMemo: () => set({ originMemo: "" }),
}));
