export const pageview = (url: string) => {
  if (typeof (window as any).gtag !== "function") return;
  (window as any).gtag("config", process.env.NEXT_PUBLIC_GA_ID!, {
    page_path: url,
  });
};
