const transformPhoneNumber = (phoneNumber: string) => {
  const first = phoneNumber.slice(0, 3);
  const res = phoneNumber.slice(3);
  if (res.length === 7) {
    return `${first}-${res.slice(0, 3)}-${res.slice(3)}`;
  }
  if (res.length === 8) {
    return `${first}-${res.slice(0, 4)}-${res.slice(4)}`;
  }
  return "";
};

export default transformPhoneNumber;
