"use client";

import axios from "axios";
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
        const { profileData, storeList, accessToken, permission } =
          await serverLogin(email, password);

        saveUser(profileData);
        setClientCookie("permission", permission);
        setClientCookie("accessToken", accessToken);

        axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

        if (profileData.permission === "ADMIN") {
          router.push("/admin/users");
        } else if (storeList?.stores?.length > 0) {
          router.push(`/${storeList.stores[0].storeId}`);
        } else {
          router.push("/user");
        }
      } catch (e) {
        console.error("Login failed:", e);
      }
    });
  }

  return { loginUser, isPending };
}
