export function getCdn(path: string): string {
  const baseUrl =
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_PROD_CDN
      : process.env.NEXT_PUBLIC_DEV_CDN;

  if (!baseUrl) return path;

  if (path.startsWith("http")) return path;

  return `${baseUrl}/${path}`;
}

export function getCdnFallbackPath(path: string): string {
  const baseUrl =
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_PROD_CDN
      : process.env.NEXT_PUBLIC_DEV_CDN;

  if (!baseUrl) return path;

  if (path.startsWith("http")) return path;

  if (path.includes("/p/")) {
    return `${baseUrl}/${path.replace("/p/", "/d/")}`;
  }
  if (path.includes("/d/")) {
    return `${baseUrl}/${path.replace("/d/", "/p/")}`;
  }

  return `${baseUrl}/${path}`;
}
