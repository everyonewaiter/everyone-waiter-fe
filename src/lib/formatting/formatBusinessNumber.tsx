const formatBusinessNumber = (value: string) => {
  let formatted = value;

  if (formatted.length > 5) {
    formatted = `${formatted.slice(0, 3)}-${formatted.slice(3, 5)}-${formatted.slice(5, 10)}`;
  }

  return formatted;
};

export default formatBusinessNumber;
