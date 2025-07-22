import { Metadata } from "next";
import { PropsWithChildren, Suspense } from "react";
import Spinner from "@/components/common/Spinner";

export const metadata: Metadata = {
  title: "내 순서 확인하기",
  description: "내 순서를 확인할 수 있다..",
  icons: {
    icon: "/logo/logo.svg",
  },
};

export default function Layout({ children }: PropsWithChildren) {
  return <Suspense fallback={<Spinner />}>{children}</Suspense>;
}
