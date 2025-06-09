const getCdn = (path: string) => {
  const baseUrl =
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_PROD_CDN
      : process.env.NEXT_PUBLIC_DEV_CDN;

  return `${baseUrl}/${path}`;
};

export default getCdn;
