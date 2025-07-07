declare global {
  interface Window {
    setPosId: (id: number) => void;
    printText: (
      text: string,
      horizontal: number, // 문자의 가로 배율 (0 ~ 7) (0이 1배)
      vertical: number, // 문자의 세로 배율 (0 ~ 7) (0이 1배)
      bold: boolean, // 굵게
      invert: boolean, // 역상
      underline: boolean, // 밑줄
      fonttype: number, // 0 ~ 2
      alignment: number // 0 좌측, 1 중앙, 2 우측
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
