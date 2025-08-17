import { create } from "zustand";

type State = {
  selectedIds: string[];
};

type Actions = {
  isSelected: (id: string) => boolean;
  toggle: (id: string) => void;
  reset: () => void;
  setSelected: (ids: string[]) => void;
};

export const useMenuSelection = create<State & Actions>((set, get) => ({
  selectedIds: [],
  toggle: (id) =>
    set((state) => ({
      selectedIds: state.selectedIds.includes(id)
        ? state.selectedIds.filter((x) => x !== id)
        : [...state.selectedIds, id],
    })),
  isSelected: (id) => get().selectedIds.includes(id),
  reset: () => set({ selectedIds: [] }),
  setSelected: (ids) => set({ selectedIds: ids }),
}));
