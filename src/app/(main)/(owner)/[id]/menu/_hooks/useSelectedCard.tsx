import { useCallback, useState } from "react";

export default function useSelectedCard<T extends { menuId: string }>() {
  const [selectedCards, setSelectedCards] = useState<T[]>([]);

  const isSelected = useCallback(
    (item: T) => selectedCards.some((card) => card.menuId === item.menuId),
    [selectedCards]
  );

  const toggle = useCallback((item: T) => {
    setSelectedCards((prev) => {
      const exists = prev.some((el) => el.menuId === item.menuId);
      if (exists) {
        return prev.filter((el) => el.menuId !== item.menuId);
      }
      return [...prev, item];
    });
  }, []);

  const sort = useCallback((items: T[]) => setSelectedCards(items), []);

  return { selectedCards, isSelected, toggle, sort };
}
