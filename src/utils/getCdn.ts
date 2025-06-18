export default function getCdn(image?: string) {
  const {
    NODE_ENV,
    NEXT_PUBLIC_PROD_CDN: PROD,
    NEXT_PUBLIC_DEV_CDN: DEV,
  } = process.env;

  if (!image) return "";

  const baseUrl = NODE_ENV === "production" ? PROD : DEV;
  if (!baseUrl) return "";

  return `${baseUrl}/${image}`;
}
