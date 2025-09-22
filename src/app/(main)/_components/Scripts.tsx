"use client";

import Script from "next/script";

export default function JQueryScripts() {
  return (
    <>
      <Script src="/scripts/jquery-1.10.1.min.js" strategy="afterInteractive" />
      <Script src="/scripts/bxlcommon.js" strategy="afterInteractive" />
      <Script src="/scripts/bxlpos.js" strategy="afterInteractive" />
      <Script src="/scripts/bxllabel.js" strategy="afterInteractive" />

      {/* ✅ Google Analytics Script */}
      {process.env.NODE_ENV === "production" && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
            `}
          </Script>
        </>
      )}
    </>
  );
}
