import { create } from "zustand";

interface CategoryStore {
  categories: { name: string }[];
  setCategories: (data: { name: string }[]) => void;
  addCategory: (category: { name: string }) => void;
}

const useCategoryStore = create<CategoryStore>((set) => ({
  categories: [],
  setCategories: (data) => set({ categories: data }),
  addCategory: (category) =>
    set((state) => ({ categories: [...state.categories, category] })),
}));

export default useCategoryStore;
