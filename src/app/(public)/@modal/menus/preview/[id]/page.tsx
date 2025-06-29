"use client";

// import { useParams } from "next/navigation";
// import { useStoreContext } from "@/providers/storeProvider";
import MenuModal from "@/app/(device-required)/pos/_components/modals/MenuModal";

const dummy: MenuDetail | undefined = {
  menuId: "694865267482835533",
  categoryId: "694865267482835533",
  name: "안심 스테이크",
  description: "1++ 한우 안심을 사용합니다.",
  price: 34900,
  spicy: 0,
  state: "DEFAULT",
  label: "BEST",
  image: "license/202504/0KA652ZFZ26DG.webp",
  printEnabled: true,
  menuOptionGroups: [
    {
      menuOptionGroupId: "694865267482835533",
      name: "굽기 정도",
      type: "MANDATORY",
      printEnabled: true,
      menuOptions: [
        {
          name: "미디움",
          price: 0,
        },
      ],
    },
  ],
};

export default function Page() {
  return (
    <MenuModal
      data={dummy!}
      type="preview"
      layoutClassName="!w-[320px] min-!h-[580px] md:!w-[664px] lg:!h-[746px] lg:!w-[1148px]"
    />
  );
}
