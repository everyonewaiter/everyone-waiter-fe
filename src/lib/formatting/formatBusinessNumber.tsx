const formatBusinessNumber = (value: string) => {
  const onlyNums = value.replace(/[^0-9]/g, "");

  if (onlyNums.length > 5) {
    return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3, 5)}-${onlyNums.slice(5, 10)}`;
  }

  return onlyNums;
};

export default formatBusinessNumber;
