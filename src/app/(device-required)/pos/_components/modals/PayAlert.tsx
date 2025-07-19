"use client";

import { useForm } from "react-hook-form";
import dynamic from "next/dynamic";
import Button from "@/components/common/Button/Button";
import Dropdown from "@/components/common/Dropdown";
import Input from "@/components/common/Input";
import Label from "@/components/common/Label";
import { useRouter } from "next/navigation";
import phoneNumberPattern from "@/lib/formatting/formatPhoneNumber";
import { useDeviceContext } from "@/providers/deviceStoreProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import usePayment from "../../_queries/usePayment";
import { print } from "../../_utils/print-receipt";
import { useSelectItemStore } from "../../_hooks/useSelectItemStore";
import { posQueries } from "../../_queries/usePos";
import { paySchema, TypePayForm } from "../../_schema/pos.schema";

const Alert = dynamic(() => import("@/components/common/Alert/Alert"), {
  ssr: false,
});

declare global {
  interface Window {
    $: any;
  }
}

interface IProps extends PosTableActivity {
  close: () => void;
  type: "credit-card" | "cash";
  payment?: PaymentResponse;
}

export default function PayAlert({ close, type, ...props }: IProps) {
  const navigate = useRouter();

  // 분할 계산
  const { selectedOrder } = useSelectItemStore();
  const { storeId } = useDeviceContext();
  const hasOrderId = selectedOrder?.orderId;

  const menus = hasOrderId
    ? selectedOrder?.orderMenus.map((el) => el.name)
    : props?.orders.map((el) => el.orderMenus.map((v) => v.name)).flat();

  const selectedOrdersTotal = (selectedOrder?.orderMenus ?? []).reduce(
    (acc, menu) => {
      const menuBasePrice = menu.price;

      const optionPrice =
        menu.orderOptionGroups?.reduce(
          (groupSum, group) =>
            groupSum +
            (group.orderOptions?.reduce(
              (optSum: any, o: { price: any }) => optSum + (o.price || 0),
              0
            ) ?? 0),
          0
        ) ?? 0;

      return acc + (menuBasePrice + optionPrice);
    },
    0
  );

  const form = useForm<TypePayForm>({
    mode: "onChange",
    resolver: zodResolver(paySchema),
    defaultValues: {
      receiptType: "개인소득공제용",
      phoneNumber: "",
      monthlyPlan: "일시불",
    },
  });

  const { payCard, payCash } = usePayment();
  const { data: activityData } = posQueries.useActivity(props.tableNo);
  const { data: stores } = posQueries.useStoreInfo(storeId!);

  const monthlyPlan = [
    "일시불",
    ...new Array(11).fill(0).map((_, i) => (i + 2).toString().padStart(2, "0")),
  ];

  const handlePayment = () => {
    let amount = 0;
    if (hasOrderId) {
      amount = selectedOrdersTotal;
    } else {
      amount = props.totalOrderPrice;
    }

    if (type === "credit-card") {
      payCard({
        tableNo: props.tableNo,
        form,
        amount,
        successHandler: (res) => {
          print({
            type: "card-receipt",
            activity: activityData!,
            stores: stores!,
            payment: { ...res, INSTALLMENT: form.watch("monthlyPlan") },
            successHandler:
              props.orders.length > 0
                ? () => close()
                : () => {
                    close();
                    navigate.push("/pos/tables");
                  },
          });
        },
      });
    } else {
      let cashReceiptType = "";
      if (form.watch("receiptType") === "신청안함") cashReceiptType = "NONE";
      else if (form.watch("receiptType") === "사업자증빙용")
        cashReceiptType = "PROOF";
      else cashReceiptType = "DEDUCTION";

      payCash({
        tableNo: props.tableNo,
        body: {
          amount,
          cashReceiptNo: form.watch("phoneNumber"),
          cashReceiptType: cashReceiptType as OrderReceiptType,
        },
        successHandler: () => {
          print({
            type: "cash-receipt",
            activity: activityData!,
            stores: stores!,
            successHandler:
              props.orders.length > 0
                ? () => close()
                : () => {
                    close();
                    navigate.push("/pos/tables");
                  },
            cashReceiptPhoneNo: form.watch("phoneNumber"),
          });
        },
      });
    }
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
          <h3 className="text-[28px] font-semibold">
            {props.tableNo}번 테이블
          </h3>
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
              {menus && menus.length > 0 && (
                <strong className="mt-2 text-2xl font-semibold">
                  {menus.length === 1
                    ? menus[0]
                    : `${menus[0]} 외 ${menus.length - 1}개`}
                </strong>
              )}
            </strong>
          </div>
          <div className="flex flex-col items-start">
            <Label className="text-[15px] font-medium">결제할 금액</Label>
            <strong className="mt-2 text-2xl font-semibold">
              {(hasOrderId
                ? selectedOrdersTotal
                : props.totalOrderPrice
              ).toLocaleString()}
              원
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
                      onClick={() =>
                        form.setValue(
                          "receiptType",
                          key as TypePayForm["receiptType"]
                        )
                      }
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
                    placeholder={`${form.watch("receiptType") === "개인소득공제용" ? "휴대폰 번호" : "사업자 번호"}를 입력해주세요.`}
                    className="placeholder:font-medium placeholder:text-gray-300"
                    autoFocus
                    value={form.watch("phoneNumber")}
                    onChange={(e) => {
                      const onlyNums = e.target.value.replace(/[^0-9]/g, "");
                      const formatted = phoneNumberPattern(onlyNums);
                      form.setValue("phoneNumber", formatted);
                    }}
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
