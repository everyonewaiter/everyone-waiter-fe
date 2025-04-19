import HomeIcon from "@public/icons/home-04.svg";
import ShopIcon from "@public/icons/shop.svg";
import CategoryIcon from "@public/icons/category-2.svg";
import Subscribeicon from "@public/icons/subscribe.svg";
import SettingIcon from "@public/icons/settings.svg";
import PosIcon from "@public/icons/pos.svg";
import PeopleIcon from "@public/icons/people.svg";
import CheckIcon from "@public/icons/check-square-broken.svg";
import MobileIcon from "@public/icons/mobile.svg";
import WriteIcon from "@public/icons/write.svg";

export const FIRST_ACCESS_MENU = [
  {
    icon: ShopIcon,
    text: "매장 등록",
    url: "/store/create",
  },
  {
    icon: Subscribeicon,
    text: "구독 설정",
    url: "/subscription",
  },
];

export const USER_MENU = [
  {
    icon: HomeIcon,
    text: "HOME",
    url: "/stores",
  },
  {
    icon: ShopIcon,
    text: "매장 정보",
    url: "/store/info",
  },
  {
    icon: CategoryIcon,
    text: "메뉴 관리",
    url: "/menu",
  },
  {
    icon: Subscribeicon,
    text: "구독 설정",
    url: "/subscription",
  },
  {
    icon: PosIcon,
    text: "POS",
    url: "/pos",
  },
  {
    icon: SettingIcon,
    text: "설정",
    url: "/settings",
  },
];

export const ADMIN_MENU = [
  {
    icon: HomeIcon,
    text: "HOME",
    url: "/",
  },
  {
    icon: PeopleIcon,
    text: "회원 관리",
    url: "/members",
  },
  {
    icon: ShopIcon,
    text: "매장 관리",
    url: "/store/manage",
  },
  {
    icon: CheckIcon,
    text: "메뉴 등록 승인",
    url: "/menu/approval",
  },
  {
    icon: MobileIcon,
    text: "구독 관리",
    url: "/subscription/manage",
  },
  {
    icon: WriteIcon,
    text: "게시글 관리",
    url: "/posts",
  },
  {
    icon: SettingIcon,
    text: "설정",
    url: "/settings",
  },
];
