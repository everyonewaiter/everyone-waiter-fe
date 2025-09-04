import { isInitialValue } from "./isInitialValue";

export const getFormattedLastCallTime = (
  currentTime: Date,
  lastCallTime: string,
  type: "whole" | "minutes"
) => {
  if (!lastCallTime || isInitialValue(lastCallTime)) return "";

  const date = new Date(lastCallTime);
  const diffMs = currentTime.getTime() - date.getTime();
  const diffMinutes = Math.floor(diffMs / (1000 * 60));

  if (diffMinutes < 60) {
    return `${diffMinutes + 1}분`;
  }

  if (type === "whole") {
    const hours = Math.floor(diffMinutes / 60);
    const minutes = (diffMinutes % 60) + 1;
    return `${hours}시간 ${minutes.toString().padStart(2, "0")}분`;
  }

  return `${diffMinutes + 1}분`;
};
