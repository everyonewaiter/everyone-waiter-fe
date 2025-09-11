import { PRINTERNAME } from "@/constants/printerName";
import { checkPrinter, formatAlignLeftRight, printDivider } from "./utils";

interface IProps extends ReceiptSSE {
 successHandler?: () => void;
 close?: () => void;
}

export const printToKitchen = ({ successHandler, close, ...props }: IProps) => {
 window.printText(`${props.printNo}\n`, 2, 2, true, false, false, 0, 1);
 window.printText(
  `테이블번호: ${props.tableNo}\n`,
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
   `${formatAlignLeftRight(menu.name, String(menu.quantity))}\n`,
   1,
   1,
   true,
   false,
   false,
   0,
   0
  );
  menu.options.forEach((option) => {
   window.printText(`└ ${option}\n`, 1, 0, true, false, false, 0, 0);
  });
 });

 window.printText("\n\n", 0, 0, false, false, false, 0, 0);

 window.cutPaper(1);

 const strSubmit = window.getPosData();

  checkPrinter(PRINTERNAME.PRINTER2, (exists) => {
    if (!exists) {
      alert("주방 프린터 연결을 확인해주세요. Web Print SDK가 실행되지 않았거나 프린터가 연결되지 않았습니다.");
      return;
    }
    
    window.requestPrint(PRINTERNAME.PRINTER2, strSubmit, (res) => {
     console.log(res)
     successHandler?.();
  });
 });
};