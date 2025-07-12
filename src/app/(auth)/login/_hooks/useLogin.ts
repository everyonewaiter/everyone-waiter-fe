import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { getAccount, login } from "@/lib/api/auth.api";
import { setCookie } from "@/lib/cookies";
import useAuthStore from "@/stores/useAuthStore";

export default function useLogin() {
  const { saveUser } = useAuthStore();
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: login,
    onSuccess: async (response) => {
      // 1. 토큰 저장
      await setCookie("accessToken", response.accessToken);
      await setCookie("refreshToken", response.refreshToken);

      // 2. 유저 정보 가져오기
      const profileData = await queryClient.fetchQuery({
        queryKey: ["my"],
        queryFn: getAccount,
      });
      // 3. 유저 정보 저장
      saveUser(profileData);
      // 4. 리다이렉트
      if (profileData.permission === "ADMIN") {
        router.push("/admin/users");
      } else {
        router.push("/");
      }
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      throw new Error(error.message);
    },
  });
}
