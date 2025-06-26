"use client";

// import { useParams } from "next/navigation";
// import { useStoreContext } from "@/providers/storeProvider";
import MenuModal from "@/app/(device-required)/pos/_components/modals/MenuModal";

const dummy: MenuDetail | undefined = undefined;

export default function Page() {
  // const params = useParams();
  // const menuId = params?.menuId as string;

  // const { storeId } = useStoreContext();

  return (
    <MenuModal
      data={dummy!}
      type="preview"
      layoutClassName="w-[1148px] h-[748px]"
    />
  );
}
