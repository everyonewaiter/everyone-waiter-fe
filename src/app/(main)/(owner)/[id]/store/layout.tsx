import PageTitle from "@/app/(main)/_components/PageTitle";
import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <PageTitle title="매장 정보" />
      {children}
    </>
  );
}
