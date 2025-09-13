"use client";

import { PropsWithChildren, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getDecryptedItem } from "@/lib/auth/secureStorage";
import KitchenSSEGuard from "@/components/guard/KitchenSSEGuard";

export default function Layout({ children }: PropsWithChildren) {
  const [shouldRender, setShouldRender] = useState(false);
  const navigate = useRouter();

  useEffect(() => {
    const checkDevice = async () => {
      const meta = JSON.parse(localStorage.getItem("@meta") || "{}");
      if (!meta.deviceId || !meta.storeId) {
        navigate.replace("/device");
        return;
      }

      const deviceInfo = (await getDecryptedItem({
        key: "@deviceInfo",
        deviceId: meta.deviceId,
        storeId: meta.storeId,
      })) as Device;

      if (deviceInfo?.purpose?.toLowerCase() !== "pos") {
        navigate.back();
        return;
      }

      setShouldRender(true);
    };

    checkDevice();
  }, [navigate]);

  if (!shouldRender) return null;

  return <KitchenSSEGuard allowedPurpose="pos">{children}</KitchenSSEGuard>;
}
