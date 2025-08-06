"use client";

import { serverLogout } from "@/lib/actions/logout";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LogoutPage() {
  const navigate = useRouter();

  useEffect(() => {
    serverLogout().then(() => {
      navigate.replace("/login");
    });
  }, [navigate]);

  return <p>로그아웃 중입니다...</p>;
}
