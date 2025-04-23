import ClientLayout from "@/components/layout/ClientLayout";
import { TypeChildren } from "@/types/common";

export default function Layout({ children }: TypeChildren) {
  return <ClientLayout>{children}</ClientLayout>;
}
