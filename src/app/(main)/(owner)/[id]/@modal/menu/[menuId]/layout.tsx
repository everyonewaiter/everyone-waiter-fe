import dynamic from "next/dynamic";
import { PropsWithChildren } from "react";

const ClientWrapper = dynamic(() => import("./_components/Wrapper"));

export default async function Layout({ children }: PropsWithChildren) {
  return (
    <ClientWrapper>
      <div className="h-full">{children}</div>;
    </ClientWrapper>
  );
}
