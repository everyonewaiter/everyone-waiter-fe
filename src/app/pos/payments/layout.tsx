import { PropsWithChildren } from "react";
import POSHeader2 from "../_components/POSHeader2";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div>
      <POSHeader2 />
      {children}
    </div>
  );
}
