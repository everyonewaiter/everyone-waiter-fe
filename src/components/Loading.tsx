"use client";

import { useEffect, useState } from "react";
import Lottie from "react-lottie";

export default function Loading() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    import("@/assets/json/rice-white.json").then((res) => {
      setData(res.default);
    });
  }, []);

  return (
    <div className="fixed inset-0 z-100 bg-black/50">
      <div className="flex h-screen w-screen flex-col items-center justify-center gap-3">
        <Lottie
          options={{
            loop: true,
            autoplay: true,
            animationData: data,
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
