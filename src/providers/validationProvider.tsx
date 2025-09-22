"use client";

import { createContext, PropsWithChildren, useContext, useMemo } from "react";

const ValidationContext = createContext({ valid: false });
export const useValidation = () => useContext(ValidationContext);

export function ValidationProvider({
  valid,
  children,
}: PropsWithChildren<{ valid: boolean }>) {
  const value = useMemo(() => ({ valid }), [valid]);

  return (
    <ValidationContext.Provider value={value}>
      {children}
    </ValidationContext.Provider>
  );
}
