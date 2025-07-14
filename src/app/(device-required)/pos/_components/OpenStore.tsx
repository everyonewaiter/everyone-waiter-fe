"use client";

import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import QueryProviders from "@/app/query-providers";
import useOverlay from "@/hooks/use-overlay";
import cn from "@/lib/utils";
import { useDeviceContext } from "@/providers/deviceStoreProvider";
import usePos from "../_queries/usePos";

const Alert = dynamic(() => import("@/components/common/Alert/Alert"), {
  ssr: false,
});

export default function OpenStore() {
  const navigate = useRouter();

  const { open, close } = useOverlay();
  const { storeId } = useDeviceContext();

  const {
    store: { open: storeOpen, close: storeClose },
    storeInfo,
  } = usePos();
  const { data } = storeInfo(storeId!);
  const isStoreOpen = data?.status === "OPEN";

  const handleOpenStore = () => {
    const successHandler = () => {
      close();
      navigate.push("/pos");
    };

    open(() => (
      <QueryProviders>
        <Alert
          onClose={close}
          buttonText={isStoreOpen ? "마감하기" : "오픈하기"}
          onAction={() => {
            if (isStoreOpen)
              storeClose.mutate(undefined, { onSuccess: successHandler });
            else storeOpen.mutate(undefined, { onSuccess: successHandler });
          }}
        >
          매장을 {isStoreOpen ? "마감" : "오픈"}하시겠습니까?
        </Alert>
      </QueryProviders>
    ));
  };

  return (
    <button
      type="button"
      className={cn(
        "font-regular flex h-[44px] flex-row gap-3 rounded-[40px] border px-3 py-[10px] text-base",
        isStoreOpen
          ? "border-status-success text-gray-0 bg-[#6BD78620]"
          : "border-gray-400 bg-gray-600 text-gray-300"
      )}
      onClick={handleOpenStore}
    >
      <div
        className={cn(
          "h-[23px] w-[23px] rounded-full",
          isStoreOpen ? "bg-status-success" : "bg-gray-400"
        )}
      />
      {isStoreOpen ? "영업 중" : "영업 마감"}
    </button>
  );
}
