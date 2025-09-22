import { week } from "@/constants/week";

const useGetDate = (dateInput: string | Date) => {
  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;

  const yyyy = date.getFullYear();
  const day = week[date.getDay()];
  const hh = String(date.getHours()).padStart(2, "0");
  const mi = String(date.getMinutes()).padStart(2, "0");

  return {
    year: yyyy,
    month: date.getMonth() + 1,
    formattedMonth: (d: Date) => String(d.getMonth() + 1).padStart(2, "0"),
    date: date.getDate(),
    formattedDate: (d: Date) => String(d.getDate()).padStart(2, "0"),
    day,
    hour: hh,
    minute: mi,
    fullDate: `${yyyy}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(
      date.getDate()
    ).padStart(2, "0")}`,
    fullTime: `${hh}:${mi}`,
  };
};

export default useGetDate;
