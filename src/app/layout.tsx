import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import ClientLayout from "./(main)/_components/ClientRootLayout";
import "./globals.css";
import JQueryScripts from "./(main)/_components/Scripts";

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
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="preload"
          as="image"
          href="/logo/logo-with-text.svg"
          type="image/svg+xml"
        />

        {/* Apple Touch Icon for iOS */}
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        {/* Favicon (fallback) */}
        <link rel="icon" href="/favicon.ico" sizes="any" />

        {/* Manifest icons for Android & PWA */}
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

        {/* Font */}
        <link
          rel="preload"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/dynamic-subset-variable.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/dynamic-subset-variable.css"
          rel="stylesheet"
        />
      </head>

      <body>
        <ClientLayout>
          <JQueryScripts />
          <main className="min-h-screen min-w-screen select-none">
            {children}
          </main>
          <GoogleAnalytics gaId={String(process.env.NEXT_PUBLIC_GA_ID)} />
        </ClientLayout>
      </body>
    </html>
  );
}
