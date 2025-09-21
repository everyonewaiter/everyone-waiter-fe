import type { Metadata } from "next";
import localFont from "next/font/local";
import * as Sentry from "@sentry/nextjs";
import ClientLayout from "./(main)/_components/ClientRootLayout";
import "./globals.css";
import JQueryScripts from "./(main)/_components/Scripts";
import "../../sentry.client.config";

export const metadata: Metadata = {
  title: "모두의 웨이터",
  description: "모두의 웨이터",
  icons: {
    icon: "/logo/logo.svg",
  },
};

const hakgyo = localFont({
  src: [
    {
      path: "../../public/fonts/HakgyoansimDunggeunmiso-B.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-hakgyo",
  display: "swap",
});

const pretendard = localFont({
  src: [
    {
      path: "../../public/fonts/Pretendard-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/Pretendard-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/Pretendard-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/Pretendard-Regular.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-pretendard",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${hakgyo.variable} ${pretendard.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />

        {/* Apple Touch Icon for iOS */}
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        {/* Manifest icons for Android */}
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/icon-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="512x512"
          href="/icon-512x512.png"
        />
        <link rel="preconnect" href={process.env.NEXT_PUBLIC_API_BASE_URL} />
      </head>

      <body>
        <ClientLayout>
          <JQueryScripts />
          <Sentry.ErrorBoundary>
            <main className="min-h-dvh select-none">{children}</main>
          </Sentry.ErrorBoundary>
        </ClientLayout>
      </body>
    </html>
  );
}
