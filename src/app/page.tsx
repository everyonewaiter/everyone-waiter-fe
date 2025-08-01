"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/stores/useAuthStore";
import { getClientCookie } from "@/lib/cookies/client";
import { storesQueries } from "./(main)/(owner)/[id]/store/_queries/useStores";
import FirstLoading from "./(main)/_components/FirstLoading";

export default function Page() {
  const navigate = useRouter();
  const { setIsLoggedIn } = useAuthStore();
  const accessToken = getClientCookie("accessToken");
  const permission = getClientCookie("permission");

  const { data, isLoading } = storesQueries.useStoresList(!!accessToken);
  const firstStoreId = data?.stores?.[0]?.storeId;

  useEffect(() => {
    setIsLoggedIn(!!accessToken);
  }, [accessToken, setIsLoggedIn]);

  useEffect(() => {
    if (!isLoading) {
      if (permission === "ADMIN") {
        navigate.replace("/admin/users");
      } else if (!accessToken) {
        navigate.replace("/login");
      } else if (!firstStoreId) {
        navigate.replace("/user");
      } else {
        navigate.replace(`/${firstStoreId}`);
      }
    }
  }, [isLoading, accessToken, firstStoreId, permission]);

  return <FirstLoading />;
}
