import Button from "@/components/common/Button/Button";
import GuideComponent from "@/components/GuideComponent";
import Link from "next/link";

export default function GuideAddCategory() {
  return (
    <>
      <GuideComponent
        title="음식 카테고리가 등록되어 있지 않아요.\n아래 버튼을 눌러 카테고리를 등록해주세요."
        subtitle=""
        image={{ url: "/gif/no-stores.gif", size: 160 }}
        buttonText="카테고리 등록하기"
        href="menu/category"
        gap="md:gap-8 lg:gap-10"
      />
      <Link href="menu/category" className="w-full">
        <Button className="button-sm mt-6 flex h-10 w-full md:hidden">
          카테고리 등록하기
        </Button>
      </Link>
    </>
  );
}
