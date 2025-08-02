"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/stores/useAuthStore";
import { storesQueries } from "../(main)/(owner)/[id]/store/_queries/useStores";

interface IProps {
  token: string;
  permission: AccountPermission;
}

export default function ClientPage({ token, permission }: IProps) {
  const router = useRouter();
  const { setIsLoggedIn } = useAuthStore();

  const { data, isLoading } = storesQueries.useStoresList(!!token);
  const firstStoreId = data?.stores?.[0]?.storeId;

  useEffect(() => {
    setIsLoggedIn(!!token);
  }, [token, setIsLoggedIn]);

  useEffect(() => {
    if (!isLoading) {
      if (permission === "ADMIN") {
        router.replace("/admin/users");
      } else if (!token) {
        router.replace("/login");
      } else if (!firstStoreId) {
        router.replace("/user");
      } else {
        router.replace(`/${firstStoreId}`);
      }
    }
    // eslint-disable-next-line
  }, [isLoading, token, firstStoreId, permission]);

  return null;
}
