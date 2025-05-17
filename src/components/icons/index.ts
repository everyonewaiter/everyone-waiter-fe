import HomeIcon from "@public/icons/home-04.svg";
import ShopIcon from "@public/icons/shop.svg";
import MenuIcon from "@public/icons/category-2.svg";
import Subscribeicon from "@public/icons/subscribe.svg";
import SettingIcon from "@public/icons/settings.svg";
import PosIcon from "@public/icons/pos.svg";
import PeopleIcon from "@public/icons/people.svg";
import CheckIcon from "@public/icons/check-square-broken.svg";
import MobileIcon from "@public/icons/mobile.svg";
import WriteIcon from "@public/icons/write.svg";
import TrashIcon from "@public/icons/trash-02.svg";

const ICON_MAP = {
  home: HomeIcon,
  shop: ShopIcon,
  menu: MenuIcon,
  subscribe: Subscribeicon,
  setting: SettingIcon,
  pos: PosIcon,
  people: PeopleIcon,
  check: CheckIcon,
  mobile: MobileIcon,
  write: WriteIcon,
  trash: TrashIcon,
} as const;

export default ICON_MAP;
