import { PropsWithChildren } from "react";
import { DeviceProvider } from "@/providers/deviceStoreProvider";

export default function Layout({ children }: PropsWithChildren) {
  return <DeviceProvider>{children}</DeviceProvider>;
}
