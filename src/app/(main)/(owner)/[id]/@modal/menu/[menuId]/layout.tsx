import { PropsWithChildren } from "react";
import RefLayout from "../../_components/RefLayout";

export default async function Layout({ children }: PropsWithChildren) {
  return <RefLayout width={1344}>{children}</RefLayout>;
}
