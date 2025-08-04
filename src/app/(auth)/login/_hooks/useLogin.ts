"use client";

import { useRouter } from "next/navigation";
import useAuthStore from "@/stores/useAuthStore";
import { useTransition } from "react";
import { setClientCookie } from "@/lib/cookies/client";
import { serverLogin } from "./useServerLogin";

export default function useLogin() {
  const { saveUser } = useAuthStore();
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  async function loginUser(email: string, password: string) {
    startTransition(async () => {
      try {
        const { profileData, storeList, permission, token } = await serverLogin(
          email,
          password
        );

        saveUser(profileData);
        setClientCookie("permission", permission);
        setClientCookie("client-accessToken", token.accessToken);
        setClientCookie("client-refreshToken", token.refreshToken);

        if (profileData.permission === "ADMIN") {
          router.push("/admin/users");
        } else if (storeList?.stores?.length > 0) {
          router.push(`/${storeList.stores[0].storeId}`);
        } else {
          router.push("/user");
        }
      } catch (e) {
        // eslint-disable-next-line
        console.error("Login failed:", e);
      }
    });
  }

  return { loginUser, isPending };
}
