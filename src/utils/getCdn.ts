export function getCdn(path: string): string {
  const baseUrl =
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_PROD_CDN
      : process.env.NEXT_PUBLIC_DEV_CDN;

  if (!baseUrl) return path;

  if (path.startsWith("http")) return path;

  if (
    process.env.NODE_ENV === "production" &&
    !path.includes("/d/") &&
    !path.includes("/p/")
  ) {
    return `${baseUrl}/d/${path}`;
  }

  return `${baseUrl}/${path}`;
}

export function getCdnFallbackPath(path: string): string {
  const baseUrl =
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_PROD_CDN
      : process.env.NEXT_PUBLIC_DEV_CDN;

  if (!baseUrl) return path;

  if (path.startsWith("http")) {
    // CDN URL에서 d/와 p/ 경로 전환
    if (path.includes("/d/")) {
      return path.replace("/d/", "/p/");
    }
    if (path.includes("/p/")) {
      return path.replace("/p/", "/d/");
    }
    return path;
  }

  if (path.includes("/p/")) {
    return `${baseUrl}/${path.replace("/p/", "/d/")}`;
  }
  if (path.includes("/d/")) {
    return `${baseUrl}/${path.replace("/p/", "/d/")}`;
  }

  return `${baseUrl}/d/${path}`;
}
