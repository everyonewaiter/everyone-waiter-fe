"use client";

import { useEffect, useState } from "react";
import { getAccount } from "@/lib/api/auth.api";
import { useQuery } from "@tanstack/react-query";
import { useAccount } from "@/hooks/store/useAccount";
import { getToken } from "@/lib/cookies";
import Splash from "./(splash)/page";

export default function Home() {
  const FADE_OUT_DURATION = 1000;
  const [isLoading, setIsLoading] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [token, setToken] = useState("");

  const { setProfile, setIsLoggedIn } = useAccount();

  useEffect(() => {
    const fetchToken = async () => {
      const accessToken = await getToken("accessToken");
      setToken(accessToken!);
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
      <div>hi</div>
    </>
  );
}
