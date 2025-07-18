"use client";

import { createContext, useContext, useMemo } from "react";

interface ContextType {
  now: Date;
  year: number;
  month: number;
  formattedMonth: (month: number) => string;
  date: number;
  formattedDate: (date: number) => string;
}

export const NowContext = createContext<ContextType | null>(null);

export const useNowContext = () => {
  const context = useContext(NowContext);
  if (!context) throw new Error("NowContext not found");
  return context;
};

export function NowProvider({ children }: { children: React.ReactNode }) {
  const value = useMemo(() => {
    const now = new Date();
    return {
      now,
      year: now.getFullYear(),
      month: now.getMonth() + 1,
      formattedMonth: (month: number) => String(month).padStart(2, "0"),
      date: now.getDate(),
      formattedDate: (date: number) => String(date).padStart(2, "0"),
    };
  }, []);

  return <NowContext.Provider value={value}>{children}</NowContext.Provider>;
}
