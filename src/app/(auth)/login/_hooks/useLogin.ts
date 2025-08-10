"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/stores/useAuthStore";
import { getAccount } from "@/lib/api/auth.api";
import { setClientCookie } from "@/lib/cookies/client";
import { getStoreList } from "@/app/(main)/(owner)/[id]/store/_api/stores.api";
import { serverLogin } from "../utils/serverlogin";

export default function useLogin() {
  const { saveUser } = useAuthStore();
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  async function loginUser(email: string, password: string) {
    const { accessToken } = await serverLogin(email, password);

    const [profileData, storeList] = await Promise.all([
      getAccount(accessToken),
      getStoreList(accessToken),
    ]);

    startTransition(async () => {
      saveUser(profileData);
      setClientCookie("permission", profileData.permission);
      setClientCookie("accessToken", accessToken);

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
    });
  }

  return { loginUser, isPending };
}
