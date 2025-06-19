import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";
import { OverlayStoreProvider } from "@/providers/overlayStoreProvider";
import QueryProviders from "./query-providers";

export const metadata: Metadata = {
  title: "모두의 웨이터",
  description: "모두의 웨이터",
  icons: {
    icon: "/logo/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-LE0LKNB3BT"
      />
      <body className="min-h-screen min-w-screen select-none">
        <OverlayStoreProvider>
          <QueryProviders>{children}</QueryProviders>
        </OverlayStoreProvider>
      </body>
    </html>
  );
}
