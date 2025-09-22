import { useEffect, useState } from "react";
import { categoryQueries } from "../_queries/useCategories";

export function useActiveCategory(storeId: string) {
  const { data } = categoryQueries.useCategories(storeId);

  const [active, setActive] = useState("전체");

  useEffect(() => {
    if (data?.categories && data?.categories?.length > 0 && !active) {
      setActive(data?.categories[0].categoryId ?? "");
    }
  }, [active, data?.categories]);

  return { active, setActive, categories: data?.categories };
}
