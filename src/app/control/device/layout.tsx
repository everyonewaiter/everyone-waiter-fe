import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div>
      <div className="flex h-full w-full items-center justify-center pt-4 md:hidden">
        {children}
      </div>
      <div className="hidden md:block">{children}</div>
    </div>
  );
}
