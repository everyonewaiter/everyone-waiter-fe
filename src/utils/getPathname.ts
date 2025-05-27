import MENU_ITEMS from "@/constants/sidebarMenus";

export function getComparePath(pathname: string, permission: Permission) {
  if (permission === "OWNER") {
    return `/${pathname.split("/").slice(2).join("/")}`;
  }
  return pathname;
}
export function getMenuLabel(pathname: string, permission: Permission) {
  const comparePath = getComparePath(pathname, permission);
  return MENU_ITEMS[permission].find((item) => item.href === comparePath)
    ?.label;
}
