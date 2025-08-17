import { PropsWithChildren } from "react";
import ClientRefWrapper from "../_components/Wrapper";

export default async function Layout({ children }: PropsWithChildren) {
  return (
    <ClientRefWrapper className="aspect-[1344/832] md:h-auto md:min-w-[1000px] lg:h-[832px] lg:w-[1344px]">
      {children}
    </ClientRefWrapper>
  );
}
