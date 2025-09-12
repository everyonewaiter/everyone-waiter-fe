"use client";

import Loading from "@/components/Loading";
import { getDecryptedItem } from "@/lib/auth/secureStorage";
import { useRouter } from "next/navigation";
import { PropsWithChildren, useEffect, useState } from "react";

export default function Layout({ children }: PropsWithChildren) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkDeviceInfo = async () => {
      try {
        const meta = JSON.parse(localStorage.getItem("@meta") || "{}");

        const deviceInfo = (await getDecryptedItem({
          key: "@deviceInfo",
          deviceId: meta.deviceId,
          storeId: meta.storeId,
        })) as Device;

        if (deviceInfo.purpose) {
          router.push(`/${deviceInfo.purpose.toLowerCase()}`);
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
      }
    };

    checkDeviceInfo();
  }, [router]);

  if (isLoading) {
    return <Loading />;
  }

  return <div className="center h-dvh w-dvw bg-gray-700">{children}</div>;
}
