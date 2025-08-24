import { create } from "zustand";

interface NotificationState {
  orderCount: number;
  incrementOrder: () => void;
  resetOrder: () => void;
  setOrderCount: (count: number) => void;
  waitingCount: number;
  incrementWaiting: () => void;
  resetWaiting: () => void;
  setWaitingCount: (count: number) => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  orderCount: 0,
  incrementOrder: () => set((state) => ({ orderCount: state.orderCount + 1 })),
  resetOrder: () => set({ orderCount: 0 }),
  setOrderCount: (count) => set({ orderCount: count }),
  waitingCount: 0,
  incrementWaiting: () =>
    set((state) => ({ waitingCount: state.waitingCount + 1 })),
  resetWaiting: () => set({ waitingCount: 0 }),
  setWaitingCount: (count) => set({ waitingCount: count }),
}));
