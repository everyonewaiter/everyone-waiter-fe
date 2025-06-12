import { PropsWithChildren } from "react";
import RefLayout from "./_components/RefLayout";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <RefLayout>{children}</RefLayout>
    </div>
  );
}
