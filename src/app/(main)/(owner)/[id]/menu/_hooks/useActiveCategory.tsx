import { useEffect, useState } from "react";
import useCategories from "../_queries/useCategories";

export function useActiveCategory(storeId: string) {
  const { query } = useCategories(storeId);
  const categories = query.data?.categories;

  const [active, setActive] = useState(categories?.[0]?.categoryId ?? "");

  useEffect(() => {
    if (categories && categories.length > 0 && !active) {
      setActive(categories[0].categoryId);
    }
  }, [categories, active]);

  return { active, setActive, categories };
}
