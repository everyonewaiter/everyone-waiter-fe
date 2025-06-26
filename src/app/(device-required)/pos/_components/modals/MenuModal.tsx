import Button from "@/components/common/Button/Button";
import { ScrollArea } from "@/components/common/ScrollArea";
import cn from "@/lib/utils";
import Image from "next/image";
import OptionGroupSection from "../OptionGroupSection";

interface IProps {
  data: MenuDetail;
  type: "order" | "preview";
  layoutClassName?: string;
}

function MenuModal({ data, type, layoutClassName }: IProps) {
  return (
    <div className="bg-opacity-100 fixed inset-0 z-[9999] flex items-center justify-center backdrop-blur-sm">
      <div
        className={cn(
          "relative flex h-[650px] w-[1002px] gap-8 rounded-[32px] bg-white p-6",
          layoutClassName
        )}
      >
        <div className="flex flex-1 overflow-hidden rounded-[28px] bg-blue-50">
          {data.image && (
            <Image src={data.image} alt="menu image" width={461} height={602} />
          )}
        </div>
        <div className="flex flex-1 flex-col gap-6">
          <ScrollArea className="flex h-[522px] flex-col">
            <div className="flex gap-2">
              {["태그1", "태그2", "태그3"].map((key) => (
                <div
                  key={key}
                  className="border-primary text-primary font-regular center h-10 rounded-[40px] border px-5 text-[15px]"
                >
                  {key}
                </div>
              ))}
            </div>
            <div className="mt-5">
              <h1 className="text-gray-0 text-3xl font-bold">폭립갈릭라이스</h1>
              <p className="font-regular mt-4 text-lg">{data.name}</p>
              <div className="mt-5 w-full text-right text-3xl font-bold">
                {data.price.toLocaleString()}원
              </div>
            </div>
            <div className="my-5 h-2 w-full rounded-[8px] bg-gray-700" />
            <OptionGroupSection
              data={data.menuOptionGroups.filter(
                (el) => el.type === "MANDATORY"
              )}
              type={type}
              required
            >
              필수 추가 옵션
            </OptionGroupSection>
            <OptionGroupSection
              data={data.menuOptionGroups.filter(
                (el) => el.type === "OPTIONAL"
              )}
              type={type}
            >
              선택 추가 옵션
            </OptionGroupSection>
          </ScrollArea>
          {type === "order" && (
            <Button
              color="primary"
              className="button-xl flex gap-2 !text-[15px] !font-medium"
            >
              총 {(17900).toLocaleString()}원{" "}
              <div className="h-1 w-1 rounded-full bg-[#ffffff60]" /> 메뉴 추가
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default MenuModal;
