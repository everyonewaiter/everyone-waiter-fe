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
    formattedMonth: String(date.getMonth() + 1).padStart(2, "0"),
    date: date.getDate(),
    formattedDate: String(date.getDate()).padStart(2, "0"),
    day,
    hour: hh,
    minute: mi,
    fullDate: date.toISOString().split("T")[0].split("-").join("."),
    fullTime: date.toISOString().split("T")[1].slice(0, 5),
  };
};

export default useGetDate;
