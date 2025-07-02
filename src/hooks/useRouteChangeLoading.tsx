"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export default function useRouteChangeLoading(
  setLoading: (v: boolean) => void
) {
  const pathname = usePathname();
  const previousPath = useRef(pathname);

  useEffect(() => {
    if (previousPath.current !== pathname) {
      setLoading(true);
      // 너무 짧게 보여주지 않도록 100ms~300ms 정도 딜레이 후 false
      const timeout = setTimeout(() => {
        setLoading(false);
        previousPath.current = pathname;
      }, 300);

      return () => clearTimeout(timeout);
    }
    return undefined;
  }, [pathname, setLoading]);
}
