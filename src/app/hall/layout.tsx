import { PropsWithChildren } from "react";
import Header from "./_components/Header";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="flex h-screen w-screen flex-col items-center gap-4 bg-gray-700 px-[60px] py-8">
      <Header />
      {children}
    </div>
  );
}
