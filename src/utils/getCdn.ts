export function getCdn(path: string): string {
  const baseUrl =
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_PROD_CDN
      : process.env.NEXT_PUBLIC_DEV_CDN;

  if (!baseUrl) return path;

  if (path.startsWith("http")) return path;

  const hasEnvPath = baseUrl.endsWith("/p") || baseUrl.endsWith("/d");

  if (hasEnvPath) {
    if (path.startsWith("p/") || path.startsWith("d/")) {
      return `${baseUrl}/${path}`;
    }
    return `${baseUrl}/${path}`;
  }

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
  const devCdn = process.env.NEXT_PUBLIC_DEV_CDN;
  if (devCdn) {
    return `${devCdn}/${path}`;
  }

  return path;
}
