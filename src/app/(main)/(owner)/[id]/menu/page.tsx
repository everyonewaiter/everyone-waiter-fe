"use client";

import { useParams } from "next/navigation";
import MenuList from "./_components/MenuList";

export default function Page() {
  const params = useParams();
  const storeId = params?.id as string;

  return <MenuList storeId={storeId} />;
}
