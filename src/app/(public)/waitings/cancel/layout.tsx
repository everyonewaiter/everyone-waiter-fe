import Spinner from "@/components/common/Spinner";
import { Metadata } from "next";
import { PropsWithChildren, Suspense } from "react";

export const metadata: Metadata = {
  title: "내 순서 취소하기",
  description: "내 웨이팅 순서를 취소할 수 있다.",
  icons: {
    icon: "/logo/logo.svg",
  },
};

export default function Layout({ children }: PropsWithChildren) {
  return <Suspense fallback={<Spinner />}>{children}</Suspense>;
}
