import { create } from "zustand";

interface NotificationState {
  orderCount: number;
  resetOrder: () => void;
  setOrderCount: (count: number) => void;
  waitingCount: number;
  resetWaiting: () => void;
  setWaitingCount: (count: number) => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  orderCount: 0,
  resetOrder: () => set({ orderCount: 0 }),
  setOrderCount: (count) => set({ orderCount: count }),
  waitingCount: 0,
  resetWaiting: () => set({ waitingCount: 0 }),
  setWaitingCount: (count) => set({ waitingCount: count }),
}));
