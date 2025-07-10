"use client";

import Script from "next/script";

export default function JQueryScripts() {
  return (
    <>
      <Script src="/scripts/jquery-1.10.1.min.js" strategy="afterInteractive" />
      <Script src="/scripts/bxlcommon.js" strategy="afterInteractive" />
      <Script src="/scripts/bxlpos.js" strategy="afterInteractive" />
      <Script src="/scripts/bxllabel.js" strategy="afterInteractive" />
    </>
  );
}
