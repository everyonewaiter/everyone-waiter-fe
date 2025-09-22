import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return <div className="h-dvh w-dvw bg-white">{children}</div>;
}
