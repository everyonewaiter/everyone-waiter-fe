"use client";

import { useStoreContext } from "@/providers/storeProvider";
import { useRouter, useParams } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const navigate = useRouter();
  const params = useParams();

  const deviceId = params?.deviceId;

  const { storeId } = useStoreContext();

  useEffect(() => {
    if (deviceId) {
      navigate.replace(`/${storeId}/device/${deviceId}`);
    }
  }, [deviceId, navigate, storeId]);

  return null;
}
