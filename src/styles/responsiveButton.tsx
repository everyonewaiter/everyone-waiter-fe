/* eslint-disable import/prefer-default-export */
export const buttonSize = (
  screenSize: "sm" | "md" | "lg" | null,
  size: "sm" | "md" | "lg" | "xl"
) => {
  const Size = {
    sm: "px-[16px] h-[36px] rounded-[8px] text-s font-medium",
    md: "px-[24px] h-[44px] rounded-[8px] text-sm font-medium",
    lg: "px-[24px] h-[48px] rounded-[12px] text-[15px] font-semibold",
    xl: "px-[32px] h-[56px] rounded-[12px] !text-base !font-semibold",
  };

  return Size[size]
    .split(" ")
    .map((cls) => (screenSize ? `${screenSize}:${cls}` : cls))
    .join(" ");
};
