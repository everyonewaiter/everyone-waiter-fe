import { TypeChildren } from "@/shared/common";
import SignupLayout from "../signup/layout";

export default function Layout({ children }: TypeChildren) {
  return <SignupLayout>{children}</SignupLayout>;
}
