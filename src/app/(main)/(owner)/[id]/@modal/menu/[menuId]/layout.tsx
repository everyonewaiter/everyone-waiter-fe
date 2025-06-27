import { PropsWithChildren } from "react";
import ClientRefWrapper from "../_components/Wrapper";

export default function Layout({ children }: PropsWithChildren) {
  return <ClientRefWrapper>{children}</ClientRefWrapper>;
}
