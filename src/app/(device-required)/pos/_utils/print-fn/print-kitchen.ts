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
  if (props.memo) {
    window.printText(
      `[메모] ${props.memo}\n\n`,
      1,
      1,
      false,
      false,
      true,
      0,
      0
    );
  }

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

  props.receiptMenus.forEach((menu, i) => {
    window.printText(
      `${i + 1}. ${menu.name.replace(/\s/g, "")}\n`,
      1,
      1,
      true,
      false,
      false,
      0,
      0
    );

    menu.options.forEach((option, index) => {
      if (index === 0) {
        window.printText(
          `${formatAlignLeftRight(`${option}`, `${menu.quantity}개`, 1)}\n`,
          0,
          1,
          true,
          false,
          false,
          0,
          0
        );
      } else {
        window.printText(`${option}`, 0, 1, true, false, false, 0, 0);
      }
    });
    if (i !== props.receiptMenus.length - 1) {
      window.printText(`\n`, 0, 0, false, false, false, 0, 0);
    }
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

  cancelledMenus.forEach((menu, i) => {
    window.printText(
      `${i + 1}. ${menu.name.replace(/\s/g, "")}\n`,
      1,
      1,
      true,
      false,
      false,
      0,
      0
    );

    menu.options.forEach((option, index) => {
      if (index === 0) {
        window.printText(
          `${formatAlignLeftRight(`${option}`, `${menu.quantity}개`, 1)}\n`,
          0,
          1,
          true,
          false,
          false,
          0,
          0
        );
      } else {
        window.printText(`${option}`, 0, 1, true, false, false, 0, 0);
      }
    });
    if (i !== cancelledMenus.length - 1) {
      window.printText(`\n`, 0, 0, false, false, false, 0, 0);
    }
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
