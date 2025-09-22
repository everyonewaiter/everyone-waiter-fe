import MENU_ITEMS from "@/constants/sidebarMenus";

export function getPathnameWithoutStoreId(pathname: string) {
  return `/${pathname.split("/").slice(2).join("/")}`;
}

export function getComparePath(
  pathname: string,
  permission: AccountPermission
) {
  if (permission === "OWNER") {
    return `/${pathname.split("/").slice(2).join("/")}`;
  }
  if (permission === "ADMIN") {
    return `/${pathname.split("/").slice(1).join("/")}`;
  }
  return pathname;
}
export function getMenuLabel(pathname: string, permission: AccountPermission) {
  const comparePath = getComparePath(pathname, permission);
  return MENU_ITEMS[permission].find((item) => item.href === comparePath)
    ?.label;
}
