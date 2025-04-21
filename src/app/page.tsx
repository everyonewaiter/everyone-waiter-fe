"use client";

/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { getAccount } from "@/entities/user/api/auth.api";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/entities/user/model/useAuth";
import { getToken } from "@/shared/lib/cookies";
import { useRouter } from "next/navigation";
import GuideComponent from "@/shared/ui/GuideComponent";
import useStores from "@/entities/stores/model/useStores";
import { useSidebarStore } from "@/shared/stores/useSidebarStore";
import {
  ADMIN_MENU,
  FIRST_ACCESS_MENU,
  USER_MENU,
} from "@/shared/constants/sidebarMenus";
import Splash from "./(splash)/page";

export default function Home() {
  const FADE_OUT_DURATION = 1000;
  const navigate = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [token, setToken] = useState("");

  const { setProfile, setIsLoggedIn } = useAuth();
  const { registrationList } = useStores();
  const { data, isLoading: isListLoading } = registrationList(1);
  const { setActiveMenu, setMenu } = useSidebarStore();

  useEffect(() => {
    setActiveMenu("HOME");

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
      if (!isListLoading && !data?.registrations.length) {
        setMenu(FIRST_ACCESS_MENU);
      } else if (profile.permission === "ADMIN") {
        setMenu(ADMIN_MENU);
      } else {
        setMenu(USER_MENU);
      }
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
      <div className="center h-full w-full">
        {!isListLoading && !data?.registrations.length && (
          <GuideComponent
            title="매장이 등록되어 있지 않아요.\n아래 버튼을 눌러 매장 등록 신청을 해주세요."
            subtitle="매장 등록을 신청하시면 관리자가 확인 후 승인해드려요.\n1~2일 이내에 매장 승인이 완료됩니다."
            image={{ url: "/gif/no-stores.gif", size: 160 }}
            isFromHome
          />
        )}
        {!isListLoading &&
          data?.registrations.length! > 0 &&
          data?.registrations[0].status === "APPLY" && (
            <GuideComponent
              title="매장 등록 승인을 기다리고 있습니다."
              subtitle="관리자의 승인이 완료될 때까지 1~2일 소요될\n예정이니 양해 부탁드립니다."
              image={{ url: "/gif/hourglass.gif", size: 160 }}
              gap={5}
            />
          )}
      </div>
    </>
  );
}
