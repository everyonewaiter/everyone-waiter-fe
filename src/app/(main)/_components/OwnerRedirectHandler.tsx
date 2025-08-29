"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import FirstLoading from "./FirstLoading";
import { getStoreList } from "../(owner)/[id]/store/_api/stores.api";

export default function OwnerRedirectHandler() {
  const router = useRouter();

  useEffect(() => {
    const handleRedirect = async () => {
      try {
        const { stores } = await getStoreList();
        const firstStoreId = stores?.[0]?.storeId;

        if (firstStoreId) {
          router.push(`/${firstStoreId}`);
        } else {
          router.push("/not-found");
        }
      } catch (error: any) {
        router.push("/not-found");
      }
    };

    handleRedirect();
  }, [router]);

  return <FirstLoading />;
}
