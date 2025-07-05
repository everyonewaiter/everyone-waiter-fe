"use client";

/* eslint-disable no-unsafe-optional-chaining */
import { useForm } from "react-hook-form";
import Alert from "@/components/common/Alert/Alert";
import Button from "@/components/common/Button/Button";
import Dropdown from "@/components/common/Dropdown";
import Input from "@/components/common/Input";
import Label from "@/components/common/Label";
import makeKSCATApprovalREQ from "../../_utils/make-approval-req";

declare global {
  interface Window {
    $: any;
  }
}

interface IProps {
  close: () => void;
  type: "credit-card" | "cash";
  amount: number;
  menus: string[];
  tableNo: number;
}

interface FormType {
  receiptType: string;
  phoneNumber: string;
  monthlyPlan: string;
}

export default function PayAlert({
  close,
  type,
  amount,
  menus,
  tableNo,
}: IProps) {
  const form = useForm<FormType>({
    defaultValues: {
      receiptType: "개인소득공제용",
      phoneNumber: "",
      monthlyPlan: "",
    },
  });

  const monthlyPlan = [
    "일시불",
    ...new Array(11).fill(0).map((_, i) => (i + 2).toString().padStart(2, "0")),
  ];

  const handlePayment = () => {
    const callbackKey = `jsonp${Date.now()}`;

    const taxValue = Math.floor(amount / 10);
    const nonTaxValue = amount - taxValue;
    const installment =
      form.watch("monthlyPlan") === "일시불" ? "00" : form.watch("monthlyPlan"); // "00"은 일시불

    const req = makeKSCATApprovalREQ({
      orderNo: `TABLE-${tableNo}-${Date.now()}`,
      amount,
      tax: taxValue,
      nonTax: nonTaxValue,
      installment,
      msg: `${tableNo}번 테이블 결제`,
    });

    window.$.ajax({
      url: "http://localhost:27097/WebApproval",
      dataType: "jsonp",
      jsonp: "callback",
      data: {
        callback: callbackKey,
        REQ: req,
      },
      success: (res: any) => {
        // eslint-disable-next-line no-console
        console.log("✅ 결제 성공", res);
      },
      error: (err: any) => {
        // eslint-disable-next-line no-console
        console.error("❌ 결제 실패", err);
      },
    });
  };

  return (
    <Alert
      onClose={close}
      hasNoCancel
      onAction={handlePayment}
      buttonText={type === "cash" ? "현금 결제하기" : "카드 결제하기"}
      buttonColor="black"
      layoutClassName="!w-[648px]"
      noResponsive
    >
      <div className="-mt-4 flex w-full flex-col gap-10">
        <div className="flex items-center justify-between">
          <h3 className="text-[28px] font-semibold">2번 테이블</h3>
          <Button
            variant="outline"
            color="primary"
            className="button-lg !rounded-[8px] text-[15px] !font-medium"
          >
            결제 취소
          </Button>
        </div>
        <div className="flex flex-col gap-8">
          <div className="flex flex-col items-start">
            <Label className="text-[15px] font-medium">결제 정보</Label>
            <strong className="mt-2 text-2xl font-semibold">
              {menus?.length === 1
                ? menus?.[0]
                : `${menus?.[0]} 외 ${menus?.length - 1}개`}
            </strong>
          </div>
          <div className="flex flex-col items-start">
            <Label className="text-[15px] font-medium">결제할 금액</Label>
            <strong className="mt-2 text-2xl font-semibold">
              {amount.toLocaleString()}원
            </strong>
          </div>
          {type === "cash" ? (
            <>
              <div className="flex flex-col items-start">
                <Label className="text-[15px] font-medium">
                  현금영수증 발행
                </Label>
                <div className="mt-2 flex w-full items-center gap-3">
                  {["신청안함", "개인소득공제용", "사업자증빙용"].map((key) => (
                    <Button
                      key={key}
                      color={
                        form.watch("receiptType") === key ? "primary" : "grey"
                      }
                      variant="outline"
                      className="button-lg w-full !font-medium"
                      onClick={() => form.setValue("receiptType", key)}
                    >
                      {key}
                    </Button>
                  ))}
                </div>
              </div>
              {form.watch("receiptType") !== "신청안함" && (
                <div className="flex flex-col items-start gap-2">
                  <Label className="text-[15px] font-medium">휴대폰 번호</Label>
                  <Input
                    {...form.register("phoneNumber")}
                    placeholder={`${form.watch("receiptType") === "개인소득공제용" ? "휴대폰 번호" : "사업자 번호"}를 입력해주세요.`}
                    className="placeholder:font-medium placeholder:text-gray-300"
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
                setActive={(value) => form.setValue("monthlyPlan", value)}
                triggerClassName="text-sm font-medium rounded-[12px]"
              />
            </div>
          )}
        </div>
      </div>
    </Alert>
  );
}
