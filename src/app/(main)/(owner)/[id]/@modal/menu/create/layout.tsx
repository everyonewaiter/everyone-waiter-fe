import { PropsWithChildren } from "react";
import ClientRefWrapper from "../_components/Wrapper";

export default async function Layout({ children }: PropsWithChildren) {
  return (
    <ClientRefWrapper className="md:h-[621px] md:w-[912px] lg:h-[832px] lg:w-[1344px]">
      {children}
    </ClientRefWrapper>
  );
}
