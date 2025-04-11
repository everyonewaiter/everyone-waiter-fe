const formatDate = (value: string) => {
  let formatted = value;

  if (formatted.length > 6) {
    formatted = `${formatted.slice(0, 4)}-${formatted.slice(4, 6)}-${formatted.slice(6, 8)}`;
  }

  return formatted;
};

export default formatDate;
