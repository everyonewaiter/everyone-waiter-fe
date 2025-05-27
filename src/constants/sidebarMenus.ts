interface MenuItem {
  icon: string;
  label: string;
  href: string;
}

// 권한별 메뉴 구성
const MENU_ITEMS: Record<Permission, MenuItem[]> = {
  ADMIN: [
    { icon: "home", label: "HOME", href: "/" },
    { icon: "people", label: "회원 관리", href: "/admin/users" },
    { icon: "shop", label: "매장 관리", href: "/admin/stores" },
    { icon: "check", label: "매장 등록 승인", href: "/admin/approvals" },
    { icon: "subscribe", label: "구독 관리", href: "/admin/subscriptions" },
    { icon: "write", label: "게시글 관리", href: "/admin/posts" },
  ],
  OWNER: [
    { icon: "home", label: "HOME", href: "/" },
    { icon: "shop", label: "매장 정보", href: "/store" },
    { icon: "menu", label: "메뉴 관리", href: "/menu" },
    { icon: "subscribe", label: "구독 설정", href: "/subscription" },
    { icon: "pos", label: "POS", href: "/pos" },
    { icon: "setting", label: "설정", href: "/settings" },
  ],
  USER: [{ icon: "home", label: "HOME", href: "/" }],
};

export default MENU_ITEMS;
