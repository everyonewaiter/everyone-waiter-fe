import { PropsWithChildren } from "react";
import { NowProvider } from "@/providers/nowProvider";

export default function Layout({ children }: PropsWithChildren) {
  return <NowProvider>{children}</NowProvider>;
}
