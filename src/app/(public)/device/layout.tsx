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

        if (!meta.deviceId || !meta.storeId) {
          setIsLoading(false);
          return;
        }

        const deviceInfo = (await getDecryptedItem({
          key: "@deviceInfo",
          deviceId: meta.deviceId,
          storeId: meta.storeId,
        })) as Device;

        if (deviceInfo?.purpose) {
          const targetPath = `/${deviceInfo.purpose.toLowerCase()}`;
          if (window.location.pathname !== targetPath) {
            navigate.replace(targetPath);
          } else {
            setIsLoading(false);
          }
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
