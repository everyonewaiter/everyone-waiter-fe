"use client";

import { PropsWithChildren, ReactNode, useEffect, useState } from "react";
import { DeviceProvider } from "@/providers/deviceStoreProvider";
import { usePathname, useRouter } from "next/navigation";
import { getDecryptedItem } from "@/lib/auth/secureStorage";
import { SseProvider } from "@/providers/sseProvider";
import FirstLoading from "../(main)/_components/FirstLoading";

export default function Layout({
  children,
  modal,
}: PropsWithChildren<{ modal: ReactNode }>) {
  const navigate = useRouter();
  const pathname = usePathname();

  const [checking, setIsChecking] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const meta = localStorage.getItem("@meta");

        if (meta) {
          const { deviceId, storeId } = JSON.parse(meta);
          const secretKey = (await getDecryptedItem({
            key: "@secretKey",
            deviceId,
            storeId,
          })) as string;

          if (!secretKey) {
            navigate.replace("/device");
          }
        }
      } catch {
        navigate.replace("/device");
      } finally {
        setIsChecking(false);
      }
    })();
  }, [pathname, navigate]);

  if (checking) return <FirstLoading />;

  return (
    <SseProvider>
      <DeviceProvider>
        {children}
        {modal}
      </DeviceProvider>
    </SseProvider>
  );
}
