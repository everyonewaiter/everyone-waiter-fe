import { useEffect, useState } from "react";
import useCategories from "../_queries/useCategories";

export function useActiveCategory(storeId: string) {
  const { categories } = useCategories(storeId);
  const { data } = categories(storeId);

  const [active, setActive] = useState(data?.categories?.[0]?.categoryId ?? "");

  useEffect(() => {
    if (data?.categories && data?.categories.length > 0 && !active) {
      setActive(data?.categories[0].categoryId ?? "");
    }
  }, [active, data?.categories]);

  return { active, setActive, categories: data?.categories };
}
