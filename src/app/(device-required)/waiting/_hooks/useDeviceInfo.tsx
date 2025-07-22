import { useEffect, useState } from "react";
import { getDecryptedItem } from "@/lib/auth/secureStorage";
import { useDeviceContext } from "@/providers/deviceStoreProvider";

export default function useDeviceInfo() {
  const { deviceId, storeId } = useDeviceContext();

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
        const value = (await getDecryptedItem({
          key: "@deviceInfo",
          deviceId: deviceId!,
          storeId: storeId!,
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
  }, [deviceId, storeId]);

  return { deviceInfo, isLoading, error };
}
