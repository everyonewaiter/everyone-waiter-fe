import ICON_MAP from "@/components/icons";

export const USER_MENU: Menu[] = [
  {
    icon: "home",
    text: "HOME",
    url: "/stores",
  },
  {
    icon: "shop",
    text: "매장 정보",
    url: "/store/info",
  },
  {
    icon: "category",
    text: "메뉴 관리",
    url: "/menu",
  },
  {
    icon: "mobile",
    text: "기기 관리",
    url: "/device",
  },
  {
    icon: "subscribe",
    text: "구독 설정",
    url: "/subscription",
  },
  {
    icon: "pos",
    text: "POS",
    url: "/pos",
  },
  {
    icon: "setting",
    text: "설정",
    url: "/settings",
  },
];

export const ADMIN_MENU: Menu[] = [
  {
    icon: "home",
    text: "HOME",
    url: "/",
  },
  {
    icon: "people",
    text: "회원 관리",
    url: "/admin/users",
  },
  {
    icon: "shop",
    text: "매장 관리",
    url: "/admin/stores",
  },
  {
    icon: "check",
    text: "매장 등록 승인",
    url: "/admin/stores/approval",
  },
  {
    icon: "mobile",
    text: "구독 관리",
    url: "/admin/subscription",
  },
  {
    icon: "write",
    text: "게시글 관리",
    url: "/admin/posts",
  },
  {
    icon: "setting",
    text: "설정",
    url: "/admin/settings",
  },
];

type IconKey = keyof typeof ICON_MAP;

interface MenuItem {
  icon: IconKey;
  label: string;
  href: string;
}

// 권한별 메뉴 구성
export const MENU_ITEMS: Record<Permission, MenuItem[]> = {
  ADMIN: [
    { icon: "home", label: "홈", href: "/" },
    { icon: "people", label: "회원 관리", href: "/admin/users" },
    { icon: "shop", label: "매장 관리", href: "/admin/stores" },
    { icon: "check", label: "매장 등록 승인", href: "/admin/approvals" },
    { icon: "subscribe", label: "구독 관리", href: "/admin/subscriptions" },
    { icon: "write", label: "게시글 관리", href: "/admin/posts" },
  ],
  OWNER: [
    { icon: "home", label: "홈", href: "/" },
    { icon: "shop", label: "매장 정보", href: "/store" },
    { icon: "menu", label: "메뉴 관리", href: "/menu" },
    { icon: "subscribe", label: "구독 설정", href: "/subscription" },
    { icon: "pos", label: "POS", href: "/pos" },
    { icon: "setting", label: "설정", href: "/settings" },
  ],
  USER: [{ icon: "home", label: "홈", href: "/" }],
};
