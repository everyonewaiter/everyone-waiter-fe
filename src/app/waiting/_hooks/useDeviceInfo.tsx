import { useState, useEffect } from "react";
import { getSecureItem } from "@/lib/auth/localStorage";

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
        const value = await getSecureItem("deviceInfo");
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
