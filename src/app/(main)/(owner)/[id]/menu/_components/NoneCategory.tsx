import { Button } from "@/components/common/NewButton";
import Link from "next/link";
import NoneCategoryImage from "@public/images/submit-successfully.svg";

interface NoneCategoryProps {
  storeId: string;
}

export default function NoneCategory({ storeId }: NoneCategoryProps) {
  return (
    <div className="mt-4 flex flex-1 flex-col justify-center rounded-[20px] bg-gray-700 px-4 py-5 md:mx-auto md:w-[360px] md:gap-6 md:bg-white lg:gap-10">
      <div className="flex flex-1 flex-col items-center justify-center gap-4 md:flex-none md:gap-6 lg:gap-10">
        <NoneCategoryImage />
        <p className="text-center text-[16px] font-bold">
          음식의 카테고리가 등록되어 있지 않아요.
          <br />
          아래 버튼을 눌러 카테고리를 등록해 주세요
        </p>
      </div>
      <Button asChild className="w-full" size="xs">
        <Link href={`/${storeId}/menu/add-category`}>카테고리 등록하기</Link>
      </Button>
    </div>
  );
}
