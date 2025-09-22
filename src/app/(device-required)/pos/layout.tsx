"use client";

import { PropsWithChildren, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getDecryptedItem,
  getCurrentDevicePurpose,
} from "@/lib/auth/secureStorage";
import KitchenSSEGuard from "@/components/guard/KitchenSSEGuard";

export default function PosLayout({ children }: PropsWithChildren) {
  const [shouldRender, setShouldRender] = useState(false);
  const navigate = useRouter();

  useEffect(() => {
    const checkDevice = async () => {
      try {
        const meta = JSON.parse(localStorage.getItem("@meta") || "{}");
        if (!meta.deviceId || !meta.storeId) {
          navigate.replace("/device");
          return;
        }

        // Secret key 확인
        const secretKey = await getDecryptedItem({
          key: "@secretKey",
          deviceId: meta.deviceId,
          storeId: meta.storeId,
        });

        if (!secretKey) {
          navigate.replace("/device");
          return;
        }

        // Purpose 검증
        const currentPurpose = await getCurrentDevicePurpose();

        if (currentPurpose?.toLowerCase() !== "pos") {
          navigate.push("/hall");
          return;
        }

        setShouldRender(true);
      } catch (error) {
        navigate.replace("/device");
      }
    };

    checkDevice();
  }, [navigate]);

  if (!shouldRender) return null;

  return <KitchenSSEGuard allowedPurpose="pos">{children}</KitchenSSEGuard>;
}
