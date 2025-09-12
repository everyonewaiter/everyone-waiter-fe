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
    checkPrinterFirst: (
      printerName: string,
      callback: (exists: boolean) => void
    ) => void;
    printBitmap: (
      imageData: string, // base64 encoding
      width: number, // 이미지 원본 width - 2
      alignment: number, // 0 좌측, 1 중앙, 2 우측
      dither: number | boolean // 0 or false, 1 or true
    ) => void;
  }
}
export {};
