export interface MenuItem {
  icon: string;
  label: string;
  href: string;
}

// 권한별 메뉴 구성
const MENU_ITEMS: Record<AccountPermission, MenuItem[]> = {
  ADMIN: [
    // { icon: "home", label: "HOME", href: "/admin" },
    { icon: "people", label: "회원 관리", href: "/admin/users" },
    { icon: "check-square", label: "매장 등록 승인", href: "/admin/stores" },
  ],
  OWNER: [
    { icon: "home", label: "HOME", href: "/" },
    { icon: "shop", label: "매장 정보", href: "/store" },
    { icon: "category", label: "메뉴 관리", href: "/menu" },
    { icon: "mobile", label: "기기 관리", href: "/device" },
    // { icon: "subscribe", label: "구독 설정", href: "/subscription" },
    { icon: "settings", label: "설정", href: "/settings" },
  ],
  USER: [{ icon: "home", label: "HOME", href: "/" }],
};

export default MENU_ITEMS;
