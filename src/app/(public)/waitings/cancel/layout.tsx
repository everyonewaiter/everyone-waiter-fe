import Spinner from "@/components/common/Spinner";
import { PropsWithChildren, Suspense } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return <Suspense fallback={<Spinner />}>{children}</Suspense>;
}
