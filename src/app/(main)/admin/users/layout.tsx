import { PropsWithChildren } from "react";

export default function Layout({
  children,
  // modal,
}: PropsWithChildren) {
  return (
    <div className="h-full">
      {children}
      {/* {modal} */}
    </div>
  );
}
