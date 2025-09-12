import { PRINTERNAME } from "@/constants/printerName";
import {
  checkPrinter,
  formatAlignLeftRight,
  formatReceiptRow,
  printDivider,
} from "./utils";

interface IProps {
  type: "kitchen" | "cash-receipt" | "card-receipt";
  activity: PosTableActivity;
  payment?: {
    CARDNAME: string;
    FILLER: string;
    INSTALLMENT: string;
    APPROVALNO: string;
  };
  paymentTradeTime?: string;
  stores?: PosStore;
  successHandler?: () => void;
  cashReceiptPhoneNo?: string;
  makePersonalPayment?: boolean;
  close?: () => void;
}

export const print = ({
  type,
  activity,
  payment,
  stores,
  successHandler,
  cashReceiptPhoneNo,
  makePersonalPayment,
  paymentTradeTime,
  close,
}: IProps) => {
  window.setPosId(1);

  try {
    window.checkPrinterStatus();
  } catch (error) {
    // eslint-disable-next-line
    alert(
      "영수증 프린터 기기가 연결되어있지 않거나 출력할 수 없는 상태입니다."
    );
    return;
  }

  const printReceipt = () => {
    window.printText(`영수증\n\n`, 1, 1, true, false, false, 0, 1);
    window.printText(
      `${stores?.name}\n${stores?.address}\n사업자: ${stores?.license}\n전화번호: ${stores?.landline}\n`,
      0,
      0,
      false,
      false,
      false,
      0,
      0
    );
    printDivider();
    window.printText(
      `영수증 번호: #${activity?.posTableActivityId}\n`,
      0,
      1,
      true,
      false,
      false,
      0,
      0
    );
    printDivider();
    window.printText(
      `${formatReceiptRow("메뉴명", "수량", "단가", "금액")}\n`,
      0,
      0,
      false,
      false,
      false,
      0,
      0
    );
    printDivider();

    activity?.orders.forEach((order) => {
      order.orderMenus.forEach((menu) => {
        window.printText(
          `${formatReceiptRow(menu.name, String(menu.quantity), `${menu.price.toLocaleString()}`, `${(menu.price * menu.quantity).toLocaleString()}`)}\n`,
          0,
          0,
          false,
          false,
          false,
          0,
          0
        );
        menu.orderOptionGroups.forEach((option) => {
          option.orderOptions.forEach((o, i, arr) => {
            window.printText(
              `${formatAlignLeftRight(`└ ${o.name}`, o.price ? `${o.price.toLocaleString()}` : "")}${i === arr.length - 1 ? "" : "\n"}`,
              0,
              0,
              false,
              false,
              false,
              0,
              0
            );
          });
        });
      });
    });

    printDivider();

    const supplyAmount = Math.floor(Number(activity?.totalOrderPrice) / 1.1);
    const vatAmount = Number(activity?.totalOrderPrice) - supplyAmount;

    window.printText(
      `${formatReceiptRow("공급가", "", "", `${supplyAmount.toLocaleString()}원`)}\n`,
      0,
      1,
      true,
      false,
      false,
      0,
      0
    );
    window.printText(
      `${formatReceiptRow("부가세", "", "", `${vatAmount.toLocaleString()}원`)}\n`,
      0,
      1,
      true,
      false,
      false,
      0,
      0
    );

    if (activity?.discount) {
      window.printText(
        `${formatReceiptRow("할인", "", "", `${activity?.discount.toLocaleString()}원`)}\n`,
        0,
        1,
        true,
        false,
        false,
        0,
        0
      );
    }

    window.printText(
      `${formatReceiptRow("합계", "", "", `${activity?.totalOrderPrice.toLocaleString()}원`)}\n`,
      0,
      1,
      true,
      false,
      false,
      0,
      0
    );
  };

  const printAddition = () => {
    if (type === "card-receipt") {
      const countUnits = (text: string | null | undefined) => {
        const safeText = text || "";
        return safeText.split("").reduce((totalUnits, char) => {
          if (/[가-힣]/.test(char)) {
            return totalUnits + 2;
          }
          return totalUnits + 1;
        }, 0);
      };

      printDivider();
      window.printText(
        `결제방법${" ".repeat(42 - 8 - countUnits(payment?.CARDNAME?.trim() as string))}\n`,
        0,
        0,
        false,
        false,
        false,
        0,
        0
      );
      window.printText(
        `카드번호${" ".repeat(18)}${payment?.FILLER?.trim() as string}\n`,
        0,
        0,
        false,
        false,
        false,
        0,
        0
      );
      window.printText(
        `결제금액${" ".repeat(42 - 8 - countUnits(activity?.totalOrderPrice.toLocaleString()) - 2)}${activity?.totalOrderPrice.toLocaleString()}원\n`,
        0,
        0,
        false,
        false,
        false,
        0,
        0
      );
      window.printText(
        `할부기간${" ".repeat(28)}${payment?.INSTALLMENT === "일시불" || payment?.INSTALLMENT === "00" ? "일시불" : `${payment?.INSTALLMENT}개월`}\n`,
        0,
        0,
        false,
        false,
        false,
        0,
        0
      );
      window.printText(
        `승인번호${" ".repeat(24 - 12 - 8)}${payment?.APPROVALNO?.trim() as string}\n`,
        0,
        0,
        false,
        false,
        false,
        0,
        0
      );

      window.printText(
        `승인일시${" ".repeat(22)}${paymentTradeTime!}\n\n\n`,
        0,
        0,
        false,
        false,
        false,
        0,
        0
      );
    }

    if (type === "cash-receipt") {
      printDivider();
      window.printText(
        `${formatAlignLeftRight("결제 방법", "현금")}\n`,
        0,
        0,
        false,
        false,
        false,
        0,
        0
      );

      if (makePersonalPayment) {
        window.printText(
          `${formatAlignLeftRight("현금 영수증", `${cashReceiptPhoneNo}`)}\n`,
          0,
          0,
          false,
          false,
          false,
          0,
          0
        );
      }

      window.printText(
        `${formatAlignLeftRight("승인 일시", paymentTradeTime as string)}\n\n`,
        0,
        0,
        false,
        false,
        false,
        0,
        0
      );
    }
  };

  printReceipt();
  printAddition();

  window.cutPaper(1);

  const strSubmit = window.getPosData();
  checkPrinter(PRINTERNAME.PRINTER1, (exists) => {
    if (!exists) {
      // eslint-disable-next-line
      alert(
        "POS 프린터 연결을 확인해주세요. Web Print SDK가 실행되지 않았거나 프린터가 연결되지 않았습니다."
      );
      if (close) {
        close();
      }
      return;
    }

    window.requestPrint(PRINTERNAME.PRINTER1, strSubmit, (res) => {
      // eslint-disable-next-line
      console.log(strSubmit);
      // eslint-disable-next-line
      console.log(res);
      successHandler?.();
    });
  });
};
