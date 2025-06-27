import { PropsWithChildren } from "react";

export default async function Layout({ children }: PropsWithChildren) {
  return <div className="relative flex-1 flex-col">{children}</div>;
}
