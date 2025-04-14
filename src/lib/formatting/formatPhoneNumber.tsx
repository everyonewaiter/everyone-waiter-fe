const phoneNumberPattern = (value: string) => {
  let formatted = value;

  if (value.startsWith("02")) {
    // 서울 번호
    if (value.length > 2 && value.length <= 5) {
      formatted = `${value.slice(0, 2)}-${value.slice(2)}`;
    } else if (value.length > 5 && value.length <= 9) {
      formatted = `${value.slice(0, 2)}-${value.slice(2, 5)}-${value.slice(5)}`;
    } else if (value.length > 9) {
      formatted = `${value.slice(0, 2)}-${value.slice(2, 6)}-${value.slice(6, 10)}`;
    }
  }
  if (value.length >= 10) {
    // 휴대폰 번호
    if (value.length <= 10) {
      formatted = `${value.slice(0, 3)}-${value.slice(3, 6)}-${value.slice(6)}`;
    } else {
      formatted = `${value.slice(0, 3)}-${value.slice(3, 7)}-${value.slice(7, 11)}`;
    }
  } else if (value.length > 3 && value.length <= 9) {
    // 지역 번호
    formatted = `${value.slice(0, 3)}-${value.slice(3, 6)}-${value.slice(6)}`;
  } else {
    // 기본 포맷팅
    formatted =
      value.length > 3 ? `${value.slice(0, 3)}-${value.slice(3)}` : value;
  }

  return formatted;
};

export default phoneNumberPattern;
