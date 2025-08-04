"use client";

import { PropsWithChildren, useEffect, useState } from "react";
import { DeviceProvider } from "@/providers/deviceStoreProvider";
import { usePathname, useRouter } from "next/navigation";
import { getDecryptedItem } from "@/lib/auth/secureStorage";
import FirstLoading from "../(main)/_components/FirstLoading";

export default function Layout({ children }: PropsWithChildren) {
  const navigate = useRouter();
  const pathname = usePathname();

  const [checking, setIsChecking] = useState(false);
  const [valid, setValid] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const meta = localStorage.getItem("@meta");

        if (!pathname.startsWith("/device") && !meta) {
          navigate.replace("/device");
          return;
        }

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
          setValid(true);
        }
      } catch {
        navigate.replace("/device");
      } finally {
        setIsChecking(false);
      }
    })();
  }, [pathname, navigate]);

  if (checking) return <FirstLoading />;

  if (!valid && !pathname.startsWith("/device")) return null;

  return <DeviceProvider>{children}</DeviceProvider>;
}
