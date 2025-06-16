import PageTitle from "@/app/(main)/_components/PageTitle";
import { PropsWithChildren } from "react";

export default async function Layout({ children }: PropsWithChildren) {
  return (
    <div className="relative flex h-full flex-col">
      <PageTitle title="메뉴 관리" />
      <div className="flex min-h-screen flex-1 flex-col">{children}</div>
    </div>
  );
}
