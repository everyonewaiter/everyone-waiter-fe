import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthProps {
  user: UserProfile | null; // 유저 정보
  saveUser: (userInfo: UserProfile) => void; // 유저 정보 저장
  isLoggedIn: boolean; // 로그인 여부
  setIsLoggedIn: (value: boolean) => void;
}
const useAuthStore = create(
  persist<AuthProps>(
    (set) => ({
      user: null,
      isLoggedIn: false,
      saveUser: (userInfo) => set({ user: userInfo, isLoggedIn: true }),
      setIsLoggedIn: (value) =>
        set((state) => ({ ...state, isLoggedIn: value })),
    }),
    {
      name: "authStore",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useAuthStore;
