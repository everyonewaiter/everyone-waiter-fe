import { week } from "@/constants/week";

const useGetDate = (date: Date) => {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  const day = week[date.getDay()];
  const hh = String(date.getHours()).padStart(2, "0");
  const mi = String(date.getMinutes()).padStart(2, "0");

  return {
    date: { year: yyyy, month: mm, date: dd },
    fullDate: `${yyyy}.${mm}.${dd}`,
    day,
    time: `${hh}:${mi}`,
  };
};

export default useGetDate;
