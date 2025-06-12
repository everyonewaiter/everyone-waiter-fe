"use client";

import { useRouter, useParams } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const params = useParams<{ menuId: string }>();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-[400px] rounded bg-white p-8 shadow-lg">
        <h2 className="mb-4 text-xl font-bold">메뉴 상세: {params.menuId}</h2>

        <button
          type="button"
          className="mt-4 rounded bg-gray-500 px-4 py-2 text-white"
          onClick={() => router.back()}
        >
          닫기
        </button>
      </div>
    </div>
  );
}
