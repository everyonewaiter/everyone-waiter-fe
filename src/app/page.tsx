"use client";

/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { getAccount } from "@/lib/api/auth.api";
import { useQuery } from "@tanstack/react-query";
import { useAccount } from "@/hooks/store/useAccount";
import { getToken } from "@/lib/cookies";
import { useRouter } from "next/navigation";
import GuideComponent from "@/components/GuideComponent";
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
      <GuideComponent
        title="매장이 등록되어 있지 않아요.\n아래 버튼을 눌러 매장 등록 신청을 해주세요."
        subtitle="매장 등록을 신청하시면 관리자가 확인 후 승인해드려요.\n1~2일 이내에 매장 승인이 완료됩니다."
        image={{ url: "/gif/no-stores.gif", size: 160 }}
        isFromHome
      />
    </>
  );
}
