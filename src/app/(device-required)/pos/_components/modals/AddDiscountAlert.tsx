"use client";

import { MinusIcon } from "@/components/common/Icon/index";
import { useForm } from "react-hook-form";
import dynamic from "next/dynamic";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { isNumber } from "@/utils/validate";
import { discountSchema, TypeDiscountForm } from "../../_schema/pos.schema";

const Alert = dynamic(() => import("@/components/common/Alert/Alert"), {
  ssr: false,
});

interface IProps {
  close: () => void;
  total: number;
  onAction: (discountValue: number) => void;
  initialValue: number;
}

export default function AddDiscountAlert({
  close,
  total,
  onAction,
  initialValue,
}: IProps) {
  const form = useForm<TypeDiscountForm>({
    mode: "onChange",
    resolver: zodResolver(discountSchema),
    defaultValues: initialValue
      ? {
          discount: initialValue,
          result: total - initialValue,
          discountType: "fixed",
        }
      : {
          discount: null,
          result: null,
          discountType: "fixed",
        },
  });

  return (
    <Alert
      onClose={close}
      onAction={() => {
        onAction(total - form.watch("result")!);
        close();
      }}
      buttonColor="black"
      buttonText="할인하기"
      noResponsive
    >
      <div className="-mt-4 flex w-full flex-col gap-10">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-semibold">2번 테이블의 총 주문 금액</h3>
          <span className="text-primary text-2xl font-semibold">
            {total.toLocaleString()}원
          </span>
        </div>
        <div className="flex flex-col">
          <RadioGroup
            {...form.register("discountType")}
            className="flex items-center gap-6"
            defaultValue="fixed"
            onValueChange={(value) => {
              form.setValue("discountType", value as "fixed" | "percent");
              form.setValue("discount", null);
              form.setValue("result", null);
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
                          value={
                            field.value
                              ? Number(field.value).toLocaleString()
                              : ""
                          }
                          onChange={(e) => {
                            const rawValue = e.target.value.replace(/,/g, "");
                            const numericValue =
                              rawValue === "" ? null : Number(rawValue);

                            if (rawValue !== "" && !isNumber(numericValue)) {
                              return;
                            }

                            field.onChange(numericValue);

                            const discount = numericValue || 0;
                            const discountType = form.watch("discountType");

                            let result = total;

                            if (discountType === "fixed") {
                              result -= discount;
                            } else {
                              result -= total * (discount / 100);
                            }

                            form.setValue("result", Math.round(result));
                          }}
                          className="!pl-9 text-base font-medium"
                          placeholder={
                            form.watch("discountType") === "fixed"
                              ? "12,000"
                              : "10"
                          }
                        />
                        <strong className="text-xl font-semibold">
                          {form.watch("discountType") === "fixed" ? "원" : "%"}
                        </strong>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="result"
                render={({ field }) => (
                  <FormItem className="mt-4">
                    <FormLabel className="font-medium">할인 후 금액</FormLabel>
                    <FormControl>
                      <div className="relative flex items-center gap-3">
                        <Input
                          {...field}
                          type="text"
                          value={
                            typeof field.value === "number"
                              ? field.value.toLocaleString()
                              : ""
                          }
                          className="text-base font-medium"
                          placeholder="할인할 금액을 먼저 입력해주세요."
                          disabled={typeof field.value !== "number"}
                          readOnly
                        />
                        <strong className="text-xl font-semibold">원</strong>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </Form>
          </div>
        </div>
        <div className="text-gray-0 flex flex-col items-center text-lg font-medium">
          <span>
            할인된 금액은{" "}
            <strong className="text-primary text-2xl font-semibold">
              {Number(form.watch("result")).toLocaleString()}원
            </strong>{" "}
            입니다.
          </span>
          <span>적용하시겠습니까?</span>
        </div>
      </div>
    </Alert>
  );
}
