const phoneNumberPattern = (value: string) => {
  let formatted = value;

  if (value.startsWith("02")) {
    // 서울 번호: 02-xxxx-xxxx or 02-xxx-xxxx
    if (value.length > 2 && value.length <= 5) {
      formatted = `${value.slice(0, 2)}-${value.slice(2)}`;
    } else if (value.length > 5 && value.length <= 9) {
      formatted = `${value.slice(0, 2)}-${value.slice(2, 5)}-${value.slice(5)}`;
    } else if (value.length > 9) {
      formatted = `${value.slice(0, 2)}-${value.slice(2, 6)}-${value.slice(6, 10)}`;
    }
  } else if (value.startsWith("1")) {
    // 대표번호나 공공번호: 15xx, 16xx, 18xx, 110, 120 등
    if (value.length <= 3) {
      formatted = value;
    } else if (value.length <= 7) {
      formatted = `${value.slice(0, 3)}-${value.slice(3)}`;
    } else {
      formatted = `${value.slice(0, 4)}-${value.slice(4, 8)}`;
    }
  } else if (value.length >= 10) {
    // 휴대폰/일반 유선 번호: 010/031/042 등
    if (value.length <= 10) {
      formatted = `${value.slice(0, 3)}-${value.slice(3, 6)}-${value.slice(6)}`;
    } else {
      formatted = `${value.slice(0, 3)}-${value.slice(3, 7)}-${value.slice(7, 11)}`;
    }
  } else if (value.length > 3 && value.length <= 9) {
    // 031 같은 지역번호 + 짧은 번호
    formatted = `${value.slice(0, 3)}-${value.slice(3, 6)}-${value.slice(6)}`;
  }

  return formatted;
};

export default phoneNumberPattern;
