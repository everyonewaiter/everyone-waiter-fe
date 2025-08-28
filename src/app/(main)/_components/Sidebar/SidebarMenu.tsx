import Loading from "@/components/Loading";
import MENU_ITEMS from "@/constants/sidebarMenus";
import { getComparePath } from "@/utils/getPathname";
import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";
import SidebarMenuItem from "../SidebarMenuItem";

interface IProps {
  selectedStoreId: string;
  permission: AccountPermission;
}

export default function SidebarMenu({ selectedStoreId, permission }: IProps) {
  const navigate = useRouter();
  const pathname = usePathname();

  const [isPending, startTransition] = useTransition();

  const comparePath = getComparePath(pathname, permission);

  const handleMenuClick = (href: string) => {
    if (comparePath === href) return;

    startTransition(() => {
      if (permission === "OWNER") {
        navigate.push(`/${selectedStoreId}${href}`);
      } else {
        navigate.push(href);
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
      {MENU_ITEMS[permission]?.length > 1 && (
        <div className="absolute top-[18px] bottom-[18px] left-[11px] w-[2px] bg-gray-600" />
      )}
      <ul>
        {MENU_ITEMS[permission]?.map((item) => (
          <SidebarMenuItem
            key={item.href}
            {...item}
            active={isActive(item.href)}
            onClick={() => handleMenuClick(item.href)}
            onPrefetchURL={() => handlePrefetchURL(item.href)}
            className="gap-3"
          />
        ))}
      </ul>
    </div>
  );
}
