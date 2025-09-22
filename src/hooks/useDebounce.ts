import { useEffect, useState } from "react";

interface IProps {
  searchWord: string;
  delay: number;
}

export default function useDebounce({ searchWord, delay }: IProps) {
  const [debouncedValue, setDebouncedValue] = useState(searchWord);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(searchWord);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [searchWord, delay]);

  return {
    debouncedValue,
  };
}
