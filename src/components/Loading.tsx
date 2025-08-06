"use client";

import dynamic from "next/dynamic";
import riceWhite from "@/assets/json/rice-white.json";

const Lottie = dynamic(() => import("react-lottie"), {
  ssr: false,
});

export default function Loading() {
  return (
    <div className="fixed inset-0 z-1000 bg-black/60">
      <div className="flex h-screen w-screen flex-col items-center justify-center gap-3">
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
