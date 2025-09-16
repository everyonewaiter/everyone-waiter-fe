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
  cashReceiptType?: OrderReceiptType;
  close?: () => void;
  printOrder?: boolean;
}

export const print = ({
  type,
  activity,
  payment,
  stores,
  successHandler,
  cashReceiptPhoneNo,
  cashReceiptType,
  paymentTradeTime,
  close,
  printOrder = true,
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

    if (printOrder) {
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
          const totalPrice =
            menu.price * menu.quantity +
            menu.orderOptionGroups
              .flatMap((el) => el.orderOptions.map((v) => v.price))
              .reduce((sum, price) => sum + price, 0);
          window.printText(
            `${formatReceiptRow(menu.name, String(menu.quantity), `${menu.price.toLocaleString()}`, `${totalPrice.toLocaleString()}`)}\n`,
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
                `${formatReceiptRow(`└ ${o.name}`, "", o.price ? `${o.price.toLocaleString()}` : "", "")}${i === arr.length - 1 ? "" : "\n"}`,
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
    }

    printDivider();

    const resultAmount =
      (activity?.totalOrderPrice || 0) - (activity?.discount || 0);
    const supplyAmount = Math.floor(Number(activity?.totalOrderPrice) / 1.1);
    const vatAmount = Number(activity?.totalOrderPrice) - supplyAmount;

    window.printText(
      `${formatAlignLeftRight("주문금액", `${activity?.totalOrderPrice.toLocaleString()}원`)}\n`,
      0,
      1,
      true,
      false,
      false,
      0,
      0
    );

    window.printText(
      `${formatAlignLeftRight("할인금액", `${activity?.discount.toLocaleString()}원`)}\n`,
      0,
      1,
      true,
      false,
      false,
      0,
      0
    );

    window.printText(
      `${formatAlignLeftRight("받을금액", `${resultAmount?.toLocaleString()}원`)}\n`,
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
      `${formatAlignLeftRight("공급가", `${supplyAmount.toLocaleString()}원`)}\n`,
      0,
      0,
      false,
      false,
      false,
      0,
      0
    );
    window.printText(
      `${formatAlignLeftRight("부가세", `${vatAmount.toLocaleString()}원`)}\n`,
      0,
      0,
      false,
      false,
      false,
      0,
      0
    );
  };

  const printAddition = () => {
    if (type === "card-receipt") {
      printDivider();
      window.printText(
        formatAlignLeftRight("결제방법", payment?.CARDNAME?.trim()!),
        0,
        0,
        false,
        false,
        false,
        0,
        0
      );
      window.printText(
        formatAlignLeftRight(
          "카드번호",
          payment?.FILLER?.trim() || " ".repeat(16)
        ),
        0,
        0,
        false,
        false,
        false,
        0,
        0
      );
      window.printText(
        formatAlignLeftRight(
          "결제금액",
          `${activity?.totalOrderPrice.toLocaleString()}원`
        ),
        0,
        0,
        false,
        false,
        false,
        0,
        0
      );
      window.printText(
        formatAlignLeftRight(
          "할부기간",
          payment?.INSTALLMENT === "일시불" || payment?.INSTALLMENT === "00"
            ? "일시불"
            : `${payment?.INSTALLMENT}개월`
        ),
        0,
        0,
        false,
        false,
        false,
        0,
        0
      );
      window.printText(
        formatAlignLeftRight(
          "승인번호",
          payment?.APPROVALNO?.trim() || " ".repeat(12)
        ),
        0,
        0,
        false,
        false,
        false,
        0,
        0
      );

      window.printText(
        formatAlignLeftRight("승인일시", paymentTradeTime || " ".repeat(12)),
        0,
        0,
        false,
        false,
        false,
        0,
        0
      );

      window.printText("\n\n\n", 0, 0, false, false, false, 0, 0);
    }

    if (type === "cash-receipt") {
      printDivider();

      if (cashReceiptType === "NONE") {
        window.printText(
          `${formatAlignLeftRight("결제방법", `현금`)}\n`,
          0,
          0,
          false,
          false,
          false,
          0,
          0
        );
      } else {
        window.printText(
          `${formatAlignLeftRight("결제방법", `현금${cashReceiptType === "DEDUCTION" ? "(소득공제)" : "(지출증빙)"}`)}\n`,
          0,
          0,
          false,
          false,
          false,
          0,
          0
        );
        window.printText(
          `${formatAlignLeftRight("현금영수증", `${cashReceiptPhoneNo}`)}\n`,
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
        formatAlignLeftRight("승인일시", paymentTradeTime || " ".repeat(12)),
        0,
        0,
        false,
        false,
        false,
        0,
        0
      );

      window.printText("\n\n\n", 0, 0, false, false, false, 0, 0);
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

    window.requestPrint(PRINTERNAME.PRINTER1, strSubmit, () => {
      successHandler?.();
    });
  });
};
