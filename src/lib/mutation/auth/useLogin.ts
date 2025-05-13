import { useAccount } from "@/hooks/store/useAccount";
import { getAccount, login } from "@/lib/api/auth.api";
import { setCookie } from "@/lib/cookies";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function useLogin() {
  const { setProfile } = useAccount();
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
      const { accountId, email, permission } = profileData;
      setProfile({
        accountId,
        email,
        permission,
      });
      // 4. 리다이렉트
      router.push("/");
    },
  });
}
