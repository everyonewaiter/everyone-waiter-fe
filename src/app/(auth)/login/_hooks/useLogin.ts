"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/stores/useAuthStore";
import { getAccount } from "@/lib/api/auth.api";
import { getStoreList } from "@/app/(main)/(owner)/[id]/store/_api/stores.api";
import { serverLogin } from "./useServerLogin";

export default function useLogin() {
  const { saveUser } = useAuthStore();
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  async function loginUser(email: string, password: string) {
    startTransition(async () => {
      const { accessToken } = await serverLogin(email, password);

      const profileData = await getAccount(accessToken);
      const storeList = await getStoreList(accessToken);

      saveUser(profileData);

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
