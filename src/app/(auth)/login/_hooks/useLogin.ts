import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { getAccount, login } from "@/lib/api/auth.api";
import useAuthStore from "@/stores/useAuthStore";
import { storeKeys } from "@/app/(main)/(owner)/[id]/store/_queries/keys";
import { getStoreList } from "@/app/(main)/(owner)/[id]/store/_api/stores.api";
import { setClientCookie } from "@/lib/cookies/client";

export default function useLogin() {
  const { saveUser } = useAuthStore();
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: login,
    onSuccess: async (response) => {
      // 1. 토큰 저장
      setClientCookie("accessToken", response.accessToken);
      setClientCookie("refreshToken", response.refreshToken);

      axios.defaults.headers.common.Authorization = `Bearer ${response.accessToken}`;

      // 2. 유저 정보 가져오기
      const profileData = await queryClient.fetchQuery({
        queryKey: ["my"],
        queryFn: getAccount,
      });
      // 3. 유저 정보 저장
      saveUser(profileData);
      setClientCookie("permission", profileData.permission);

      // 4. 리다이렉트
      const storeList = await queryClient.fetchQuery({
        queryKey: storeKeys.stores(),
        queryFn: getStoreList,
      });

      if (profileData.permission === "ADMIN") {
        router.push("/admin/users");
      } else if (
        Array.isArray(storeList?.stores) &&
        storeList.stores.length > 0
      ) {
        router.push(`/${storeList.stores[0].storeId}`);
      } else {
        router.push("/user");
      }
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      throw new Error(error.message);
    },
  });
}
