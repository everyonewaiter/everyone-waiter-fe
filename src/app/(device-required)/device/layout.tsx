import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return <div className="center h-dvh w-dvw bg-gray-700">{children}</div>;
}
