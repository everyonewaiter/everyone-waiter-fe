/**
 * 전화번호를 3-4-4 형식으로 포맷팅합니다.
 * @param phoneNumber - 포맷팅할 전화번호 (숫자만 포함된 문자열)
 * @returns 3-4-4 형식으로 포맷팅된 전화번호
 */
export const formatPhoneNumber = (phoneNumber: string): string => {
  // 숫자가 아닌 문자 제거
  const cleaned = phoneNumber.replace(/\D/g, "");

  // 11자리 미만이면 원본 반환
  if (cleaned.length < 11) {
    return phoneNumber;
  }

  // 3-4-4 형식으로 포맷팅
  const match = cleaned.match(/^(\d{3})(\d{4})(\d{4})$/);
  if (match) {
    return `${match[1]}-${match[2]}-${match[3]}`;
  }

  return phoneNumber;
};

/**
 * 전화번호에서 하이픈을 제거합니다.
 * @param phoneNumber - 하이픈이 포함된 전화번호
 * @returns 하이픈이 제거된 전화번호
 */
export const removePhoneNumberFormat = (phoneNumber: string): string =>
  phoneNumber.replace(/-/g, "");
