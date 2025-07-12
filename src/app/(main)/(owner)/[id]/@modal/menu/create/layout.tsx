import { PropsWithChildren } from "react";
import ClientRefWrapper from "../_components/Wrapper";

export default async function Layout({ children }: PropsWithChildren) {
  return (
    <ClientRefWrapper className="md:h-[calc(100%-48px)] md:w-[calc(100%-48px)] lg:max-h-[832px] lg:max-w-[1344px]">
      {children}
    </ClientRefWrapper>
  );
}
