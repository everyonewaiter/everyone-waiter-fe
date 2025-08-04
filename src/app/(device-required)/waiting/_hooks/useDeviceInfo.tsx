import { useEffect, useState } from "react";
import { getDecryptedItem } from "@/lib/auth/secureStorage";

export default function useDeviceInfo() {
  const [deviceInfo, setDeviceInfo] = useState<Pick<
    Device,
    "deviceId" | "name" | "purpose"
  > | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchDeviceInfo = async () => {
      try {
        setIsLoading(true);
        const meta = JSON.parse(localStorage.getItem("@meta") || "{}");
        const value = (await getDecryptedItem({
          key: "@deviceInfo",
          deviceId: meta.deviceId,
          storeId: meta.storeId,
        })) as Device;
        setDeviceInfo(value);
        setError(null);
      } catch (err: any) {
        setError(err);
        setDeviceInfo(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDeviceInfo();
  }, []);

  return { deviceInfo, isLoading, error };
}
