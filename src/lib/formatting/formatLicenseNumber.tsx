const formatLicenseNumber = (value: string): string => {
  const d = value.replace(/\D/g, "").slice(0, 10);
  if (!d) return "";

  if (d.length <= 3) return d;
  if (d.length <= 5) return `${d.slice(0, 3)}-${d.slice(3)}`;
  return `${d.slice(0, 3)}-${d.slice(3, 5)}-${d.slice(5)}`;
};

export default formatLicenseNumber;
