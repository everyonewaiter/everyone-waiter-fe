const transformDate = (value: string) => {
  const [date, time] = value.split(" ");
  return [date.slice(2), time.slice(0, 5)].join(" ");
};

export default transformDate;
