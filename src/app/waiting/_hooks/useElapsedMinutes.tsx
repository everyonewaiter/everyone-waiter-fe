import { useEffect, useState } from "react";

export default function useElapsedMinutes(dateString: string | Date | null) {
  const [elapsedMinutes, setElapsedMinutes] = useState(0);

  useEffect(() => {
    if (!dateString) return undefined;

    const calculateElapsedTime = () => {
      try {
        const createdDate =
          typeof dateString === "string" ? new Date(dateString) : dateString;
        const now = new Date();

        if (Number.isNaN(createdDate.getTime())) {
          setElapsedMinutes(0);
          return;
        }

        const diffInMilliseconds = now.getTime() - createdDate.getTime();
        const minutes = Math.floor(diffInMilliseconds / (1000 * 60));
        setElapsedMinutes(minutes);
      } catch (error) {
        setElapsedMinutes(0);
      }
    };

    calculateElapsedTime();
    const intervalId = setInterval(calculateElapsedTime, 60000);

    return () => {
      clearInterval(intervalId);
    };
  }, [dateString]);

  return elapsedMinutes;
}
