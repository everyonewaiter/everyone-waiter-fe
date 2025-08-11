const phoneNumberPattern = (value: string): string => {
  const d = value.replace(/\D/g, "");
  if (!d) return "";

  // 02: 02-4-4
  if (d.startsWith("02")) {
    if (d.length <= 2) return d;
    const head = d.slice(0, 2);
    const rest = d.slice(2, 10);
    if (rest.length <= 4) return `${head}-${rest}`;
    return `${head}-${rest.slice(0, 4)}-${rest.slice(4)}`;
  }

  // 01X: 01X-4-4
  if (d.startsWith("01")) {
    if (d.length <= 3) return d;
    const head = d.slice(0, 3);
    const rest = d.slice(3, 11);
    if (rest.length <= 4) return `${head}-${rest}`;
    return `${head}-${rest.slice(0, 4)}-${rest.slice(4)}`;
  }

  // 0XX: 지역번호 3-3-4
  if (d.startsWith("0")) {
    if (d.length <= 3) return d;
    const head = d.slice(0, 3);
    const rest = d.slice(3, 10);
    if (rest.length <= 3) return `${head}-${rest}`;
    return `${head}-${rest.slice(0, 3)}-${rest.slice(3)}`;
  }

  // 기타: 3-3-4
  if (d.length <= 3) return d;
  const head = d.slice(0, 3);
  const rest = d.slice(3, 10);
  if (rest.length <= 3) return `${head}-${rest}`;
  return `${head}-${rest.slice(0, 3)}-${rest.slice(3)}`;
};

export default phoneNumberPattern;
