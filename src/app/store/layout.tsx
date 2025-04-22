import { TypeChildren } from "@/shared/common";
import MainLayout from "@/shared/ui/layout/MainLayout";

export default function Layout({ children }: TypeChildren) {
  return <MainLayout>{children}</MainLayout>;
}
