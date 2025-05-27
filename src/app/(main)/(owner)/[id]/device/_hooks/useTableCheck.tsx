import { useState } from "react";

export default function useTableCheck<T>(list: T[], keyField: keyof T) {
  const [checkedItems, setCheckedItems] = useState<Record<string, T>>({});

  const allChecked =
    list?.length > 0 &&
    list?.every((item) => String(item[keyField]) in checkedItems);

  const handleCheckAll = (checked: boolean) => {
    if (checked) {
      const newChecked = list?.reduce(
        (acc, item) => {
          acc[String(item[keyField])] = item;
          return acc;
        },
        {} as Record<string, T>
      );
      setCheckedItems(newChecked);
    } else {
      setCheckedItems({});
    }
  };

  const handleCheckItem = (item: T, checked: boolean) => {
    setCheckedItems((prev) => {
      const newItems = { ...prev };
      if (checked) newItems[String(item[keyField])] = item;
      else delete newItems[String(item[keyField])];
      return newItems;
    });
  };

  return {
    checkedItems,
    allChecked,
    handleCheckAll,
    handleCheckItem,
  };
}
