import SidebarIcon from "@/components/common/Icon/SidebarIcon";
import Loading from "@/components/Loading";
import MENU_ITEMS from "@/constants/sidebarMenus";
import { getComparePath } from "@/utils/getPathname";
import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";

interface IProps {
  selectedStoreId: string;
  permission: AccountPermission;
}

export default function SidebarMenu({ selectedStoreId, permission }: IProps) {
  const navigate = useRouter();
  const pathname = usePathname();

  const [isPending, startTransition] = useTransition();

  const comparePath = getComparePath(pathname, permission);

  const menu = MENU_ITEMS[permission];

  const handleMenuClick = (href: string) => {
    if (href === comparePath) return;
    const targetPath =
      permission === "OWNER" ? `/${selectedStoreId}${href}` : href;

    startTransition(() => {
      if (permission === "OWNER" && href === "/") {
        navigate.push(`/${selectedStoreId}`);
      } else {
        navigate.push(targetPath);
      }
    });
  };

  const handlePrefetchURL = (href: string) => {
    if (permission === "OWNER") {
      navigate.prefetch(`/${selectedStoreId}${href}`);
    } else {
      navigate.prefetch(href);
    }
  };

  const isActive = (href: string) => {
    if (href === "/") return comparePath === "/";
    return comparePath === href || comparePath.startsWith(`${href}/`);
  };

  return (
    <div className="relative mt-2">
      {isPending && <Loading />}
      {menu?.length > 1 && (
        <div className="absolute top-[18px] bottom-[18px] left-[11px] w-[2px] bg-gray-600" />
      )}
      <ul>
        {menu?.map((item) => (
          <li key={item.href}>
            <button
              type="button"
              onClick={() => handleMenuClick(item.href)}
              onMouseEnter={() => handlePrefetchURL(item.href)}
              className={`flex items-center gap-3 px-2 py-[9px] text-[13px] transition-colors lg:text-[16px] ${
                isActive(item.href) ? "text-primary" : "text-gray-300"
              }`}
            >
              <div
                className={`z-1 size-2 rounded-full ${
                  isActive(item.href) ? "bg-primary" : "bg-gray-600"
                }`}
              />
              <SidebarIcon
                iconKey={item.icon as string}
                className={`size-6 shrink-0 ${isActive(item.href) ? "text-primary" : "text-gray-300"}`}
                style={{ minWidth: "24px", minHeight: "24px" }}
              />
              <span className="font-medium">{item.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
