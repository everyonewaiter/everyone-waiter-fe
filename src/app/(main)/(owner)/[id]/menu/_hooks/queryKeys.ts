const menuKeys = {
  all: (storeId: string) => ["menus", storeId] as const,
  category: (storeId: string, categoryId: string) =>
    ["menus", storeId, categoryId] as const,
  menu: (storeId: string, menuId: string) =>
    ["menus", storeId, menuId] as const,
  menuInCategory: (storeId: string, categoryId: string, menuId: string) =>
    ["menus", storeId, categoryId, menuId] as const,
};

export default menuKeys;
