export const isInitialValue = (dateString: string): boolean => {
  const date = new Date(dateString);
  const initialDate = new Date("1970-01-01");
  return date.getTime() === initialDate.getTime();
};
