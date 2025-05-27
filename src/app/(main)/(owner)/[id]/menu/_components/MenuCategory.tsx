import Link from "next/link";
import { usePathname } from "next/navigation";

interface MenuCategoryProps {
  name: string;
  categoryId: string;
  storeId: string;
}

export default function MenuCategory({
  name,
  categoryId,
  storeId,
}: MenuCategoryProps) {
  const pathname = usePathname();
  const currentCategoryId = pathname.split("/").pop();
  const isActive = currentCategoryId === categoryId;

  return (
    <Link
      href={`/${storeId}/menu/${categoryId}`}
      className={`flex flex-shrink-0 items-center justify-between rounded-[8px] border px-4 py-2 text-[13px] ${
        isActive
          ? "bg-primary border-none text-white"
          : "border-gray-300 text-gray-300"
      } `}
    >
      {name}
    </Link>
  );
}
