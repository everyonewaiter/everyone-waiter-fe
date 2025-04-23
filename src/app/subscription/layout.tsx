import { TypeChildren } from "@/types/common";
import dynamic from "next/dynamic";

const ClientLayout = dynamic(() => import("@/components/layout/ClientLayout"), {
  ssr: false,
});

export default function Layout({ children }: TypeChildren) {
  return <ClientLayout>{children}</ClientLayout>;
}
