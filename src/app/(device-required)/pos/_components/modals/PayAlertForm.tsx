import Button from "@/components/common/Button/Button";
import Dropdown from "@/components/common/Dropdown";
import Input from "@/components/common/Input";
import Label from "@/components/common/Label";
import phoneNumberPattern from "@/lib/formatting/formatPhoneNumber";
import { FormErrorMessage } from "@/components/common/Form";
import cn from "@/lib/utils";
import formatLicenseNumber from "@/lib/formatting/formatLicenseNumber";
import { Controller, useFormContext } from "react-hook-form";
import { X } from "lucide-react";
import { useRef, useState } from "react";
import { TypePayForm } from "../../_schema/pos.schema";
import { useSelectItemStore } from "../../_hooks/useSelectItemStore";
import { ReceiptType } from "./PayAlert";

const monthlyPlan = [
  "일시불",
  ...new Array(11).fill(0).map((_, i) => (i + 2).toString().padStart(2, "0")),
];

interface IProps extends PosTableActivity {
  hasOrderId?: boolean;
  selectedOrdersTotal: number;
  type: "credit-card" | "cash";
  onClose: () => void;
  payValue: number;
  onSetPayValue: (value: number) => void;
}

export default function PayAlertForm({
  hasOrderId,
  selectedOrdersTotal,
  type,
  onClose,
  payValue,
  onSetPayValue,
  ...props
}: IProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const form = useFormContext<TypePayForm>();

  const INITIAL_VALUE = hasOrderId
    ? selectedOrdersTotal
    : props.remainingPaymentPrice;

  const [changeToInput, setChangeToInput] = useState(false);
  const [isShowingAlert, setIsShowingAlert] = useState(false);
  const { selectedOrder } = useSelectItemStore();

  const menus = hasOrderId
    ? selectedOrder.map((el) => el.orderMenus.map((v) => v.name)).flat()
    : props?.orders.map((el) => el.orderMenus.map((v) => v.name)).flat();

  const getLength = () => {
    if (!payValue) {
      return 17;
    }
    return String(payValue).length * 16.2;
  };

  const handleValidate = (val: string) => {
    const currentValue = val.replaceAll(",", "");
    if (!currentValue) {
      if (!isShowingAlert) {
        setIsShowingAlert(true);
        // eslint-disable-next-line
        alert("결제할 금액을 입력해주세요.");
        setTimeout(() => {
          if (inputRef.current) {
            inputRef.current.focus();
          }
          setIsShowingAlert(false);
        }, 100);
      }
      return;
    }
    setChangeToInput(false);
  };

  return (
    <div className="-mt-4 flex w-full flex-col gap-10">
      <div className="flex items-center justify-between">
        <h3 className="text-[28px] font-semibold">{props.tableNo}번 테이블</h3>
        <button type="button" onClick={onClose}>
          <X size={30} />
        </button>
      </div>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col items-start">
          <Label className="text-[15px] font-medium">결제 정보</Label>
          <strong className="mt-2 text-2xl font-semibold">
            {menus && (
              <strong className="mt-2 text-2xl font-semibold">
                {menus.length === 1
                  ? menus[0]
                  : `${menus[0]} 외 ${menus.length - 1}개`}
              </strong>
            )}
          </strong>
        </div>
        <div className="flex flex-col items-start gap-2">
          <Label className="text-[15px] font-medium">결제할 금액</Label>
          <div className="group flex">
            {changeToInput ? (
              <Input
                ref={inputRef}
                value={payValue ? Number(payValue).toLocaleString() : ""}
                onChange={(e) => {
                  const origin = e.target.value.replaceAll(",", "");
                  if (
                    origin === "" ||
                    Number(origin) <= Number(INITIAL_VALUE)
                  ) {
                    onSetPayValue(Number(origin));
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleValidate(e.currentTarget.value);
                  }
                }}
                onBlur={(e) => handleValidate(e.currentTarget.value)}
                className="!h-[34px] !rounded-none border-t-0 border-r-0 border-l-0 !px-0 !text-2xl !font-semibold"
                style={{ width: `${getLength()}px` }}
                max={Number(INITIAL_VALUE)}
              />
            ) : (
              <button
                type="button"
                className="group-hover:decoration-gray-0 cursor-pointer text-2xl font-semibold underline decoration-gray-400 decoration-dotted underline-offset-4"
                onClick={() => {
                  setChangeToInput(true);
                  setTimeout(() => {
                    if (inputRef.current) {
                      inputRef.current.focus();
                      const { length } = inputRef.current.value;
                      inputRef.current.setSelectionRange(length, length);
                    }
                  }, 0);
                }}
              >
                {payValue ? Number(payValue).toLocaleString() : ""}
              </button>
            )}
            <strong className="text-2xl font-semibold">원</strong>
          </div>
        </div>
        {type === "cash" ? (
          <>
            <div className="flex flex-col items-start">
              <Label className="text-[15px] font-medium">현금영수증 발행</Label>
              <div className="mt-2 flex w-full items-center gap-3">
                {Object.values(ReceiptType).map((key) => (
                  <Button
                    key={key}
                    color={
                      form.watch("receiptType") === key ? "primary" : "grey"
                    }
                    variant="outline"
                    className={cn(
                      "button-lg w-full !font-medium",
                      form.watch("receiptType") === key ? "" : "border-gray-500"
                    )}
                    onClick={() => {
                      form.setValue(
                        "receiptType",
                        key as TypePayForm["receiptType"]
                      );
                      form.setValue("phoneNumber", "");
                      form.setValue("licenseNumber", "");
                      form.clearErrors("phoneNumber");
                      form.clearErrors("licenseNumber");
                    }}
                  >
                    {key}
                  </Button>
                ))}
              </div>
            </div>
            {form.watch("receiptType") === ReceiptType.DEDUCTION && (
              <div className="flex flex-col items-start gap-2">
                <Label className="text-[15px] font-medium">휴대폰 번호</Label>
                <Controller
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <div className="flex w-full flex-col gap-1">
                      <Input
                        {...field}
                        placeholder="휴대폰 번호를 입력해주세요."
                        className="w-full font-medium md:h-12"
                        autoFocus
                        onChange={(e) => {
                          const onlyNums = e.target.value.replace(
                            /[^0-9]/g,
                            ""
                          );
                          const formatted = phoneNumberPattern(onlyNums);
                          field.onChange(formatted);
                        }}
                        hasError={!!form.formState.errors.phoneNumber}
                      />
                      <FormErrorMessage>
                        {form.formState.errors.phoneNumber?.message}
                      </FormErrorMessage>
                    </div>
                  )}
                />
              </div>
            )}
            {form.watch("receiptType") === ReceiptType.PROOF && (
              <div className="flex flex-col items-start gap-2">
                <Label className="text-[15px] font-medium">사업자 번호</Label>
                <Controller
                  control={form.control}
                  name="licenseNumber"
                  render={({ field }) => (
                    <div className="flex w-full flex-col gap-1">
                      <Input
                        {...field}
                        placeholder="사업자 번호를 입력해주세요."
                        className="w-full font-medium md:h-12"
                        autoFocus
                        onChange={(e) => {
                          const onlyNums = e.target.value.replace(
                            /[^0-9]/g,
                            ""
                          );
                          const formatted = formatLicenseNumber(onlyNums);
                          field.onChange(formatted);
                        }}
                        hasError={!!form.formState.errors.licenseNumber}
                      />
                      <FormErrorMessage>
                        {form.formState.errors.licenseNumber?.message}
                      </FormErrorMessage>
                    </div>
                  )}
                />
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-start gap-2">
            <Label className="text-[15px] font-medium">할부 개월</Label>
            <Dropdown
              data={monthlyPlan}
              defaultText="할부 개월을 선택해주세요."
              active={form.watch("monthlyPlan").toString()}
              setActive={(v) => form.setValue("monthlyPlan", v)}
              triggerClassName="text-sm font-medium rounded-xl"
            />
          </div>
        )}
      </div>
    </div>
  );
}
