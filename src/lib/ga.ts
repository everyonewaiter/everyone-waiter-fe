export const pageview = (url: string) => {
  (window as any).gtag("config", process.env.NEXT_PUBLIC_GA_ID, {
    page_path: url,
  });
};
