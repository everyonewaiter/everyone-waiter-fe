import { PropsWithChildren } from "react";
import RefLayout from "@/components/modal/RefLayout";

export default function ClientRefWrapper({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return <RefLayout className={className}>{children}</RefLayout>;
}
