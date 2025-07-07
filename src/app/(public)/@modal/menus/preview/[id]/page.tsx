"use client";

import dynamic from "next/dynamic";
import { useEffect } from "react";

const MenuModal = dynamic(
  () => import("@/app/(device-required)/pos/_components/modals/MenuModal"),
  {
    ssr: false,
  }
);

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
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <MenuModal
        data={dummy!}
        type="preview"
        layoutClassName="!w-[320px] min-!h-[580px] md:!w-[664px] lg:!h-[746px] lg:!w-[1148px]"
      />
    </div>
  );
}
