"use client";

import { useRouter } from "next/navigation";
import useAuthStore from "@/stores/useAuthStore";
import { getAccount, login } from "@/lib/api/auth.api";
import { setClientCookie } from "@/lib/cookies/client";
import { getStoreList } from "@/app/(main)/(owner)/[id]/store/_api/stores.api";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { saveRefresh } from "../_utils/saveRefresh";

export default function useLogin() {
  const { saveUser } = useAuthStore();
  const router = useRouter();

  return useMutation<
    { accessToken: string },
    AxiosError<ErrorResponse>,
    { email: string; password: string }
  >({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      const { accessToken, refreshToken } = await login({ email, password });
      await saveRefresh(refreshToken);
      return { accessToken };
    },
    onSuccess: async ({ accessToken }) => {
      // 1. 토큰 저장
      setClientCookie("accessToken", accessToken);

      // 2. 유저, 스토어 정보 가져오기
      const [profileData, storeList] = await Promise.all([
        getAccount(accessToken),
        getStoreList(accessToken),
      ]);

      // 3. 유저 정보 저장
      saveUser(profileData);
      setClientCookie("permission", profileData.permission);

      // 4. 리다이렉트
      if (profileData.permission === "ADMIN") {
        router.push("/admin/users");
      } else if (
        profileData.permission === "OWNER" &&
        storeList?.stores?.length > 0
      ) {
        router.push(`/${storeList.stores[0].storeId}`);
      } else {
        router.push("/main");
      }
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      throw new Error(error.message);
    },
  });
}
