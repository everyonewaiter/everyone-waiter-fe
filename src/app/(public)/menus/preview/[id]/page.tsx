"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

export default function Page() {
  const navigate = useRouter();
  const params = useParams();
  const menuId = params?.id;

  useEffect(() => {
    if (menuId) {
      navigate.replace(`/menus/preview/${menuId}`);
    }
  }, [menuId, navigate]);

  return null;
}
