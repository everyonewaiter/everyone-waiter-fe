"use client";

import dynamic from "next/dynamic";
import riceWhite from "@/assets/json/rice-white.json";
import { useEffect } from "react";
import Image from "next/image";

const Lottie = dynamic(() => import("react-lottie"), {
  ssr: false,
  loading: () => (
    <div className="h-[120px] w-[120px]">
      <Image
        src="/images/loading-replace.svg"
        alt="Loading animation"
        width={120}
        height={120}
        className="h-full w-full"
      />
    </div>
  ),
});

export default function Loading() {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] bg-black/60">
      <div className="flex h-dvh w-dvw flex-col items-center justify-center gap-3">
        <Lottie
          options={{
            loop: true,
            autoplay: true,
            animationData: riceWhite,
            rendererSettings: {
              preserveAspectRatio: "xMidYMid slice",
            },
          }}
          width={120}
          height={120}
        />
        <div className="flex flex-col items-center">
          <span className="text-[15px] text-white">
            서비스를 불러오고 있어요.
          </span>
          <span className="text-[15px] text-white">잠시만 기다려 주세요.</span>
        </div>
      </div>
    </div>
  );
}
