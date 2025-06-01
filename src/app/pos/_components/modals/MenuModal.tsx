import { Button } from "@/components/common/Button";
import Label from "@/components/common/Label";
import { RadioGroup, RadioGroupItem } from "@/components/common/Radio";
import { ScrollArea } from "@/components/common/ScrollArea";
import useOutsideClick from "@/hooks/useOutSideClick";
import { PlusIcon } from "lucide-react";
import { useRef } from "react";

const extraMenu: Record<string, number> = {
  "4단계": 1000,
  "3단계": 1000,
  "2단계": 1000,
  "1단계": 1000,
};

interface IProps {
  onClose: () => void;
}

function MenuModal({ onClose }: IProps) {
  const ref = useRef<HTMLDivElement>(null);

  useOutsideClick({ ref, handler: onClose });

  return (
    <div className="bg-opacity-100 fixed inset-0 z-[9999] flex items-center justify-center backdrop-blur-sm">
      <div
        ref={ref}
        className="relative flex h-[650px] w-[1002px] gap-8 rounded-[32px] bg-white p-6"
      >
        <div className="flex flex-1 overflow-hidden rounded-[28px] bg-blue-50">
          {/* <Image src="" alt="menu image" width={461} height={602} /> */}
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
              <p className="font-regular mt-4 text-lg">
                폭립갈릭라이스폭립갈릭라이스폭립갈릭라이스폭립갈릭라이스폭립갈릭라이스폭립갈릭라이스폭립갈릭라이스
              </p>
              <div className="mt-5 w-full text-right text-3xl font-bold">
                {(14900).toLocaleString()}원
              </div>
            </div>
            <div className="my-5 h-2 w-full rounded-[8px] bg-gray-700" />
            <div className="flex flex-col gap-3">
              <p className="text-[15px] font-semibold">
                필수 추가 옵션 <span className="text-primary">*</span>
              </p>
              <div className="rounded-[12px] bg-gray-700 p-3">
                <p className="text-gray-0 mb-3 text-sm">맵기 조절</p>
                <RadioGroup
                  defaultValue="option-one"
                  className="flex flex-col items-center gap-3"
                  // value={discountType}
                  // onValueChange={(value) => {
                  //   setDiscountType(value as "fixed" | "percentage");
                  // }}
                >
                  {Object.keys(extraMenu).map((key) => (
                    <div
                      key={key}
                      className="flex w-full items-center space-x-2"
                    >
                      <RadioGroupItem value={key} id={key} />
                      <div className="flex w-full items-center justify-between">
                        <Label htmlFor={key} className="!text-s font-medium">
                          {key}
                        </Label>
                        <div className="text-s flex items-center gap-1">
                          <PlusIcon
                            size={18}
                            className="text-gray-100"
                            strokeWidth={1}
                          />
                          {extraMenu[key].toLocaleString()}원
                        </div>
                      </div>
                    </div>
                  ))}
                </RadioGroup>
              </div>
              <div className="rounded-[12px] bg-gray-700 p-3">
                <p className="text-gray-0 mb-3 text-sm">맵기 조절</p>
                <RadioGroup
                  defaultValue="option-one"
                  className="flex flex-col items-center gap-3"
                  // value={discountType}
                  // onValueChange={(value) => {
                  //   setDiscountType(value as "fixed" | "percentage");
                  // }}
                >
                  {Object.keys(extraMenu).map((key) => (
                    <div
                      key={key}
                      className="flex w-full items-center space-x-2"
                    >
                      <RadioGroupItem value={key} id={key} />
                      <div className="flex w-full items-center justify-between">
                        <Label htmlFor={key} className="!text-s font-medium">
                          {key}
                        </Label>
                        <div className="text-s flex items-center gap-1">
                          <PlusIcon
                            size={18}
                            className="text-gray-100"
                            strokeWidth={1}
                          />
                          {extraMenu[key].toLocaleString()}원
                        </div>
                      </div>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </div>
          </ScrollArea>
          <Button
            color="primary"
            className="button-xl flex gap-2 !text-[15px] !font-medium"
          >
            총 {(17900).toLocaleString()}원{" "}
            <div className="h-1 w-1 rounded-full bg-[#ffffff60]" /> 메뉴 추가
          </Button>
        </div>
      </div>
    </div>
  );
}

export default MenuModal;
