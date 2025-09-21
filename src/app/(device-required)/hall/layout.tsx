"use client";

import { PropsWithChildren, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getDecryptedItem,
  getCurrentDevicePurpose,
} from "@/lib/auth/secureStorage";
import KitchenSSEGuard from "@/components/guard/KitchenSSEGuard";
import {
  setAudioTestButtonRef,
  playAudioDirectly,
} from "@/utils/audioNotification";
import Header from "./_components/Header";

export default function HallLayout({ children }: PropsWithChildren) {
  const [shouldRender, setShouldRender] = useState(false);
  const navigate = useRouter();

  useEffect(() => {
    const checkDevice = async () => {
      try {
        const meta = JSON.parse(localStorage.getItem("@meta") || "{}");
        if (!meta.deviceId || !meta.storeId) {
          navigate.replace("/device");
          return;
        }

        const secretKey = await getDecryptedItem({
          key: "@secretKey",
          deviceId: meta.deviceId,
          storeId: meta.storeId,
        });

        if (!secretKey) {
          navigate.replace("/device");
          return;
        }

        const currentPurpose = await getCurrentDevicePurpose();

        if (currentPurpose?.toLowerCase() !== "hall") {
          navigate.push("/pos");
          return;
        }

        setShouldRender(true);
      } catch (error) {
        navigate.replace("/device");
      }
    };

    checkDevice();
  }, [navigate]);

  if (!shouldRender) return null;

  return (
    <KitchenSSEGuard allowedPurpose="hall">
      <div className="scrollbar-hide flex min-h-dvh flex-col items-center gap-4 bg-gray-700 px-[60px] py-8">
        <Header
          href="/hall"
          speakerButton={
            <button
              type="button"
              data-audio-test-button
              ref={(el) => {
                setAudioTestButtonRef(el);
              }}
              onClick={playAudioDirectly}
              className="button-xl hover:!text-gray-0 !text-gray-300"
            >
              🔊 주문 알림 테스트
            </button>
          }
        />
        {children}
      </div>
    </KitchenSSEGuard>
  );
}
