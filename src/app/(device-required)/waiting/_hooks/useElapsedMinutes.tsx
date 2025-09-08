import { isNumber } from "@/utils/validate";
import { useEffect, useState } from "react";

export default function useElapsedTime(dateString: string | Date | null) {
  const [elapsedTime, setElapsedTime] = useState("00:00:00");

  useEffect(() => {
    if (!dateString) return;

    const createdDate =
      typeof dateString === "string" ? new Date(dateString) : dateString;

    if (!isNumber(createdDate.getTime())) {
      setElapsedTime("00:00:00");
      return;
    }

    const calculateElapsedTime = () => {
      const now = new Date();
      const diff = now.getTime() - createdDate.getTime();

      const totalSeconds = Math.floor(diff / 1000);
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      const formatted = [
        hours.toString().padStart(2, "0"),
        minutes.toString().padStart(2, "0"),
        seconds.toString().padStart(2, "0"),
      ].join(":");

      setElapsedTime(formatted);
    };

    calculateElapsedTime();
    const intervalId = setInterval(calculateElapsedTime, 1000);

    // eslint-disable-next-line consistent-return
    return () => {
      clearInterval(intervalId);
    };
  }, [dateString]);

  return elapsedTime;
}
