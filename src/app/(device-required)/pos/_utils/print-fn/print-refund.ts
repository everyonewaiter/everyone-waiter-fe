import { PRINTERNAME } from "@/constants/printerName";
import {
  checkPrinter,
  formatAlignLeftRight,
  formatReceiptRow,
  printDivider,
} from "./utils";

interface IProps {
  type: "cash-receipt" | "card-receipt";
  activity: PosTableActivity;
  stores?: PosStore | StoreInfoDetail;
  payments: OrderPayments;
  successHandler?: () => void;
  close?: () => void;
}

export const printRefund = ({
  type,
  activity,
  stores,
  payments,
  successHandler,
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
    window.printText(`취소영수증\n\n`, 1, 1, true, false, false, 0, 1);
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
      0,
      true,
      false,
      false,
      0,
      0
    );
    // window.printText(
    //   `취소일시: #${activity?.posTableActivityId}\n`,
    //   0,
    //   0,
    //   true,
    //   false,
    //   false,
    //   0,
    //   0
    // );
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

    window.printText(
      `${formatAlignLeftRight("취소금액", `${activity?.totalOrderPrice.toLocaleString()}원`)}\n`,
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
        `${formatAlignLeftRight("결제방법", `${payments?.issuerName?.trim() as string} 취소`)}\n`,
        0,
        0,
        false,
        false,
        false,
        0,
        0
      );
      window.printText(
        `${formatAlignLeftRight("카드번호", payments?.cardNo?.trim() as string)}\n`,
        0,
        0,
        false,
        false,
        false,
        0,
        0
      );
      window.printText(
        `${formatAlignLeftRight("취소금액", `${payments?.amount.toLocaleString()}원`)}\n`,
        0,
        0,
        false,
        false,
        false,
        0,
        0
      );
      window.printText(
        `${formatAlignLeftRight("취소승인번호", payments?.approvalNo?.trim() as string)}\n`,
        0,
        0,
        false,
        false,
        false,
        0,
        0
      );

      window.printText(
        `${formatAlignLeftRight("원승인일시", payments.tradeTime!)}\n\n\n`,
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
        `${formatAlignLeftRight("결제방법", "현금 취소")}\n`,
        0,
        0,
        false,
        false,
        false,
        0,
        0
      );

      window.printText(
        `${formatAlignLeftRight("승인 일시", payments?.tradeTime as string)}\n\n`,
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
      console.log(res);
      successHandler?.();
    });
  });
};
