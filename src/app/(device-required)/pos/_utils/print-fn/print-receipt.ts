import { PRINTERNAME } from "@/constants/printerName";
import { formatAlignLeftRight, formatReceiptRow, printDivider } from "./utils";

interface IProps {
  type: "kitchen" | "cash-receipt" | "card-receipt";
  activity: PosTableActivity;
  payment?: {
    CARDNAME: string;
    FILLER: string;
    INSTALLMENT: string;
    APPROVALNO: string;
    TRADETIME: string;
  };
  stores?: PosStore;
  successHandler?: () => void;
  cashReceiptPhoneNo?: string;
  makePersonalPayment?: boolean;
  printerName?: PRINTERNAME.PRINTER1 | PRINTERNAME.PRINTER2;
}

/**
 *
 * @param printerName - typeof PRINTERNAME
 * @returns
 */
export const print = ({
  type,
  activity,
  payment,
  stores,
  successHandler,
  cashReceiptPhoneNo,
  makePersonalPayment,
  printerName = PRINTERNAME.PRINTER1,
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

  const printKitchen = () => {
    window.printText(`주  문  서\n`, 0, 2, true, false, false, 0, 1);
    window.printText(
      `주문번호: ${activity?.posTableActivityId}\n`,
      0,
      1,
      true,
      false,
      false,
      0,
      0
    );
    window.printText(
      `테이블번호: ${activity?.tableNo}\n`,
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
      `${formatReceiptRow("품명", "", "", "수량")}\n`,
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
          formatAlignLeftRight(menu.name, String(menu.quantity)),
          1,
          0,
          true,
          false,
          false,
          0,
          0
        );
        menu.orderOptionGroups.forEach((option) => {
          option.orderOptions.forEach((o) => {
            window.printText(
              `${formatReceiptRow(`└ ${option.name}`, o.name, "", "")}\n`,
              1,
              0,
              true,
              false,
              false,
              0,
              0
            );
          });
        });
      });
      if (order.memo) {
        window.printText(
          `[메모] ${order.memo}\n\n`,
          0,
          0,
          false,
          false,
          true,
          0,
          0
        );
      }
    });

    printDivider();
  };

  const printReceipt = () => {
    window.printText(`영  수  증\n`, 0, 2, true, false, false, 0, 1);
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
          option.orderOptions.forEach((o) => {
            window.printText(
              `${formatAlignLeftRight(`└ ${o.name}`, o.price ? `${o.price.toLocaleString()}` : "")}\n`,
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
      `${formatAlignLeftRight("공급가", `${supplyAmount.toLocaleString()}원`)}\n`,
      0,
      1,
      true,
      false,
      false,
      0,
      0
    );
    window.printText(
      `${formatAlignLeftRight("부가세", `${vatAmount.toLocaleString()}원`)}\n`,
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
        `${formatAlignLeftRight("할인", `${activity?.discount.toLocaleString()}원`)}\n`,
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
      `${formatAlignLeftRight("합계", `${activity?.totalOrderPrice.toLocaleString()}원`)}\n`,
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
      printDivider();
      window.printText(
        `${formatAlignLeftRight("결제방법", payment?.CARDNAME?.trim() as string)}\n`,
        0,
        0,
        false,
        false,
        false,
        0,
        0
      );
      window.printText(
        `${formatAlignLeftRight("카드번호", payment?.FILLER?.trim() as string)}\n`,
        0,
        0,
        false,
        false,
        false,
        0,
        0
      );
      window.printText(
        `${formatAlignLeftRight("결제금액", `${activity?.totalOrderPrice.toLocaleString()}원`)}\n`,
        0,
        0,
        false,
        false,
        false,
        0,
        0
      );
      window.printText(
        `${formatAlignLeftRight("할부기간", payment?.INSTALLMENT === "일시불" || payment?.INSTALLMENT === "00" ? "일시불" : `${payment?.INSTALLMENT}개월`)}\n`,
        0,
        0,
        false,
        false,
        false,
        0,
        0
      );
      window.printText(
        `${formatAlignLeftRight("승인번호", payment?.APPROVALNO?.trim() as string)}\n`,
        0,
        0,
        false,
        false,
        false,
        0,
        0
      );

      window.printText(
        `${formatAlignLeftRight("승인일시", payment?.TRADETIME!)}\n\n\n`,
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
          `${formatAlignLeftRight("현금 영수증 발급", `${cashReceiptPhoneNo}`)}\n`,
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
        `${formatAlignLeftRight("승인 일시", payment?.TRADETIME as string)}\n`,
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

  // NOTE: 영수증 코드
  if (type === "kitchen") {
    printKitchen();
  } else {
    printReceipt();
    printAddition();
  }

  window.cutPaper(1);

  const strSubmit = window.getPosData();
  try {
    window.requestPrint(printerName, strSubmit, () => {
      successHandler?.();
    });
  } catch (error) {
    successHandler?.();
  }
};
