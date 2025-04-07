import type { Metadata } from "next";
import Head from "next/head";

import "./globals.css";
import QueryProviders from "./query-providers";

export const metadata: Metadata = {
  title: "모두의 웨이터",
  description: "모두의 웨이터",
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <body>
        <QueryProviders>{children}</QueryProviders>
      </body>
    </html>
  );
}
