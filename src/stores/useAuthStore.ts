import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { deleteClientCookie } from "@/lib/cookies/client";

interface AuthProps {
  user: UserProfile | null; // 유저 정보
  saveUser: (userInfo: UserProfile) => void; // 유저 정보 저장
  isLoggedIn: boolean; // 로그인 여부
  logout: () => void; // 로그아웃
  setIsLoggedIn: (token: string) => void;
}
const useAuthStore = create(
  persist<AuthProps>(
    (set) => ({
      user: null,
      isLoggedIn: false,
      saveUser: (userInfo) => set({ user: userInfo, isLoggedIn: true }),
      logout: () => {
        deleteClientCookie("accessToken");
        deleteClientCookie("refreshToken");
        set({ user: null, isLoggedIn: false });
      },
      setIsLoggedIn: (token) =>
        set((state) => ({ ...state, isLoggedIn: !!token })),
    }),
    {
      name: "authStore",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useAuthStore;
