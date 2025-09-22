"use client";

import FirstLoading from "@/app/(main)/_components/FirstLoading";
import { getDecryptedItem } from "@/lib/auth/secureStorage";
import { useRouter } from "next/navigation";
import { PropsWithChildren, useEffect, useState } from "react";

export default function Layout({ children }: PropsWithChildren) {
  const navigate = useRouter();
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
          navigate.replace(`/${deviceInfo.purpose.toLowerCase()}`);
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
      }
    };

    checkDeviceInfo();
    // eslint-disable-next-line
  }, []);

  if (isLoading) {
    return <FirstLoading />;
  }

  return <div className="center h-dvh w-dvw bg-gray-700">{children}</div>;
}
