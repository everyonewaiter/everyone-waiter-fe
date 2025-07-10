"use client";

import { createContext, useContext } from "react";

export const NowContext = createContext<string | null>(null);

export const useNowContext = () => {
  const context = useContext(NowContext);
  if (!context) throw new Error("NowContext not found");
  return context;
};
