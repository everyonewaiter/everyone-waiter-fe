declare global {
  interface Window {
    setPosId: (id: number) => void;
    printText: (
      text: string,
      horizontal: number,
      vertical: number,
      bold: boolean,
      invert: boolean,
      underline: boolean,
      fonttype: number,
      alignment: number
    ) => void;
    cutPaper: (feedCut: number) => void;
    checkPrinterStatus: () => void;
    getPosData: () => string;
    requestPrint: (
      printerName: string,
      data: string,
      callback: (result: unknown) => void
    ) => void;
    // 필요한 다른 함수도 추가 가능
  }
}
export {};
