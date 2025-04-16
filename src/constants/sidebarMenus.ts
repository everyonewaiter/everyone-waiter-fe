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

const USER_MENU = [
  {
    icon: HomeIcon,
    text: "HOME",
  },
  {
    icon: ShopIcon,
    text: "매장 정보",
  },
  {
    icon: CategoryIcon,
    text: "메뉴 관리",
  },
  {
    icon: Subscribeicon,
    text: "구독 설정",
  },
  {
    icon: PosIcon,
    text: "POS",
  },
  {
    icon: SettingIcon,
    text: "설정",
  },
];

const ADMIN_MENU = [
  {
    icon: HomeIcon,
    text: "HOME",
  },
  {
    icon: PeopleIcon,
    text: "회원 관리",
  },
  {
    icon: ShopIcon,
    text: "매장 관리",
  },
  {
    icon: CheckIcon,
    text: "메뉴 등록 승인",
  },
  {
    icon: MobileIcon,
    text: "구독 관리",
  },
  {
    icon: WriteIcon,
    text: "게시글 관리",
  },
  {
    icon: SettingIcon,
    text: "설정",
  },
];

export { USER_MENU, ADMIN_MENU };
