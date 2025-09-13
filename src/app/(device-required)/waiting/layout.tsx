"use client";

import { getDecryptedItem } from "@/lib/auth/secureStorage";
import { useRouter } from "next/navigation";
import { PropsWithChildren, useEffect, useState } from "react";

export default function Layout({ children }: PropsWithChildren) {
  const navigate = useRouter();
  const [shouldRender, setShouldRender] = useState(false);

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

      if (deviceInfo?.purpose?.toLowerCase() !== "hall") {
        navigate.back();
        return;
      }

      setShouldRender(true);
    };

    checkDevice();
  }, [navigate]);

  if (!shouldRender) return null;

  return children;
}
