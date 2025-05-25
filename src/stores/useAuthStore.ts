import { deleteCookie } from "@/lib/cookies";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthProps {
  user: UserProfile | null; // 유저 정보
  saveUser: (userInfo: UserProfile) => void; // 유저 정보 저장
  isLogin: boolean; // 로그인 여부
  logout: () => void; // 로그아웃
}
const useAuthStore = create(
  persist<AuthProps>(
    (set) => ({
      user: null,
      isLogin: false,
      saveUser: (userInfo) => set({ user: userInfo, isLogin: true }),
      logout: async () => {
        await deleteCookie("accessToken");
        await deleteCookie("refreshToken");
        set({ user: null, isLogin: false });
      },
    }),
    {
      name: "authStore",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useAuthStore;
