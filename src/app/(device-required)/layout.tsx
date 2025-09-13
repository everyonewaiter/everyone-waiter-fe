"use client";

import { PropsWithChildren, ReactNode, useEffect, useState } from "react";
import { DeviceProvider } from "@/providers/deviceStoreProvider";
import { usePathname, useRouter } from "next/navigation";
import {
  getDecryptedItem,
  updateDevice,
  updateDevicePurpose,
} from "@/lib/auth/secureStorage";
import { SseProvider } from "@/providers/sseProvider";
import FirstLoading from "../(main)/_components/FirstLoading";
import getQueryClient from "../get-query-client";

export default function Layout({
  children,
  modal,
}: PropsWithChildren<{ modal: ReactNode }>) {
  const navigate = useRouter();
  const pathname = usePathname();
  const [checking, setIsChecking] = useState(true);
  const queryClient = getQueryClient();

  useEffect(() => {
    updateDevice();
  }, []);

  useEffect(() => {
    const unsubscribe = queryClient.getQueryCache().subscribe(async (event) => {
      if (
        event.type === "updated" &&
        JSON.stringify(event.query.queryKey) ===
          JSON.stringify(["update-device"])
      ) {
        await updateDevicePurpose();

        queryClient.removeQueries({ queryKey: ["update-device"] });
        navigate.refresh();
      }
    });

    return () => unsubscribe();
    // eslint-disable-next-line
  }, [queryClient]);

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
        } else {
          navigate.replace("/device");
        }
      } catch {
        navigate.replace("/device");
        return;
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
