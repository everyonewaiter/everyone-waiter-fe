"use client";

import { useParams } from "next/navigation";
import MenuList from "./_components/MenuList";
// import GuideAddCategory from "./_components/GuideAddCategory";
// import Button from "@/components/common/Button/Button";

export default function Page() {
  const params = useParams();
  const storeId = params?.id as string;

  return (
    <>
      {/* <div className="flex flex-1 flex-col items-center justify-center">
        <GuideAddCategory />
      </div> */}
      <MenuList storeId={storeId} />
    </>
  );
}
