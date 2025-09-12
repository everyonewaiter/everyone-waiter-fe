interface PaperConfig {
  totalWidth: number;
  nameWidth: number;
  qtyWidth: number;
  priceWidth: number;
  totalPriceWidth: number;
}

const PAPER_CONFIGS: PaperConfig = {
  totalWidth: 42,
  nameWidth: 19,
  qtyWidth: 5,
  priceWidth: 9,
  totalPriceWidth: 9,
};

function getDisplayWidth(str: string) {
  if (!str) return 0;
  return str
    .split("")
    .reduce((sum, char) => sum + (char.charCodeAt(0) > 255 ? 2 : 1), 0);
}

function padString(
  str: string,
  width: number,
  align: "left" | "right" | "center"
) {
  const displayWidth = getDisplayWidth(str);
  const padding = width - displayWidth;

  if (padding <= 0) return str;

  if (align === "left") return str + " ".repeat(padding);
  if (align === "right") return " ".repeat(padding) + str;
  const left = Math.floor(padding / 2);
  const right = padding - left;
  return " ".repeat(left) + str + " ".repeat(right);
}

function formatReceiptRow(
  name: string,
  qty: string,
  price: string,
  total: string
) {
  const config = PAPER_CONFIGS;

  return (
    padString(name, config.nameWidth, "left") +
    padString(qty, config.qtyWidth, "right") +
    padString(price, config.priceWidth, "right") +
    padString(total, config.totalPriceWidth, "right")
  );
}

function calculateStringWidth(str: string) {
  if (!str || typeof str !== "string") return 0;

  return str
    .split("")
    .reduce((sum, char) => sum + (/[가-힣]/.test(char) ? 1 : 0.5), 0);
}

function formatAlignLeftRight(
  left: string,
  right: string,
  fontSizeX: number = 0
) {
  const maxChars = {
    0: 21, // 42 ÷ 2
    1: 10.5, // 42 ÷ 4
    2: 7, // 42 ÷ 6
  };

  const totalChars = maxChars[fontSizeX as keyof typeof maxChars];

  const leftChars = calculateStringWidth(left);
  const rightChars = calculateStringWidth(right);
  const spacing = totalChars - leftChars - rightChars;

  if (spacing <= 0) return left + right;

  return left + " ".repeat(Math.floor(spacing)) + right;
}

function createPaperConfig(totalWidth: number): PaperConfig {
  const nameRatio = 0.45;
  const qtyRatio = 0.12;
  const priceRatio = 0.215;
  const totalPriceRatio = 0.215;

  return {
    totalWidth,
    nameWidth: Math.floor(totalWidth * nameRatio),
    qtyWidth: Math.floor(totalWidth * qtyRatio),
    priceWidth: Math.floor(totalWidth * priceRatio),
    totalPriceWidth: Math.floor(totalWidth * totalPriceRatio),
  };
}

function printDivider() {
  return window.printText(
    `${"-".repeat(PAPER_CONFIGS.totalWidth)}\n`,
    0,
    0,
    false,
    false,
    false,
    0,
    0
  );
}

const checkPrinter = (
  printerName: string,
  callback: (exists: boolean) => void
) => {
  const testReq = new XMLHttpRequest();
  testReq.open(
    "GET",
    `http://127.0.0.1:18080/WebPrintSDK/${printerName}/status`,
    true
  );
  testReq.onreadystatechange = () => {
    if (testReq.readyState === 4) {
      callback(testReq.status === 200);
    }
  };
  testReq.send();
};

export {
  formatAlignLeftRight,
  formatReceiptRow,
  createPaperConfig,
  PAPER_CONFIGS,
  printDivider,
  checkPrinter,
};
