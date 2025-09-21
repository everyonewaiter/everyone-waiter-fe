import { PRINTERNAME } from "@/constants/printerName";
import { convertToTableName } from "@/utils/converter";
import {
  checkPrinter,
  formatAlignLeftRight,
  formatted,
  printDivider,
} from "./utils";

interface IProps extends ReceiptSSE {
  successHandler?: () => void;
  close?: () => void;
}

export const printToKitchen = ({ successHandler, close, ...props }: IProps) => {
  window.printText(`주문서\n\n`, 1, 1, true, false, false, 0, 1);
  window.printText(
    `주문번호: ${props.printNo}\n`,
    0,
    1,
    true,
    false,
    false,
    0,
    0
  );
  window.printText(
    `테이블: ${convertToTableName(props.tableNo)}\n`,
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
    `${formatAlignLeftRight("품명", "수량")}\n`,
    0,
    0,
    false,
    false,
    false,
    0,
    0
  );
  printDivider();

  if (props.memo) {
    window.printText(
      `[메모] ${props.memo}\n\n`,
      0,
      0,
      false,
      false,
      true,
      0,
      0
    );
  }
  props.receiptMenus.forEach((menu) => {
    window.printText(
      `${formatAlignLeftRight(menu.name, `${menu.quantity}`, 1)}\n`,
      1,
      1,
      true,
      false,
      false,
      0,
      0
    );
    menu.options.forEach((option) => {
      window.printText(`${option}\n`, 0, 1, true, false, false, 0, 0);
    });
  });

  window.printText("\n\n", 0, 0, false, false, false, 0, 0);

  window.cutPaper(1);

  const strSubmit = window.getPosData();

  checkPrinter(PRINTERNAME.PRINTER2, (exists) => {
    if (!exists) {
      // eslint-disable-next-line
      alert(
        "주방 프린터 연결을 확인해주세요. Web Print SDK가 실행되지 않았거나 프린터가 연결되지 않았습니다."
      );
      return;
    }

    window.requestPrint(PRINTERNAME.PRINTER2, strSubmit, () => {
      successHandler?.();
    });
  });
};

export const printCancelToKitchen = ({
  cancelledMenus,
  tableNo,
  printNo,
  cancelledTime,
  successHandler,
}: {
  cancelledMenus: {
    name: string;
    options: string[];
    quantity: number;
  }[];
  tableNo: number;
  printNo: number;
  cancelledTime: Date;
  successHandler?: () => void;
}) => {
  window.printText(`주문 취소서\n\n`, 1, 1, true, false, false, 0, 1);
  window.printText(`주문번호: ${printNo}\n`, 0, 1, true, false, false, 0, 0);
  window.printText(
    `테이블: ${convertToTableName(tableNo)}\n`,
    0,
    1,
    true,
    false,
    false,
    0,
    0
  );
  window.printText(
    `취소 시간: ${formatted(cancelledTime)}\n`,
    0,
    0,
    true,
    false,
    false,
    0,
    0
  );

  printDivider();

  window.printText("취소된 품목:\n\n", 0, 0, false, false, false, 0, 0);

  cancelledMenus.forEach((menu) => {
    window.printText(
      `${formatAlignLeftRight(menu.name, `${menu.quantity}개`, 1)}\n`,
      1,
      1,
      true,
      false,
      false,
      0,
      0
    );
    menu.options.forEach((option) => {
      window.printText(`${option}`, 0, 1, true, false, false, 0, 0);
    });
  });

  window.printText("\n\n\n", 0, 0, false, false, false, 0, 0);

  window.cutPaper(1);

  const strSubmit = window.getPosData();

  checkPrinter(PRINTERNAME.PRINTER2, (exists) => {
    if (!exists) {
      // eslint-disable-next-line
      alert(
        "주방 프린터 연결을 확인해주세요. Web Print SDK가 실행되지 않았거나 프린터가 연결되지 않았습니다."
      );
      return;
    }

    window.requestPrint(PRINTERNAME.PRINTER2, strSubmit, () => {
      successHandler?.();
    });
  });
};
