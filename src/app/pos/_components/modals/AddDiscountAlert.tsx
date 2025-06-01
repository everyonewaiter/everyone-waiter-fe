"use client";

import Alert from "@/components/common/Alert/Alert";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/common/Form";
import Input from "@/components/common/Input";
import Label from "@/components/common/Label";
import { RadioGroup, RadioGroupItem } from "@/components/common/Radio";
import { MinusIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { useRef, useState } from "react";
import useOutsideClick from "@/hooks/useOutSideClick";

interface FormType {
  discount: number | null;
  result: number | null;
}

interface IProps {
  close: () => void;
}

export default function AddDiscountAlert({ close }: IProps) {
  const ref = useRef<HTMLDivElement>(null);

  const [discountType, setDiscountType] = useState<"fixed" | "percentage">(
    "fixed"
  );
  const discountText = discountType === "fixed" ? "원" : "%";

  const form = useForm<FormType>({
    defaultValues: {
      discount: null,
      result: null,
    },
  });

  useOutsideClick({ ref, handler: close });

  return (
    <Alert
      ref={ref}
      onClose={close}
      onAction={() => {}}
      buttonColor="black"
      buttonText="할인하기"
    >
      <div className="-mt-4 flex w-full flex-col gap-10">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-semibold">2번 테이블의 총 주문 금액</h3>
          <span className="text-primary text-2xl font-semibold">
            {(152000).toLocaleString()}원
          </span>
        </div>
        <div className="flex flex-col">
          <RadioGroup
            defaultValue="option-one"
            className="flex items-center gap-6"
            value={discountType}
            onValueChange={(value) => {
              setDiscountType(value as "fixed" | "percentage");
            }}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="fixed" id="fixed" />
              <Label htmlFor="fixed" className="!text-lg font-medium">
                지정 가격 할인
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="percentage" id="percentage" />
              <Label htmlFor="percentage" className="!text-lg font-medium">
                퍼센트 할인
              </Label>
            </div>
          </RadioGroup>
          <div className="mt-6">
            <Form {...form}>
              <FormField
                control={form.control}
                name="discount"
                render={({ field }) => (
                  <>
                    <FormItem>
                      <FormLabel className="font-medium">
                        할인할 금액 입력
                      </FormLabel>
                      <FormControl>
                        <div className="relative flex items-center gap-3">
                          <MinusIcon
                            size={16}
                            color="#999"
                            className="absolute left-4"
                          />
                          <Input
                            {...field}
                            type="text"
                            value={field.value || ""}
                            className="!pl-9 text-base font-medium placeholder:text-gray-300"
                            placeholder={
                              discountType === "fixed" ? "12,000" : "10"
                            }
                          />
                          <strong className="text-xl font-semibold">
                            {discountText}
                          </strong>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                    <FormItem className="mt-4">
                      <FormLabel className="font-medium">
                        할인 후 금액
                      </FormLabel>
                      <FormControl>
                        <div className="relative flex items-center gap-3">
                          <Input
                            {...field}
                            type="text"
                            value={field.value || ""}
                            className="text-base font-medium placeholder:text-gray-300"
                            placeholder="할인할 금액을 먼저 입력해주세요."
                            disabled={!field.value}
                          />
                          <strong className="text-xl font-semibold">
                            {discountText}
                          </strong>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </>
                )}
              />
            </Form>
          </div>
        </div>
        <div className="text-gray-0 flex flex-col items-center text-lg font-medium">
          <span>
            할인된 금액은{" "}
            <strong className="text-primary text-2xl font-semibold">
              {(124000).toLocaleString()}원
            </strong>{" "}
            입니다.
          </span>
          <span>적용하시겠습니까?</span>
        </div>
      </div>
    </Alert>
  );
}
