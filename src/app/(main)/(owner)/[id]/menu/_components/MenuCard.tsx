import Checkbox from "@/components/common/Checkbox";
import formatPrice from "@/utils/format/price";
import Image from "next/image";

interface MenuCardProps {
  menu: MenuWithOption | Menu;
  isSelected?: boolean;
  onSelect?: (menuId: string, categoryId: string, isChecked: boolean) => void;
}

export default function MenuCard({
  menu,
  isSelected = false,
  onSelect,
}: MenuCardProps) {
  const handleCheckboxChange = (checked: boolean) => {
    onSelect?.(menu.menuId, menu.categoryId, checked);
  };
  return (
    <div
      className="relative h-[210px] w-[152px] rounded-xl bg-gray-200 md:h-[220px] md:w-[159px] lg:h-[440px] lg:w-[329px]"
      key={menu.menuId}
    >
      <Image
        src={`${process.env.NEXT_PUBLIC_PROD_CDN}/${menu.image}`}
        alt={menu.name}
        fill
        sizes="100%"
        className="object-cover"
      />
      <Checkbox
        checked={isSelected}
        onCheckedChange={handleCheckboxChange}
        className="absolute top-0 left-0 m-1.5 lg:m-4"
      />
      <div className="absolute right-0 bottom-0 left-0 m-1 rounded-xl bg-white p-2 lg:m-2 lg:px-5 lg:py-4">
        <p className="mb-1 w-fit rounded-3xl bg-[#3900B5]/8 px-3 py-[3px] text-[12px] text-[#3900B5] lg:text-sm">
          {menu.label}
        </p>
        <div className="flex flex-col gap-0.5 lg:flex-row lg:items-center lg:justify-between">
          <p className="text-[13px] text-black lg:text-lg">{menu.name}</p>
          <p className="text-xl font-semibold text-black lg:text-[28px]">
            {formatPrice(menu.price)}원
          </p>
        </div>
      </div>
    </div>
  );
}
