import MainLayout from "@/components/layout/MainLayout";
import { TypeChildren } from "@/types/common";

export default function Layout({ children }: TypeChildren) {
  return <MainLayout>{children}</MainLayout>;
}
