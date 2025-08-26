import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return <div className="h-dvh w-dvw bg-gray-700">{children}</div>;
}
