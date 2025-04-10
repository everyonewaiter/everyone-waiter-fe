"use client";

/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { getAccount } from "@/lib/api/auth.api";
import { useQuery } from "@tanstack/react-query";
import { useAccount } from "@/hooks/store/useAccount";
import { getToken } from "@/lib/cookies";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/common/Button";
import Splash from "./(splash)/page";

export default function Home() {
  const FADE_OUT_DURATION = 1000;
  const navigate = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [token, setToken] = useState("");

  const { setProfile, setIsLoggedIn } = useAccount();

  useEffect(() => {
    const fetchToken = async () => {
      const accessToken = await getToken("accessToken");
      if (!accessToken) {
        alert("로그인이 필요합니다.");
        navigate.push("/login");
      } else {
        setToken(accessToken!);
      }
    };
    fetchToken();
  }, []);

  const { data: profile } = useQuery({
    queryKey: ["my"],
    queryFn: getAccount,
    enabled: !!token,
  });

  useEffect(() => {
    if (profile?.accountId!) {
      setProfile(profile);
      setIsLoggedIn(true);
    }
  }, [profile]);

  useEffect(() => {
    const hideSplash = localStorage.getItem("hideSplash");

    if (hideSplash === "false" || !hideSplash) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setFadeOut(true);
        setTimeout(() => {
          localStorage.setItem("hideSplash", "true");
          setIsLoading(false);
        }, FADE_OUT_DURATION);
      }, 2000);

      return () => clearTimeout(timer);
    }

    return () => {};
  }, []);

  return (
    <>
      {isLoading && <Splash fadeOut={fadeOut} duration={FADE_OUT_DURATION} />}
      <div className="flex flex-col items-center gap-10 rounded-[32px] bg-white p-8">
        <Image
          src="/gif/no-stores.gif"
          alt="매장이 등록되어있지 않습니다"
          width={160}
          height={160}
        />
        <div className="flex flex-col gap-8 text-center">
          <div className="flex flex-col gap-3">
            <strong className="text-gray-0 text-2xl font-semibold">
              매장이 등록되어 있지 않아요.
              <br />
              아래 버튼을 눌러 매장 등록 신청을 해주세요.
            </strong>
            <span className="font-regulartext-lg text-gray-300">
              매장 등록을 신청하시면 관리자가 확인 후 승인해드려요.
              <br />
              1~2일 이내에 매장 승인이 완료됩니다.
            </span>
          </div>
          <Button
            color="primary"
            size="lg"
            onClick={() => navigate.push("/store/create")}
          >
            내 신청 현황 보기
          </Button>
        </div>
      </div>
    </>
  );
}
