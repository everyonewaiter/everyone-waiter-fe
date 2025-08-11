import { PropsWithChildren } from "react";
import PageTitle from "../../_components/PageTitle/PageTitle";

export default function Layout({
  children,
  // modal,
}: PropsWithChildren) {
  return (
    <div className="h-full">
      <PageTitle initialTitle="회원 관리" />
      {children}
      {/* {modal} */}
    </div>
  );
}
