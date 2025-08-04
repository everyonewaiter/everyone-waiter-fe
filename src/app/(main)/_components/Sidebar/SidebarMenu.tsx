import Icon from "@/components/common/Icon";
import MENU_ITEMS from "@/constants/sidebarMenus";
import { getComparePath } from "@/utils/getPathname";
import { usePathname, useRouter } from "next/navigation";

interface IProps {
  selectedStoreId: string;
  permission: AccountPermission;
}

export default function SidebarMenu({ selectedStoreId, permission }: IProps) {
  const navigate = useRouter();
  const pathname = usePathname();

  const comparePath = getComparePath(pathname, permission);

  const menu = MENU_ITEMS[permission];

  return (
    <div className="relative mt-2">
      {menu?.length > 1 && (
        <div className="absolute top-[18px] bottom-[18px] left-[11px] w-[2px] bg-gray-600" />
      )}
      <ul>
        {menu?.map((item) => {
          const isActive = () => {
            if (item.href === "/") return comparePath === "/";
            return (
              comparePath === item.href ||
              comparePath.startsWith(`${item.href}/`)
            );
          };
          return (
            <li key={item.href}>
              <button
                type="button"
                onClick={() => {
                  if (item.href === comparePath) return;
                  const targetPath =
                    permission === "OWNER"
                      ? `/${selectedStoreId}${item.href}`
                      : item.href;
                  if (permission === "OWNER" && item.href === "/") {
                    navigate.push(`/${selectedStoreId}`);
                  } else {
                    navigate.push(targetPath);
                  }
                }}
                onMouseEnter={() => {
                  if (permission === "OWNER") {
                    navigate.prefetch(`/${selectedStoreId}${item.href}`);
                  } else {
                    navigate.prefetch(item.href);
                  }
                }}
                className={`flex items-center gap-3 px-2 py-[9px] text-[13px] transition-colors lg:text-[16px] ${
                  isActive() ? "text-primary" : "text-gray-300"
                }`}
              >
                {/* 빨간 점 (활성 메뉴만) */}
                <div
                  className={`z-1 size-2 rounded-full ${
                    isActive() ? "bg-primary" : "bg-gray-600"
                  }`}
                />
                <Icon
                  iconKey={item.icon as string}
                  className={`size-6 ${isActive() ? "text-primary" : "text-gray-300"}`}
                />
                <span className="font-medium">{item.label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
