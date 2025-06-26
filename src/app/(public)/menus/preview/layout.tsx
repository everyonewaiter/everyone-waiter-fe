import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="h-screen w-screen bg-gray-700 px-[60px] py-8">
      {children}
    </div>
  );
}
